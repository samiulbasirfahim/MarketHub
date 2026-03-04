import { createTabNavigator } from '@/utils/navigation.utils';
import { OnboardingScreensStackParamList } from '../types';
import { OnboardingLayout } from '@/components/layout/onboarding-layout';

const Tab = createTabNavigator<OnboardingScreensStackParamList>();

export default function OnboardingNavigator() {
    return (
        <Tab.Navigator
            backBehavior="history"
            tabBarPosition="bottom"
            tabBar={OnboardingLayout}
            screenOptions={{
                lazy: true,
                lazyPreloadDistance: 1,
            }}
        >
            <Tab.Screen
                name="OnboardingScreen1"
                component={require('@/screens/auth/onboarding/screen1').default}
            />

            <Tab.Screen
                name="OnboardingScreen2"
                component={require('@/screens/auth/onboarding/screen2').default}
            />

            <Tab.Screen
                name="OnboardingScreen3"
                component={require('@/screens/auth/onboarding/screen3').default}
            />
        </Tab.Navigator>
    );
}
