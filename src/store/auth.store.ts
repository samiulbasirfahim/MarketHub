import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
    refreshToken: string | null;
    accessToken: string | null;

    isAuthenticated: boolean;
    isHydrated: boolean;

    setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
    setAccessToken: (accessToken: string) => void;
    clearAuth: () => void;
    setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            refreshToken: null,
            accessToken: null,
            isAuthenticated: false,
            isHydrated: false,

            setTokens: ({ accessToken, refreshToken }) =>
                set({ accessToken, refreshToken, isAuthenticated: true }),

            setAccessToken: accessToken =>
                set({ accessToken, isAuthenticated: true }),

            clearAuth: () =>
                set({
                    refreshToken: null,
                    accessToken: null,
                    isAuthenticated: false,
                }),

            setHydrated: value => set({ isHydrated: value }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),

            partialize: state => ({
                refreshToken: state.refreshToken,
            }),
            onRehydrateStorage: () => state => {
                state?.setHydrated(true);
            },
        },
    ),
);
