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
                name="FilterScreen"
                component={require('@/screens/app/filter').default}
                options={{ headerShown: false }}
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
                name="ChatsListScreen"
                component={require('@/screens/app/chats/chats-list').default}
                options={{ title: 'Chats' }}
            />
            <Stack.Screen
                name="ChatScreen"
                component={require('@/screens/app/chats/chat').default}
                options={({ route }) => ({ title: route.params.vendorName })}
            />
        </Stack.Navigator>
    );
}
