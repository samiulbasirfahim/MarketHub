import { apiClient } from './client';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: 'user' | 'admin';
    createdAt: string;
}

export interface UpdateProfilePayload {
    name?: string;
    avatar?: string;
}

export const userService = {
    getMe: async (): Promise<User> => {
        const { data } = await apiClient.get('/v1/users/me/');
        return data;
    },

    updateProfile: async (payload: UpdateProfilePayload): Promise<User> => {
        const { data } = await apiClient.patch('/v1/users/me/', payload);
        return data;
    },

    uploadAvatar: async (formData: FormData): Promise<{ avatar: string }> => {
        const { data } = await apiClient.post('/v1/users/me/avatar/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },

    deleteAccount: async (): Promise<void> => {
        await apiClient.delete('/v1/users/me/');
    },
};
