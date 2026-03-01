import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/store';
import { env } from '@/config/env';

export const apiClient = axios.create({
    baseURL: `${env?.BASE_URL}/api`,
    timeout: 10000,
});

export const plainApiClient = axios.create({
    baseURL: `${env?.BASE_URL}/api`,
    timeout: 10000,
});

apiClient.interceptors.request.use(config => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
}[] = [];

apiClient.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const original = error.config as typeof error.config & { _retry?: boolean };
        const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();

        if (error.response?.status !== 401 || original._retry || !refreshToken) {
            const data = error.response?.data as any;
            throw new Error(data?.message || 'An error occurred');
        }

        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(token => {
                original.headers!.Authorization = `Bearer ${token}`;
                return apiClient(original);
            });
        }

        original._retry = true;
        isRefreshing = true;

        try {
            const { data } = await apiClient.post('/v1/auth/token/refresh/', {
                refreshToken,
            });
            setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            failedQueue.forEach(({ resolve }) => resolve(data.accessToken));
            original.headers!.Authorization = `Bearer ${data.accessToken}`;
            return apiClient(original);
        } catch (err) {
            failedQueue.forEach(({ reject }) => reject(err));
            clearAuth();
            return Promise.reject(err);
        } finally {
            failedQueue = [];
            isRefreshing = false;
        }
    },
);
