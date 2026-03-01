import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AppTab"
                component={require('./AppTabNavigator').default}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
