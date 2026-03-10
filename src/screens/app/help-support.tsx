import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Layout } from '@/components/layout/layout';
import Text from '@/components/ui/Text';
import { GradientBackground } from '@/components/common/gradient-background';
import { HelpButton } from '@/components/common/help-button';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { CircleHelp, Mail, MessageCircle, Phone } from 'lucide-react-native';
import { colors } from '@/constants/colors';

const FAQS = [
    {
        id: '1',
        title: 'How do I place an order?',
        content:
            'Browse products, add items to your cart, and proceed to checkout. You can pay using your saved payment method or add a new one during checkout.',
    },
    {
        id: '2',
        title: 'Can I cancel or return an order?',
        content:
            'Yes, you can cancel an order within 20 minutes of placing it. Returns are accepted within 7 days of delivery for eligible items. Visit the Orders section in your profile to initiate a return.',
    },
    {
        id: '3',
        title: 'How do I track my order?',
        content:
            'Once your order is shipped, you will receive a tracking link via email and push notification. You can also track your order from the Orders tab in the app.',
    },
    {
        id: '4',
        title: 'How do I update my payment method?',
        content:
            'Go to Profile → Payment Methods to add, edit, or remove your saved payment methods.',
    },
    {
        id: '5',
        title: 'Is my personal data safe?',
        content:
            'Yes. We use industry-standard encryption to protect your data. We never sell your personal information to third parties. Please review our Privacy Policy for more details.',
    },
];

export default function HelpSupportScreen() {
    const handleLinkOpen = async (type: 'email' | 'phone') => {
        const email = 'support@markethub.com';
        const phone = '+1800000000';

        try {
            await Linking.openURL(
                type === 'email' ? `mailto:${email}` : `tel:${phone}`,
            );
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <Layout style={{ gap: 20 }}>
            <GradientBackground>
                <CircleHelp size={36} color="#ffffff" opacity={0.9} />
                <Text style={sts.gradientTitle}>How can we help?</Text>
                <Text style={sts.gradientSub}>
                    Our support team is available 24/7 to assist you.
                </Text>
            </GradientBackground>

            <View>
                <Text variant="label" style={sts.sectionLabel}>
                    CONTACT US
                </Text>
                <View style={sts.btnContainer}>
                    <HelpButton
                        title="Chat"
                        onPress={() => {}}
                        icon={MessageCircle}
                        color="#4F46E5"
                    />
                    <HelpButton
                        title="Email"
                        onPress={() => handleLinkOpen('email')}
                        icon={Mail}
                        color="#159D72"
                    />
                    <HelpButton
                        title="Call"
                        onPress={() => handleLinkOpen('phone')}
                        icon={Phone}
                        color="#DB2878"
                    />
                </View>
            </View>

            <View>
                <Text variant="label" style={sts.sectionLabel}>
                    POPULAR FAQS
                </Text>
                <FAQAccordion data={FAQS} />
            </View>
        </Layout>
    );
}

const sts = StyleSheet.create({
    sectionLabel: {
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: colors.textSecondary,
    },
    btnContainer: {
        gap: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    gradientTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#ffffff',
        marginTop: 4,
    },
    gradientSub: {
        color: '#ffffffCC',
        fontSize: 13,
        lineHeight: 18,
    },
});
