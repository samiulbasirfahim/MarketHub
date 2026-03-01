import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/api/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { queryKeys } from './queryKeys';

export function useVerifyToken() {
    const { refreshToken, setTokens } = useAuthStore();

    return useQuery({
        queryKey: queryKeys.auth.verify(),
        queryFn: async () => {
            const data = await authService.refreshTokens(refreshToken!);
            setTokens(data);
            return data;
        },
        enabled: !!refreshToken,
        staleTime: 0,
        gcTime: 0,
        retry: 1,
        throwOnError: false,
    });
}

export function useLogin() {
    const { setTokens } = useAuthStore();

    return useMutation({
        mutationFn: authService.login,
        onSuccess: ({ accessToken, refreshToken }) => {
            setTokens({ accessToken, refreshToken });
        },
    });
}

export function useLogout() {
    const { clearAuth } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logOut,
        onSettled: () => {
            clearAuth();
            queryClient.clear();
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: authService.register,
    });
}

export function useVerifyAccount() {
    const { setTokens } = useAuthStore();

    return useMutation({
        mutationFn: authService.verifyAccount,
        onSuccess: ({ accessToken, refreshToken }) => {
            setTokens({ accessToken, refreshToken });
        },
    });
}

export function useResendOtp() {
    return useMutation({
        mutationFn: authService.resendOtp,
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: authService.forgotPassword,
    });
}

export function useVerifyResetOtp() {
    return useMutation({
        mutationFn: authService.verifyResendOtp,
    });
}

export function useSetPassword() {
    return useMutation({
        mutationFn: authService.setPassword,
    });
}
