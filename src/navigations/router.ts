import { navigationRef } from './navigationRef';
import { RootStackParamList } from './types';

// [undefined] extends [T] is safer than T extends undefined for union types
type RouterArgs<Screen extends keyof RootStackParamList> = [undefined] extends [
    RootStackParamList[Screen],
]
    ? [params?: RootStackParamList[Screen]]
    : [params: RootStackParamList[Screen]];

export const router = {
    push: <Screen extends keyof RootStackParamList>(
        screen: Screen,
        ...args: RouterArgs<Screen>
    ) => {
        if (navigationRef.isReady()) {
            navigationRef.navigate(screen as any, args[0] as any);
        }
    },

    replace: <Screen extends keyof RootStackParamList>(
        screen: Screen,
        ...args: RouterArgs<Screen>
    ) => {
        if (navigationRef.isReady()) {
            navigationRef.reset({
                index: 0,
                routes: [{ name: screen, params: args[0] }],
            });
        }
    },

    dismissTo: <Screen extends keyof RootStackParamList>(
        screen: Screen,
        ...args: RouterArgs<Screen>
    ) => {
        if (!navigationRef.isReady()) return;

        const state = navigationRef.getState();
        if (!state) return;

        const routes = state.routes;
        const targetIndex = routes.findIndex(route => route.name === screen);

        if (targetIndex === -1) {
            navigationRef.navigate(screen as any, args[0] as any);
            return;
        }

        navigationRef.reset({
            ...state,
            index: targetIndex,
            routes: routes
                .slice(0, targetIndex + 1)
                .map((route, i) =>
                    i === targetIndex && args[0] ? { ...route, params: args[0] } : route,
                ),
        });
    },

    goBack: () => {
        if (navigationRef.isReady() && navigationRef.canGoBack()) {
            navigationRef.goBack();
        }
    },

    reset: () => {
        if (navigationRef.isReady()) {
            navigationRef.reset({ index: 0, routes: [] });
        }
    },
};
