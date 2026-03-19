import React, { useState } from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { TextInput } from 'react-native';
import { colors } from '@/constants/colors';
import { Layout } from '@/components/layout';
import { ShoppingCart } from 'lucide-react-native';

interface CartItem {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
    selected: boolean;
}

const MOCK_CART_ITEMS: CartItem[] = [
    {
        id: '4',
        name: 'Bluetooth Speaker',
        brand: 'BassBoom',
        price: 89.99,
        image: '#F87171',
        quantity: 1,
        selected: false,
    },
];

export default function CartScreen() {
    const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);
    const [coupon, setCoupon] = useState('');

    const toggleSelected = (id: string) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item,
            ),
        );
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) return;
        setCartItems(items =>
            items.map(item => (item.id === id ? { ...item, quantity } : item)),
        );
    };

    const selectedItems = cartItems.filter(item => item.selected);
    const subTotal = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const discount = 2.0;
    const tax = 0.05;
    const shippingFee = 0.0;
    const total = subTotal - discount + tax + shippingFee;

    if (cartItems.length === 0) {
        return (
            <Layout centered verticalCenter>
                <View style={styles.emptyIconWrap}>
                    <ShoppingCart size={56} strokeWidth={2} color={colors.primary} />
                </View>
                <Text variant="body">Your cart is empty</Text>
                <Text variant="label">Add items from restaurants to get started</Text>
                <Button label="Continue Shopping" onPress={() => { }} />
            </Layout>
        );
    }

    return (
        <Layout scrollEnabled={false}>
            <Text variant="caption" weight="bold">
                {selectedItems.length} item selected
            </Text>

            {/* Expands to fill all space not claimed by overview + button */}
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                renderItem={({ item }) => (
                    <View style={styles.cartItemRow}>
                        <View style={styles.checkboxWrap}>
                            <Checkbox
                                value={item.selected}
                                onValueChange={() => toggleSelected(item.id)}
                                size={20}
                            />
                        </View>

                        <View style={styles.imageWrap}>
                            <View
                                style={[styles.productImage, { backgroundColor: item.image }]}
                            />
                        </View>

                        <View style={styles.itemContent}>
                            <Text
                                variant="body"
                                weight="semibold"
                                style={styles.itemName}
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                            <Text variant="label" style={styles.itemBrand}>
                                By {item.brand}
                            </Text>
                            <Text variant="body" weight="bold" style={styles.itemPrice}>
                                ${item.price.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.quantityControl}>
                            <Pressable
                                style={styles.quantityBtn}
                                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                <Text style={styles.quantityBtnText}>−</Text>
                            </Pressable>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <Pressable
                                style={styles.quantityBtn}
                                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                <Text style={styles.quantityBtnText}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />

            {/* Your existing overview — untouched */}
            <View style={styles.orderOverView}>
                <View style={styles.couponSection}>
                    <TextInput
                        placeholder="Enter Your Coupon"
                        placeholderTextColor={colors.textSecondary}
                        value={coupon}
                        onChangeText={setCoupon}
                        style={styles.couponInput}
                    />
                    <Button label="Apply" onPress={() => { }} style={styles.applyBtn} />
                </View>

                <View style={styles.summarySection}>
                    <Text variant="body" weight="bold" style={styles.summaryTitle}>
                        Order Summary
                    </Text>

                    {[
                        { label: 'Shipping fee', value: shippingFee },
                        { label: 'Sub total', value: subTotal },
                        { label: 'Discount', value: discount },
                        { label: 'Tax', value: tax },
                    ].map(row => (
                        <View key={row.label} style={styles.summaryRow}>
                            <Text variant="label" style={styles.summaryLabel}>
                                {row.label}
                            </Text>
                            <Text
                                variant="label"
                                weight="semibold"
                                style={styles.summaryValue}
                            >
                                ${row.value.toFixed(2)}
                            </Text>
                        </View>
                    ))}

                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text variant="body" weight="bold" style={styles.summaryLabel}>
                            Total
                        </Text>
                        <Text variant="body" weight="bold" style={styles.totalValue}>
                            ${total.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.itemContent} />
            <Button label="Proceed to Checkout" fullWidth onPress={() => { }} />
        </Layout>
    );
}

const styles = StyleSheet.create({
    flatList: {
        flexGrow: 0,
        flexShrink: 1,
    },

    cartItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: colors.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    checkboxWrap: {
        marginRight: 12,
    },
    imageWrap: {
        marginRight: 12,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    itemContent: {
        flex: 1,
    },
    itemName: {
        marginBottom: 4,
    },
    itemBrand: {
        color: colors.textSecondary,
        marginBottom: 4,
    },
    itemPrice: {
        color: colors.primary,
        fontSize: 14,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginLeft: 12,
    },
    quantityBtn: {
        width: 28,
        height: 28,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    quantityText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        minWidth: 24,
        textAlign: 'center',
    },

    // ── Overview (unchanged) ──
    orderOverView: {
        width: '100%',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    couponSection: {
        flexDirection: 'row',
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: colors.border,
        borderRadius: 30,
        alignItems: 'center',
        gap: 12,
    },
    couponInput: {
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
    },
    applyBtn: {
        width: 100,
        height: 48,
        borderRadius: 30,
    },
    summarySection: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: 16,
        marginTop: 12,
    },
    summaryTitle: {
        marginBottom: 16,
        fontSize: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4FB',
    },
    totalRow: {
        borderBottomWidth: 0,
        marginTop: 8,
        paddingTop: 12,
        paddingBottom: 0,
    },
    summaryLabel: {
        color: colors.text,
    },
    summaryValue: {
        color: colors.textSecondary,
    },
    totalValue: {
        color: colors.primary,
        fontSize: 16,
    },

    // ── Empty ──
    emptyIconWrap: {
        width: 120,
        height: 120,
        borderRadius: 80,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
