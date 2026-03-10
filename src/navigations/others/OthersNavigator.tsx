import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OthersStackParamList } from '../types';
import { defaultScreenOptions } from '../defaultOptions';

const Stack = createNativeStackNavigator<OthersStackParamList>();

export default function OthersNavigator() {
    return (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen
                name="PrivacyPolicy"
                component={require('@/screens/app/privacy-policy').default}
                options={{ title: 'Privacy Policy' }}
            />
            <Stack.Screen
                name="TermsCondition"
                component={require('@/screens/app/terms-and-conditions').default}
                options={{ title: 'Terms & Conditions' }}
            />
            <Stack.Screen
                name="HelpSupport"
                component={require('@/screens/app/help-support').default}
                options={{ title: 'Help & Support' }}
            />

        </Stack.Navigator>
    );
}
