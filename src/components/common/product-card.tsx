import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';

export type Product = {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice?: number;
};

type Props = {
    product: Product;
    onPress: (product: Product) => void;
    style?: object;
};

export default function ProductCard({ product, onPress, style }: Props) {
    const discount =
        product.originalPrice && product.originalPrice > product.price
            ? Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) *
                100,
            )
            : null;

    return (
        <Pressable style={[styles.card, style]} onPress={() => onPress(product)}>
            <View style={styles.imageWrapper}>
                {discount !== null && (
                    <View style={styles.badge}>
                        <Text variant="overline" style={styles.badgeText}>
                            -{discount}%
                        </Text>
                    </View>
                )}
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.info}>
                <Text
                    variant="body"
                    weight="semibold"
                    style={styles.name}
                    numberOfLines={2}
                >
                    {product.name}
                </Text>

                <View style={styles.ratingRow}>
                    <Star size={12} color={colors.warning} fill={colors.warning} />
                    <Text variant="caption" style={styles.ratingText}>
                        {product.rating.toFixed(1)} ({product.reviewCount})
                    </Text>
                </View>

                <View style={styles.priceRow}>
                    <Text variant="body" weight="bold" style={styles.price}>
                        ${product.price.toFixed(2)}
                    </Text>
                    {product.originalPrice && (
                        <Text variant="caption" style={styles.originalPrice}>
                            ${product.originalPrice.toFixed(2)}
                        </Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    imageWrapper: {
        backgroundColor: colors.surface,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '85%',
        height: '85%',
    },
    badge: {
        position: 'absolute',
        top: 14,
        left: 0,
        backgroundColor: colors.error,
        borderLeftWidth: 0,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 1,
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
    },
    info: {
        padding: 10,
        gap: 4,
    },
    name: {
        color: colors.text,
        fontSize: 13,
        lineHeight: 18,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        color: colors.textSecondary,
        fontSize: 11,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 2,
    },
    price: {
        color: colors.primary,
        fontSize: 15,
    },
    originalPrice: {
        color: colors.textTertiary,
        fontSize: 12,
        textDecorationLine: 'line-through',
    },
});
