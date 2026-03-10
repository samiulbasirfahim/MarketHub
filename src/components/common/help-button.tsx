import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from '@/components/ui/Text';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type Props = {
    title: string;
    onPress: () => void;
    icon: LucideIcon;
    iconSize?: number;
    color: string;
};

export function HelpButton({
    title,
    onPress,
    icon: Icon,
    color,
    iconSize = 22,
}: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [sts.container, { opacity: pressed ? 0.8 : 1 }]}
        >
            <View
                style={[
                    sts.iconContainer,
                    {
                        backgroundColor: color + '20',
                    },
                ]}
            >
                <Icon size={iconSize} color={color} />
            </View>
            <Text variant="label" style={{ fontWeight: '600', textAlign: 'center' }}>
                {title}
            </Text>
        </Pressable>
    );
}

const sts = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        flex: 1,
        borderWidth: 1,
        aspectRatio: 1,
        borderColor: colors.border,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
    },
});
