import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { ORDER_ITEMS, OrderStatus } from './data';

type Props = {
    status: OrderStatus;
};

export default function OrderList({ status }: Props) {
    const data =
        status === 'All'
            ? ORDER_ITEMS
            : ORDER_ITEMS.filter(item => item.status === status);

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                    <View style={styles.card}>
                        {/* Delivered / Status Section */}
                        <View style={styles.deliveredSection}>
                            <Text variant="body" weight="semibold" style={styles.deliveredText}>
                                Delivered
                            </Text>
                        </View>

                        {/* Order ID */}
                        <Text variant="label" style={styles.orderNumber}>
                            Order #{item.id}
                        </Text>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* Item: Image + Name + By/Qty + Price */}
                        <View style={styles.itemRow}>
                            <Image
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80',
                                }}
                                style={styles.itemImage}
                            />
                            <View style={styles.itemContent}>
                                <Text
                                    variant="body"
                                    weight="semibold"
                                    style={styles.itemName}
                                    numberOfLines={1}
                                >
                                    Premium Wireless Headphones
                                </Text>
                                <View style={styles.itemMeta}>
                                    <Text variant="label" style={styles.metaText}>
                                        By Mr.food
                                    </Text>
                                    <Text variant="label" style={styles.metaText}>
                                        Qty: 1
                                    </Text>
                                    <Text variant="body" weight="bold" style={styles.price}>
                                        ${item.total.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.statusRow}>
                            {status === 'Delivered' && (
                                <View style={styles.deliveryBadge}>
                                    <Text variant="label" style={styles.deliveryBadgeText}>
                                        ✓ Delivered
                                    </Text>
                                </View>
                            )}
                            {status === 'Return' && (
                                <Button
                                    label="Approve"
                                    onPress={() => {}}
                                    size="sm"
                                    style={styles.actionBtn}
                                />
                            )}
                            {status === 'Cancelled' && (
                                <View style={styles.cancelledBadge}>
                                    <Text variant="label" style={styles.cancelledBadgeText}>
                                        Cancelled
                                    </Text>
                                </View>
                            )}
                            {status === 'All' && (
                                <Button
                                    label="Review"
                                    onPress={() => {}}
                                    size="sm"
                                    style={styles.reviewBtn}
                                />
                            )}
                        </View>

                        {/* Cancelled Reason Section */}
                        {status === 'Cancelled' && (
                            <>
                                <View style={styles.reasonDivider} />
                                <Text variant="label" style={styles.reasonText}>
                                    Reason: Delivery address wrong
                                </Text>
                            </>
                        )}

                        {/* All Tab Footer */}
                        {status === 'All' && (
                            <View style={styles.footerRow}>
                                <View>
                                    <Text variant="caption" style={styles.footerLabel}>
                                        Order ID
                                    </Text>
                                    <Text variant="body" weight="semibold" style={styles.footerValue}>
                                        {item.id}
                                    </Text>
                                </View>
                                <View style={styles.footerCol}>
                                    <Text variant="caption" style={styles.footerLabel}>
                                        Total
                                    </Text>
                                    <Text variant="body" weight="bold" style={styles.totalValue}>
                                        ${item.total.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                );
            }}
            ListEmptyComponent={
                <View style={styles.emptyWrap}>
                    <Text variant="body" style={styles.muted}>
                        No orders found
                    </Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 14,
        gap: 12,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: '#F0F4FB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DCE3F2',
        padding: 12,
        gap: 8,
    },
    deliveredSection: {
        paddingBottom: 4,
    },
    deliveredText: {
        fontSize: 14,
        color: colors.text,
    },
    orderNumber: {
        color: '#6D7C97',
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#DCE3F2',
        marginVertical: 6,
    },
    itemRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingBottom: 6,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 6,
        backgroundColor: '#FFD700',
    },
    itemContent: {
        flex: 1,
        gap: 4,
    },
    itemName: {
        fontSize: 14,
        color: colors.text,
    },
    itemMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
    },
    metaText: {
        color: '#6D7C97',
        fontSize: 12,
    },
    price: {
        color: colors.primary,
        fontSize: 14,
    },
    actionBtn: {
        borderRadius: 20,
        flexShrink: 0,
    },
    reviewBtn: {
        borderRadius: 20,
        flexShrink: 0,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 2,
    },
    deliveryBadge: {
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: colors.successLight,
        borderRadius: 20,
        flexShrink: 0,
    },
    deliveryBadgeText: {
        color: colors.success,
        fontWeight: '600',
        fontSize: 12,
    },
    cancelledBadge: {
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#3F4A59',
        borderRadius: 20,
        flexShrink: 0,
    },
    cancelledBadgeText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 12,
    },
    reasonDivider: {
        height: 1,
        backgroundColor: '#DCE3F2',
        marginVertical: 6,
    },
    reasonText: {
        color: '#6D7C97',
        fontSize: 12,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 4,
    },
    footerLabel: {
        color: '#6D7C97',
        fontSize: 12,
    },
    footerValue: {
        color: colors.text,
        fontSize: 14,
    },
    footerCol: {
        alignItems: 'flex-end',
    },
    totalValue: {
        color: colors.primary,
        fontSize: 14,
    },
    muted: {
        color: '#6D7C97',
    },
    emptyWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
});
