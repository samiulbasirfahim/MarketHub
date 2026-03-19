import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    View,
    useWindowDimensions,
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
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
    tabBarOuter: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.background,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F5',
        borderRadius: 14,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 10,
    },
    tabButtonActive: {
        backgroundColor: colors.primary + '1A',
    },
    tabLabel: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    tabLabelActive: {
        color: colors.primary,
    },
    list: {
        padding: 12,
        gap: 12,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        gap: 7,
    },
    deliveredText: {
        fontSize: 14,
        color: colors.text,
    },
    orderNumber: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
    },
    itemRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
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
        alignSelf: 'flex-start',
        borderRadius: 20,
        flexShrink: 0,
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

const ToReviewRoute = () => (
    <FlatList
        data={REVIEWS_TO_DO}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <View>
                    <Text variant="body" weight="semibold" style={styles.deliveredText}>
                        Delivered
                    </Text>
                    <Text variant="label" style={styles.orderNumber}>
                        Order #{item.id}
                    </Text>
                </View>

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

                        <Button
                            label="Review"
                            onPress={() => { }}
                            size="sm"
                            style={styles.reviewBtn}
                        />
                    </View>
                </View>
            </View>
        )}
    />
);

const HistoryRoute = () => (
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
                    <Text variant="label" style={styles.orderNumber}>
                        Order #{item.id}
                    </Text>
                </View>

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
                        <View key={`img-${i}`} style={styles.imagePlaceholder} />
                    ))}
                </View>
            </View>
        )}
    />
);

const renderScene = SceneMap({
    toReview: ToReviewRoute,
    history: HistoryRoute,
});

const routes = [
    { key: 'toReview', title: 'To Review' },
    { key: 'history', title: 'History' },
];

export default function MyReviewsScreen() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    return (
        <View style={styles.screen}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={() => (
                    <View style={styles.tabBarOuter}>
                        <View style={styles.tabBar}>
                            {routes.map((route, i) => (
                                <Pressable
                                    key={route.key}
                                    style={[
                                        styles.tabButton,
                                        index === i && styles.tabButtonActive,
                                    ]}
                                    onPress={() => setIndex(i)}
                                >
                                    <Text
                                        variant="label"
                                        style={[
                                            styles.tabLabel,
                                            index === i && styles.tabLabelActive,
                                        ]}
                                    >
                                        {route.title}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                )}
                swipeEnabled
                animationEnabled
            />
        </View>
    );
}
