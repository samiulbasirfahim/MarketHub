import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Star, ShoppingCart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { MOCK_POPULAR_PRODUCTS } from '@/constants/mock-data';

const WISHLIST_ITEMS = MOCK_POPULAR_PRODUCTS.slice(0, 3);

export default function MyWishlistScreen() {
    return (
        <View style={styles.screen}>
            <FlatList
                data={WISHLIST_ITEMS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text variant="label" style={styles.itemCount}>
                        {WISHLIST_ITEMS.length} items
                    </Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.itemRow}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.itemImage}
                                resizeMode="contain"
                            />
                            <View style={styles.itemInfo}>
                                <Text variant="body" weight="semibold" numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <Text variant="caption" style={styles.brand}>
                                    By Mr.food
                                </Text>

                                <View style={styles.priceRow}>
                                    <Text variant="body" weight="bold" style={styles.price}>
                                        ${item.price.toFixed(2)}
                                    </Text>
                                    {item.originalPrice && (
                                        <Text variant="caption" style={styles.originalPrice}>
                                            ${item.originalPrice.toFixed(2)}
                                        </Text>
                                    )}

                                    <View style={{ flex: 1 }} />

                                    <Button
                                        label="Add"
                                        variant="ghost"
                                        size="sm"
                                        prefixIcon={ShoppingCart}
                                        onPress={() => { }}
                                        style={styles.addBtn}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <Button label="Continue Shopping" onPress={() => { }} fullWidth />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    list: {
        padding: 14,
        gap: 12,
    },
    itemCount: {
        color: colors.textSecondary,
        marginBottom: 8,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        gap: 10,
    },
    itemRow: {
        flexDirection: 'row',
        gap: 12,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#FFD700',
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    brand: {
        color: colors.primary,
        marginTop: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    price: {
        color: colors.primary,
        fontSize: 16,
    },
    originalPrice: {
        color: colors.textTertiary,
        textDecorationLine: 'line-through',
    },
    addBtn: {
        borderRadius: 20,
        borderColor: colors.primary,
        alignSelf: 'flex-end',
    },
    footer: {
        padding: 16,
        paddingTop: 8,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
});
