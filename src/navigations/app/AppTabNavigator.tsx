import { createTabNavigator } from '@/utils/navigation.utils';
import { AppTabParamList } from '../types';

const Tab = createTabNavigator<AppTabParamList>();

export default function AppTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
            <Tab.Screen
                name="HomeTab"
                component={require('@/screens/app/home').default}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="SearchTab"
                component={require('@/screens/app/search').default}
                options={{ tabBarLabel: 'Search' }}
            />
            <Tab.Screen
                name="OrderTab"
                component={require('@/screens/app/orders').default}
                options={{ tabBarLabel: 'Orders' }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={require('@/screens/app/settings').default}
                options={{ tabBarLabel: 'Settings' }}
            />
        </Tab.Navigator>
    );
}
