import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import { AddressItem } from '@/screens/app/settings/address-data';

type Props = {
    address: AddressItem;
    selected?: boolean;
    badgeLabel?: string;
    showActions?: boolean;
    onPress?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function AddressCard({
    address,
    selected = false,
    badgeLabel,
    showActions = false,
    onPress,
    onEdit,
    onDelete,
}: Props) {
    const resolvedBadgeLabel =
        badgeLabel ?? (address.defaultDelivery ? 'Default' : address.addressLabel);

    return (
        <Pressable
            onPress={onPress}
            disabled={!onPress}
            style={[styles.card, selected && styles.cardSelected]}
        >
            <View style={styles.topRow}>
                <Text variant="bodyLarge" weight="semibold" style={styles.nameText}>
                    {address.fullName}
                </Text>
                {resolvedBadgeLabel && (
                    <View style={styles.defaultBadge}>
                        <Text variant="label" style={styles.defaultText}>
                            {resolvedBadgeLabel}
                        </Text>
                    </View>
                )}
            </View>

            <Text variant="body" size="md" style={styles.metaText}>
                {address.line1}
            </Text>
            <Text variant="body" size="md" style={styles.metaText}>
                {address.line2}
            </Text>
            <Text variant="body" size="md" style={styles.metaText}>
                Phone: {address.phone}
            </Text>

            {showActions && (
                <View style={styles.actionsRow}>
                    <Pressable onPress={onEdit ?? (() => { })}>
                        <Text style={styles.editLabel} variant="label">
                            EDIT
                        </Text>
                    </Pressable>
                    <Pressable onPress={onDelete ?? (() => { })}>
                        <Text style={styles.deleteLabel} variant="label">
                            DELETE
                        </Text>
                    </Pressable>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        backgroundColor: colors.background,
        padding: 14,
        gap: 7,
    },
    cardSelected: {
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}12`,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    nameText: {
        color: colors.text,
        flex: 1,
        fontSize: 16,
    },
    defaultBadge: {
        backgroundColor: `${colors.primary}1F`,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    defaultText: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 12,
    },
    metaText: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 20,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
        marginTop: 2,
    },
    editLabel: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        color: colors.primary,
    },

    deleteLabel: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        color: colors.error,
    },
});
