import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import { Vendor } from '@/constants/mock-data';

type Props = {
    vendor: Vendor;
    onPress: (vendor: Vendor) => void;
};

export default function VendorRowCard({ vendor, onPress }: Props) {
    return (
        <Pressable
            style={styles.card}
            onPress={() => onPress(vendor)}
        >
            <View style={styles.content}>
                <Text variant="label" style={styles.muted}>
                    Since {vendor.since}
                </Text>
                <Text variant="body" weight="bold" style={styles.name}>
                    {vendor.name}
                </Text>
                <Text variant="caption" style={styles.count}>
                    ({vendor.productCount} products)
                </Text>
                <View style={styles.ratingRow}>
                    {new Array(5).fill(0).map((_, i) => (
                        <Star
                            key={`${vendor.id}-star-${i}`}
                            size={12}
                            color="#F5B63B"
                            fill="#F5B63B"
                        />
                    ))}
                    <Text variant="caption" style={styles.reviewCount}>
                        ({vendor.reviewCount})
                    </Text>
                </View>
            </View>
            <Image
                source={{ uri: vendor.image }}
                style={styles.avatar}
                resizeMode="cover"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 240,
        borderWidth: 1,
        borderColor: '#DDE4F0',
        borderRadius: 10,
        backgroundColor: colors.background,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    content: {
        flex: 1,
        gap: 2,
    },
    muted: {
        color: '#7384A3',
        fontSize: 11,
    },
    name: {
        color: '#1A243A',
        fontSize: 16,
    },
    count: {
        color: '#495A78',
    },
    ratingRow: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    reviewCount: {
        color: '#495A78',
        marginLeft: 4,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
});
