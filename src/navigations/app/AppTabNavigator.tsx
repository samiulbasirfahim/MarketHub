import { craeteTabNavigator } from '@/utils/navigation.utils';
import { AppTabParamList } from '../types';

const Tab = craeteTabNavigator<AppTabParamList>();

export default function AppTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeTab"
                component={require('@/screens/app/home').default}
                options={{ title: 'Home' }}
            />
        </Tab.Navigator>
    );
}
