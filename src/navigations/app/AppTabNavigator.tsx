import { createTabNavigator } from '@/utils/navigation.utils';
import { AppTabParamList } from '../types';
import { colors } from '@/constants/colors';
import { House, Search, ClipboardList, UserRound } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

const Tab = createTabNavigator<AppTabParamList>();

const getIcon = (routeName: keyof AppTabParamList, color: string) => {
    if (routeName === 'HomeTab') return <House size={20} color={color} />;
    if (routeName === 'SearchTab') return <Search size={20} color={color} />;
    if (routeName === 'OrderTab')
        return <ClipboardList size={20} color={color} />;
    return <UserRound size={20} color={color} />;
};

export default function AppTabNavigator() {
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => getIcon(route.name, color),
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontSize: 13,
                    fontWeight: '500',
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarShowIcon: true,
                tabBarIndicatorStyle: {
                    backgroundColor: 'transparent',
                    height: 0,
                },
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: styles.tabItem,
                tabBarPressColor: 'transparent',
            })}
        >
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
                component={require('./OrderStackNavigator').default}
                options={{ tabBarLabel: 'Order' }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={require('@/screens/app/settings').default}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.background,
        borderTopWidth: 2,
        borderTopColor: colors.border,
        elevation: 0,
        shadowOpacity: 0,
        overflow: 'hidden',
        height: 72,
        paddingBottom: 6,
    },
    tabItem: {
        paddingTop: 6,
    },
});
