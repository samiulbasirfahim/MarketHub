import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppOthersStackParamList } from '../types';
import { defaultScreenOptions } from '../defaultOptions';

const Stack = createNativeStackNavigator<AppOthersStackParamList>();

export default function AppOthersNavigator() {
    return (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen
                name="NotificationScreen"
                component={require('@/screens/app/notifications').default}
                options={{ title: 'Notifications' }}
            />
            <Stack.Screen
                name="HomeSubScreens"
                component={require('./HomeSubScreensNavigator').default}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SettingsSubScreens"
                component={require('./SettingsSubScreensNavigator').default}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={require('@/screens/app/order-details').default}
                options={{ title: 'Order Details' }}
            />
        </Stack.Navigator>
    );
}
