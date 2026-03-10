import React from 'react';
import { View } from 'react-native';
import { Layout } from '@/components/layout/layout';
import Text from '@/components/ui/Text';
import { PrivacySection } from '@/components/common/privacy-section';
import { PRIVACY_POLICY_DATA } from '@/constants/legal-data';
import { router } from '@/navigations/router';

export default function PrivacyPolicyScreen() {
    return (
        <Layout>
            <View style={{ marginBottom: 4 }}>
                <Text variant="primary" style={{ fontSize: 26, lineHeight: 34 }}>
                    {PRIVACY_POLICY_DATA.title}
                </Text>
                <Text variant="label" style={{ marginTop: 4 }}>
                    Last updated: {PRIVACY_POLICY_DATA.date}
                </Text>
            </View>

            {PRIVACY_POLICY_DATA.data.map((section, index) => (
                <PrivacySection
                    key={index}
                    title={section.title}
                    subtitle={section.subtitle}
                />
            ))}
        </Layout>
    );
}
