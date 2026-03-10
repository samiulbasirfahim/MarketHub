import { createStackNavigator } from '@/utils/navigation.utils';
import { ForgotPasswordStackParamList } from '../types';
import { defaultScreenOptions } from '../defaultOptions';

const Stack = createStackNavigator<ForgotPasswordStackParamList>();

export default function ForgetPasswordNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...defaultScreenOptions,
            }}
        >
            <Stack.Screen
                name="EmailScreen"
                component={
                    require('@/screens/auth/forgot-password/emailScreen').default
                }
                options={{
                    title: 'Forgot Password',
                }}
            />
            <Stack.Screen
                name="VerifiyOtp"
                component={require('@/screens/auth/forgot-password/verifyOtp').default}
                options={{
                    title: 'Verify OTP',
                }}
            />
            <Stack.Screen
                name="SetPassword"
                component={
                    require('@/screens/auth/forgot-password/setPassword').default
                }
                options={{
                    title: 'Set New Password',
                }}
            />
        </Stack.Navigator>
    );
}
