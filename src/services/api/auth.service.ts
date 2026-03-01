import { RefreshTokensServiceResponse } from '@/types/auth.response';
import { apiClient, plainApiClient } from './client';

export const authService = {
    refreshTokens: async (
        refreshToken: string,
    ): Promise<RefreshTokensServiceResponse> => {
        const { data } = await plainApiClient.post('/auth/token/refresh', {
            refreshToken,
        });

        return data;
    },

    login: async (payload: {
        email: string;
        password: string;
    }): Promise<RefreshTokensServiceResponse> => {
        const { data } = await apiClient.post('/v1/auth/login/', payload);
        return data;
    },

    register: async (payload: {
        name: string;
        email: string;
        password: string;
    }): Promise<RefreshTokensServiceResponse> => {
        const { data } = await apiClient.post('/v1/auth/register/', payload);
        return data;
    },

    verifyAccount: async (payload: {
        email: string;
        otp: string;
    }): Promise<RefreshTokensServiceResponse> => {
        const { data } = await apiClient.post('/v1/auth/verify-otp/', payload);
        return data;
    },

    resendOtp: async (payload: { email: string }): Promise<void> => {
        await apiClient.post('/v1/auth/resend-otp/', payload);
    },

    forgotPassword: async (payload: { email: string }): Promise<void> => {
        await apiClient.post('/v1/auth/forgot-password/', payload);
    },

    verifyResendOtp: async (payload: {
        email: string;
        otp: string;
    }): Promise<void> => {
        await apiClient.post('/v1/auth/verify-resend-otp/', payload);
    },

    setPassword: async (payload: {
        email: string;
        otp: string;
        password: string;
    }): Promise<void> => {
        await apiClient.post('/v1/auth/set-password/', payload);
    },

    logOut: async (): Promise<void> => {
        await apiClient.post('/v1/auth/logout/');
    },
};
