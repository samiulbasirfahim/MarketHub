import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="OnboardingScreens"
                component={require('@/navigations/auth/OnboardingNavigator').default}
            />
            <Stack.Screen
                name="Login"
                component={require('@/screens/auth/login').default}
            />
        </Stack.Navigator>
    );
}
