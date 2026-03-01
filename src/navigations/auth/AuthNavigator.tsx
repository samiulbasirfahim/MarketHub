import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={require('@/screens/auth/login').default}
            />
        </Stack.Navigator>
    );
}
