import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';

type Props = {
    title: string;
    subtitle: string;
};

export function PrivacySection({ title, subtitle }: Props) {
    return (
        <View
            style={{
                width: '100%',
                marginTop: 16,
            }}
        >
            <Text variant="secondary">{title}</Text>
            <Text variant="body" style={{ marginTop: 6 }}>
                {subtitle}
            </Text>
        </View>
    );
}
