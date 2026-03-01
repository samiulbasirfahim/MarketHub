import SplashScreen from '@/screens/slash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuthStore } from '@/store';
import { useEffect } from 'react';
import { useVerifyToken } from '@/queries/auth.queries';

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
        <NavigationContainer>
            <Root.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Root.Screen
                        name="App"
                        component={require('@/screens/main').default}
                    />
                ) : (
                    <Root.Screen
                        name="Auth"
                        component={require('./auth/AuthNavigator').default}
                    />
                )}
            </Root.Navigator>
        </NavigationContainer>
    );
}
