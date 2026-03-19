import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsSubScreensStackParamList } from '../types';
import { defaultScreenOptions } from '../defaultOptions';

const Stack = createNativeStackNavigator<SettingsSubScreensStackParamList>();

export default function SettingsSubScreensNavigator() {
    return (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen
                name="Profile"
                component={require('@/screens/app/settings/profile').default}
                options={{ title: 'Profile' }}
            />
            <Stack.Screen
                name="PersonalInformation"
                component={require('@/screens/app/settings/personal-information').default}
                options={{ title: 'Personal Information' }}
            />
            <Stack.Screen
                name="SavedAddresses"
                component={require('@/screens/app/settings/saved-addresses').default}
                options={{ title: 'Saved Addresses' }}
            />
            <Stack.Screen
                name="AddressForm"
                component={require('@/screens/app/settings/address-form').default}
                options={({ route }) => ({
                    title: route.params?.id ? 'Edit Address' : 'Add Address',
                })}
            />
            <Stack.Screen
                name="MyWishList"
                component={require('@/screens/app/settings/my-wishlist').default}
                options={{ title: 'My Wishlist' }}
            />
            <Stack.Screen
                name="MyReviews"
                component={require('@/screens/app/settings/my-reviews').default}
                options={{ title: 'My Reviews' }}
            />
        </Stack.Navigator>
    );
}
