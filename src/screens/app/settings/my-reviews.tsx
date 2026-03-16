import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import StarRating from '@/components/common/star-rating';
import { MOCK_POPULAR_PRODUCTS } from '@/constants/mock-data';

const REVIEWS_TO_DO = MOCK_POPULAR_PRODUCTS.slice(0, 2);
const REVIEWS_HISTORY = MOCK_POPULAR_PRODUCTS.slice(0, 2).map(item => ({
    ...item,
    review: 'Second or third time that I buy a Bottle product',
    rating: 4,
    timestamp: '2 month ago',
    likes: 2,
    dislikes: 0,
}));

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    tabBarOuterContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        marginHorizontal: 12,
        marginVertical: 12,
        borderRadius: 10,
    },
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderRadius: 10,
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    tabText: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    tabTextActive: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: colors.primary,
    },
    list: {
        padding: 12,
        gap: 12,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: '#F0F4FB',
        borderRadius: 10,
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
        paddingVertical: 8,
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: '#FFD700',
        flexShrink: 0,
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
    reviewBtn: {
        borderRadius: 20,
        flexShrink: 0,
    },
    reviewRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 2,
    },
    timestamp: {
        color: '#6D7C97',
        fontSize: 12,
        marginTop: 4,
    },
    reviewText: {
        color: colors.textSecondary,
        lineHeight: 20,
        fontSize: 14,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 6,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    likeText: {
        color: colors.text,
        fontSize: 12,
        fontWeight: '600',
    },
    dislikeButton: {
        padding: 4,
    },
    imagesRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    imagePlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
});

type Tab = 'ToReview' | 'History';

export default function MyReviewsScreen() {
    const [activeTab, setActiveTab] = useState<Tab>('ToReview');

    return (
        <View style={styles.screen}>
            {/* Tab Bar with Border Wrapper */}
            <View style={styles.tabBarOuterContainer}>
                <View style={styles.tabBarContainer}>
                    <Pressable
                        style={styles.tabButton}
                        onPress={() => setActiveTab('ToReview')}
                    >
                        <Text
                            variant="label"
                            weight="semibold"
                            style={
                                activeTab === 'ToReview'
                                    ? styles.tabTextActive
                                    : styles.tabText
                            }
                        >
                            To Review
                        </Text>
                        {activeTab === 'ToReview' && (
                            <View style={styles.tabIndicator} />
                        )}
                    </Pressable>
                    <Pressable
                        style={styles.tabButton}
                        onPress={() => setActiveTab('History')}
                    >
                        <Text
                            variant="label"
                            weight="semibold"
                            style={
                                activeTab === 'History'
                                    ? styles.tabTextActive
                                    : styles.tabText
                            }
                        >
                            History
                        </Text>
                        {activeTab === 'History' && (
                            <View style={styles.tabIndicator} />
                        )}
                    </Pressable>
                </View>
            </View>

            {/* Content */}
            {activeTab === 'ToReview' ? (
                <FlatList
                    data={REVIEWS_TO_DO}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.deliveredSection}>
                                <Text variant="body" weight="semibold" style={styles.deliveredText}>
                                    Delivered
                                </Text>
                            </View>

                            <Text variant="label" style={styles.orderNumber}>
                                Order #{item.id}
                            </Text>

                            <View style={styles.divider} />

                            <View style={styles.itemRow}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                                <View style={styles.itemContent}>
                                    <Text
                                        variant="body"
                                        weight="semibold"
                                        style={styles.itemName}
                                        numberOfLines={1}
                                    >
                                        {item.name}
                                    </Text>
                                    <View style={styles.itemMeta}>
                                        <Text variant="label" style={styles.metaText}>
                                            By Mr.food
                                        </Text>
                                        <Text variant="label" style={styles.metaText}>
                                            Qty: 1
                                        </Text>
                                        <Text variant="body" weight="bold" style={styles.price}>
                                            ${item.price.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.reviewRow}>
                                <Button
                                    label="Review"
                                    onPress={() => {}}
                                    size="sm"
                                    style={styles.reviewBtn}
                                />
                            </View>
                        </View>
                    )}
                />
            ) : (
                <FlatList
                    data={REVIEWS_HISTORY}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }: any) => (
                        <View style={styles.card}>
                            <View style={styles.deliveredSection}>
                                <Text variant="body" weight="semibold" style={styles.deliveredText}>
                                    Delivered
                                </Text>
                            </View>

                            <Text variant="label" style={styles.orderNumber}>
                                Order #{item.id}
                            </Text>

                            <View style={styles.divider} />

                            <View style={styles.itemRow}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                                <View style={styles.itemContent}>
                                    <Text
                                        variant="body"
                                        weight="semibold"
                                        style={styles.itemName}
                                        numberOfLines={1}
                                    >
                                        {item.name}
                                    </Text>
                                    <View style={styles.itemMeta}>
                                        <Text variant="label" style={styles.metaText}>
                                            By Mr.food
                                        </Text>
                                        <Text variant="label" style={styles.metaText}>
                                            Qty: 1
                                        </Text>
                                        <Text variant="body" weight="bold" style={styles.price}>
                                            ${item.price.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Text variant="label" style={styles.timestamp}>
                                {item.timestamp}
                            </Text>

                            <StarRating rating={item.rating} size={16} />

                            <Text variant="body" style={styles.reviewText}>
                                {item.review}
                            </Text>

                            <View style={styles.actionRow}>
                                <Pressable style={styles.likeButton}>
                                    <ThumbsUp size={16} color={colors.primary} fill={colors.primary} />
                                    <Text variant="caption" style={styles.likeText}>
                                        {item.likes}
                                    </Text>
                                </Pressable>
                                <Pressable style={styles.dislikeButton}>
                                    <ThumbsDown size={16} color={colors.textSecondary} />
                                </Pressable>
                            </View>

                            <View style={styles.imagesRow}>
                                {new Array(3).fill(0).map((_, i) => (
                                    <View
                                        key={`img-${i}`}
                                        style={styles.imagePlaceholder}
                                    />
                                ))}
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}
