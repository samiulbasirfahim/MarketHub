import SplashScreen from '@/screens/splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuthStore } from '@/store';
import { useEffect } from 'react';
import { useVerifyToken } from '@/queries/auth.queries';
import { navigationRef } from './navigationRef';

const Root = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    const { isHydrated, clearAuth, isAuthenticated } = useAuthStore();

    const { isLoading: isVerifying, isError } = useVerifyToken();

    useEffect(() => {
        if (isError) clearAuth();
    }, [isError]);

    const isInitializing = !isHydrated || isVerifying;

    if (isInitializing) return <SplashScreen />;

    return (
        <NavigationContainer ref={navigationRef}>
            <Root.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Root.Screen
                        name="App"
                        component={require('./app/AppNavigator').default}
                    />
                ) : (
                    <Root.Screen
                        name="Auth"
                        component={require('./auth/AuthNavigator').default}
                    />
                )}
                <Root.Screen
                    name="Others"
                    component={require('./others/OthersNavigator').default}
                />
            </Root.Navigator>
        </NavigationContainer>
    );
}
