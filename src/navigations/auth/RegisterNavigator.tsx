import { createStackNavigator } from '@/utils/navigation.utils';
import { RegisterStackParamList } from '../types';

const Stack = createStackNavigator<RegisterStackParamList>();

export default function ForgetPasswordNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Register"
                component={require('@/screens/auth/register/register').default}
            />
            <Stack.Screen
                name="VerifiyOtp"
                options={{
                    headerShown: true,
                    title: 'Verify OTP',
                }}
                component={require('@/screens/auth/register/verifyOtp').default}
            />
        </Stack.Navigator>
    );
}
