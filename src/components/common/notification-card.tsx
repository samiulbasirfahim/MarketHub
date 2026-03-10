import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Bell, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';

type Props = {
    title: string;
    message: string;
    date: Date;
};

export function NotificationCard({ title, message, date }: Props) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <View
            style={[
                sts.container,
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                },
            ]}
        >
            <View style={sts.topRow}>
                <View style={sts.leftContent}>
                    <View
                        style={[
                            sts.iconContainer,
                            {
                                borderColor: colors.border,
                            },
                        ]}
                    >
                        <Bell size={20} color={colors.primary} />
                    </View>
                    <View style={sts.textContent}>
                        <Text variant="bodyBold">{title}</Text>
                        <Text variant="body" style={sts.message}>
                            {message}
                        </Text>
                        <Text
                            variant="caption"
                            style={{ color: colors.primary, marginTop: 2 }}
                        >
                            {formatTime(date)}
                        </Text>
                    </View>
                </View>

                <View style={sts.chevronContainer}>
                    <ChevronRight
                        size={18}
                        color={colors.textTertiary}
                        strokeWidth={2}
                    />
                </View>
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        width: '100%',
        marginBottom: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        gap: 12,
    },
    iconContainer: {
        borderWidth: 1,
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContent: {
        flex: 1,
        gap: 2,
    },
    message: {
        fontSize: 13,
        opacity: 0.8,
        lineHeight: 18,
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
    },
});
