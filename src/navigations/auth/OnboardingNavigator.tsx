import { createTabNavigator } from '@/utils/navigation.utils';
import { OnboardingScreensStackParamList } from '../types';
import { OnboardingLayout } from '@/components/layout/onboarding-layout';
import OnboardingBackground from '@/components/common/onboarding-bg';
import { View, StyleSheet } from 'react-native';

const Tab = createTabNavigator<OnboardingScreensStackParamList>();

export default function OnboardingNavigator() {
    return (
        <View style={styles.container}>
            <OnboardingBackground />

            <Tab.Navigator
                backBehavior="history"
                tabBarPosition="bottom"
                tabBar={OnboardingLayout}
                screenOptions={{
                    lazy: true,
                    lazyPreloadDistance: 1,
                    sceneStyle: { backgroundColor: 'transparent' },
                }}
                style={styles.navigator}
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
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    navigator: {
        backgroundColor: 'transparent',
    },
});
