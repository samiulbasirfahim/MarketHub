import React from 'react';
import { View } from 'react-native';
import { Layout } from '@/components/layout/layout';
import Text from '@/components/ui/Text';
import { PrivacySection } from '@/components/common/privacy-section';
import { TERMS_CONDITION_DATA } from '@/constants/legal-data';

export default function TermsAndConditionsScreen() {
    return (
        <Layout>
            <View style={{ marginBottom: 4 }}>
                <Text variant="primary" style={{ fontSize: 26, lineHeight: 34 }}>
                    {TERMS_CONDITION_DATA.title}
                </Text>
                <Text variant="label" style={{ marginTop: 4 }}>
                    Effective Date: {TERMS_CONDITION_DATA.date}
                </Text>
            </View>

            {TERMS_CONDITION_DATA.data.map((section, index) => (
                <PrivacySection
                    key={index}
                    title={section.title}
                    subtitle={section.subtitle}
                />
            ))}
        </Layout>
    );
}
