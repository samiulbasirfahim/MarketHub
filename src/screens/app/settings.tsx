import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    SettingsButtonGroup,
    SettingsButton,
} from '@/components/common/settings-button-group';
import { DangerButton } from '@/components/common/danger-button';
import { LogoutModal } from '@/components/common/logout-modal';
import { SettingsHeader } from '@/components/common/settings-header';
import { router } from '@/navigations/router';
import { colors } from '@/constants/colors';
import {
    Bell,
    FileText,
    Heart,
    HelpCircle,
    Lock,
    LogOut,
    Moon,
    Shield,
    Star,
    User,
} from 'lucide-react-native';

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [showLogout, setShowLogout] = useState(false);

    const accountButtons: SettingsButton[] = [
        {
            label: 'Edit Profile',
            icon: User,
            onPress: () => { },
        },
        {
            label: 'Saved Addresses',
            icon: Lock,
            onPress: () => { },
        },
        {
            label: 'My Wishlist',
            icon: Heart,
            onPress: () => { },
        },
        {
            label: 'My Reviews',
            icon: Star,
            onPress: () => { },
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
            <SettingsHeader
                userName="MD, Moinuddin"
                onNotificationPress={() =>
                {
                    console.log("HELLO");
                } 
                }
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

                <LogoutModal
                    isOpen={showLogout}
                    onClose={() => setShowLogout(false)}
                />
            </ScrollView>
        </View>
    );
}

const sts = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    body: { padding: 20, gap: 20 },
});
