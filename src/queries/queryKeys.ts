export const queryKeys = {
    auth: {
        all: ['auth'] as const,
        verify: () => [...queryKeys.auth.all, 'verify'] as const,
        me: () => [...queryKeys.auth.all, 'me'] as const,
    },
    users: {
        all: ['users'] as const,
        lists: () => [...queryKeys.users.all, 'list'] as const,
        detail: (id: string) => [...queryKeys.users.all, 'detail', id] as const,
        me: () => [...queryKeys.users.all, 'me'] as const,
    },
};
