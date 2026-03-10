import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/components/layout/layout';
import Text from '@/components/ui/Text';
import { NotificationCard } from '@/components/common/notification-card';
import { colors } from '@/constants/colors';

const notificationsData = [
    {
        id: '1',
        title: 'Order Confirmed',
        message: 'Your order #MH-00123 has been confirmed and is being processed.',
        date: new Date(2026, 2, 10, 9, 0),
    },
    {
        id: '2',
        title: 'Flash Sale Today!',
        message:
            'Up to 50% off on electronics. Limited time offer — shop before it ends!',
        date: new Date(2026, 2, 10, 8, 30),
    },
    {
        id: '3',
        title: 'Order Shipped',
        message:
            'Your order #MH-00119 has been shipped. Expected delivery: March 12.',
        date: new Date(2026, 2, 9, 22, 15),
    },
    {
        id: '4',
        title: 'New Arrivals',
        message:
            'Check out the latest products added to MarketHub in your favorite categories.',
        date: new Date(2026, 2, 9, 18, 45),
    },
    {
        id: '5',
        title: 'Review Reminder',
        message:
            'You recently received an order. Share your feedback and help other buyers!',
        date: new Date(2026, 2, 9, 10, 0),
    },
    {
        id: '6',
        title: 'Payment Successful',
        message: 'Payment of $49.99 for order #MH-00115 was processed successfully.',
        date: new Date(2026, 2, 8, 14, 20),
    },
    {
        id: '7',
        title: 'Profile Updated',
        message: 'Your profile information has been updated successfully.',
        date: new Date(2026, 2, 8, 11, 30),
    },
    {
        id: '8',
        title: 'Wishlist Item on Sale',
        message:
            'An item in your wishlist is now on sale. Grab it before stock runs out!',
        date: new Date(2026, 2, 7, 9, 0),
    },
    {
        id: '9',
        title: 'Security Alert',
        message:
            "A new login was detected on your account. If this wasn't you, please update your password.",
        date: new Date(2026, 2, 6, 16, 0),
    },
    {
        id: '10',
        title: 'Referral Bonus',
        message:
            'Your friend joined MarketHub using your referral. You earned $5 in store credit!',
        date: new Date(2026, 2, 5, 12, 45),
    },
];

function SectionHeader({ title }: { title: string }) {
    return (
        <View style={sts.sectionHeader}>
            <Text variant="label" style={{ fontWeight: '600' }}>
                {title}
            </Text>
            <View
                style={[
                    sts.sectionLine,
                    { backgroundColor: colors.border },
                ]}
            />
        </View>
    );
}

export default function NotificationsScreen() {
    return (
        <Layout style={{ gap: 4 }}>
            <View style={sts.section}>
                <SectionHeader title="Today" />
                {notificationsData.slice(0, 2).map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        title={notification.title}
                        message={notification.message}
                        date={notification.date}
                    />
                ))}
            </View>

            <View style={sts.section}>
                <SectionHeader title="Yesterday" />
                {notificationsData.slice(2, 5).map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        title={notification.title}
                        message={notification.message}
                        date={notification.date}
                    />
                ))}
            </View>

            <View style={sts.section}>
                <SectionHeader title="Earlier" />
                {notificationsData.slice(5).map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        title={notification.title}
                        message={notification.message}
                        date={notification.date}
                    />
                ))}
            </View>
        </Layout>
    );
}

const sts = StyleSheet.create({
    section: {
        width: '100%',
        marginBottom: 8,
    },
    sectionHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        borderRadius: 3,
    },
});
