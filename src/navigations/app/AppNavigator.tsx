import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';
import { defaultScreenOptions } from '../defaultOptions';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen
                name="AppTab"
                component={require('./AppTabNavigator').default}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OthersStack"
                component={require('./AppOthersNavigator').default}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
