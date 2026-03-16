import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
    SettingsButtonGroup,
    SettingsButton,
} from '@/components/common/settings-button-group';
import { DangerButton } from '@/components/common/danger-button';
import { LogoutModal } from '@/components/common/logout-modal';
import { router } from '@/navigations/router';
import { colors } from '@/constants/colors';
import {
    Bell,
    FileText,
    Heart,
    HelpCircle,
    Lock,
    LogOut,
    Shield,
    Star,
    User,
} from 'lucide-react-native';
import { AppHeader } from '@/components/common/gradient-header';

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [showLogout, setShowLogout] = useState(false);

    const accountButtons: SettingsButton[] = [
        {
            label: 'Edit Profile',
            icon: User,
            onPress: () =>
                router.push('App', {
                    screen: 'OthersStack',
                    params: {
                        screen: 'SettingsSubScreens',
                        params: { screen: 'Profile' },
                    },
                }),
        },
        {
            label: 'Saved Addresses',
            icon: Lock,
            onPress: () =>
                router.push('App', {
                    screen: 'OthersStack',
                    params: {
                        screen: 'SettingsSubScreens',
                        params: { screen: 'SavedAddresses' },
                    },
                }),
        },
        {
            label: 'My Wishlist',
            icon: Heart,
            onPress: () =>
                router.push('App', {
                    screen: 'OthersStack',
                    params: {
                        screen: 'SettingsSubScreens',
                        params: { screen: 'MyWishList' },
                    },
                }),
        },
        {
            label: 'My Reviews',
            icon: Star,
            onPress: () =>
                router.push('App', {
                    screen: 'OthersStack',
                    params: {
                        screen: 'SettingsSubScreens',
                        params: { screen: 'MyReviews' },
                    },
                }),
        },
    ];

    const preferenceButtons: SettingsButton[] = [
        {
            label: 'Notifications',
            description: 'Manage push and email alerts',
            icon: Bell,
            toggle: true,
            value: notificationsEnabled,
            onValueChange: setNotificationsEnabled,
        },
    ];

    const legalButtons: SettingsButton[] = [
        {
            label: 'Privacy Policy',
            icon: Shield,
            onPress: () => router.push('Others', { screen: 'PrivacyPolicy' }),
        },
        {
            label: 'Terms & Conditions',
            icon: FileText,
            onPress: () => router.push('Others', { screen: 'TermsCondition' }),
        },
        {
            label: 'Help & Support',
            icon: HelpCircle,
            onPress: () => router.push('Others', { screen: 'HelpSupport' }),
        },
    ];

    return (
        <View style={sts.screen}>
            <AppHeader
                variant="settings"
                userName={'Samiul Basir Fahim'}
                avatarUri="https://avatars.githubusercontent.com/u/50765971?v=4"
                onNotificationPress={() => {
                    router.push('App', {
                        screen: 'OthersStack',
                        params: {
                            screen: 'NotificationScreen',
                        },
                    });
                }}
            />
            <ScrollView
                contentContainerStyle={sts.body}
                showsVerticalScrollIndicator={false}
            >
                <SettingsButtonGroup label="Account" buttons={accountButtons} />
                <SettingsButtonGroup label="Preferences" buttons={preferenceButtons} />
                <SettingsButtonGroup label="Legal & Support" buttons={legalButtons} />

                <DangerButton
                    label="Sign Out"
                    icon={LogOut}
                    onPress={() => setShowLogout(true)}
                />

                <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
            </ScrollView>
        </View>
    );
}

const sts = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    body: { padding: 20, gap: 20 },
});
