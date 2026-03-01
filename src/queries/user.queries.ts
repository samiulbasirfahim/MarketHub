import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { userService } from '@/services/api/users.service';

export function useGetMe() {
    return useQuery({
        queryKey: queryKeys.users.detail('me'),
        queryFn: userService.getMe,
        staleTime: 1000 * 60 * 5,
    });
}
