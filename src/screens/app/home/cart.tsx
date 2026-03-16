import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    FlatList,
} from 'react-native';
import { Trash2 } from 'lucide-react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { colors } from '@/constants/colors';

interface CartItem {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
}

const MOCK_CART_ITEMS: CartItem[] = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        brand: 'Mr.food',
        price: 4.0,
        originalPrice: 5.0,
        image: '#FFD700',
        quantity: 1,
    },
    {
        id: '2',
        name: 'Designer Leather Handbag',
        brand: 'Fashion Forward',
        price: 4.0,
        originalPrice: 6.0,
        image: '#FFD700',
        quantity: 1,
    },
];

export default function CartScreen() {
    const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);
    const [coupon, setCoupon] = useState('');

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 2.0;
    const tax = 0.05;
    const shippingFee = 0.0;
    const total = subTotal - discount + tax + shippingFee;

    const isEmpty = cartItems.length === 0;

    if (isEmpty) {
        return (
            <View style={styles.screen}>
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconWrap}>
                        <Text style={styles.emptyIcon}>🛒</Text>
                    </View>
                    <Text variant="body" weight="bold" style={styles.emptyTitle}>
                        Your cart is empty
                    </Text>
                    <Text variant="label" style={styles.emptySubtitle}>
                        Add items from restaurants to get started
                    </Text>
                    <Button
                        label="Continue Shopping"
                        style={styles.emptyButton}
                        onPress={() => {}}
                    />
                </View>
            </View>
        );
    }

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <View style={styles.itemsSection}>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.cartItemRow}>
                            <Pressable
                                style={styles.checkboxWrap}
                                onPress={() => removeItem(item.id)}
                            >
                                <View style={styles.checkbox} />
                            </Pressable>

                            <View style={styles.imageWrap}>
                                <View
                                    style={[
                                        styles.productImage,
                                        { backgroundColor: item.image },
                                    ]}
                                />
                            </View>

                            <View style={styles.itemContent}>
                                <Text variant="body" weight="semibold" style={styles.itemName}>
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
                                    onPress={() =>
                                        updateQuantity(item.id, item.quantity - 1)
                                    }
                                >
                                    <Text style={styles.quantityBtnText}>−</Text>
                                </Pressable>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <Pressable
                                    style={styles.quantityBtn}
                                    onPress={() =>
                                        updateQuantity(item.id, item.quantity + 1)
                                    }
                                >
                                    <Text style={styles.quantityBtnText}>+</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </View>

            <View style={styles.couponSection}>
                <Input
                    placeholder="Enter Your Coupon"
                    value={coupon}
                    onChangeText={setCoupon}
                    style={styles.couponInput}
                />
                <Button label="Apply" onPress={() => {}} style={styles.applyBtn} />
            </View>

            <View style={styles.summarySection}>
                <Text variant="body" weight="bold" style={styles.summaryTitle}>
                    Order Summary
                </Text>

                <View style={styles.summaryRow}>
                    <Text variant="label" style={styles.summaryLabel}>
                        Shipping fee
                    </Text>
                    <Text variant="label" weight="semibold" style={styles.summaryValue}>
                        ${shippingFee.toFixed(2)}
                    </Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text variant="label" style={styles.summaryLabel}>
                        Sub total
                    </Text>
                    <Text variant="label" weight="semibold" style={styles.summaryValue}>
                        ${subTotal.toFixed(2)}
                    </Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text variant="label" style={styles.summaryLabel}>
                        Discount
                    </Text>
                    <Text variant="label" weight="semibold" style={styles.summaryValue}>
                        ${discount.toFixed(2)}
                    </Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text variant="label" style={styles.summaryLabel}>
                        Tax
                    </Text>
                    <Text variant="label" weight="semibold" style={styles.summaryValue}>
                        ${tax.toFixed(2)}
                    </Text>
                </View>

                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text variant="body" weight="bold" style={styles.summaryLabel}>
                        Total
                    </Text>
                    <Text variant="body" weight="bold" style={styles.totalValue}>
                        ${total.toFixed(2)}
                    </Text>
                </View>
            </View>

            <Button
                label="Proceed to Checkout"
                style={styles.checkoutBtn}
                onPress={() => {}}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIconWrap: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F0F4FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyIcon: {
        fontSize: 40,
    },
    emptyTitle: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        marginBottom: 24,
        textAlign: 'center',
        color: colors.textSecondary,
    },
    emptyButton: {
        width: '100%',
        marginTop: 16,
    },
    itemsSection: {
        marginBottom: 20,
    },
    cartItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: colors.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    checkboxWrap: {
        marginRight: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: colors.primary,
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
    couponSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    couponInput: {
        flex: 1,
        height: 48,
    },
    applyBtn: {
        width: 100,
        height: 48,
    },
    summarySection: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
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
    checkoutBtn: {
        height: 52,
        marginBottom: 20,
    },
});
