import React from 'react';
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { HomeHeader } from '@/components/common/home-header';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import CategoryCard from '@/components/common/category-card';
import ProductCard from '@/components/common/product-card';
import {
    MOCK_CATEGORIES,
    MOCK_POPULAR_PRODUCTS,
    MOCK_BEST_DEALS,
} from '@/constants/mock-data';
import { ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const H_PAD = 20;
const CARD_WIDTH = (width - H_PAD * 2 - CARD_GAP) / 2;

// Show first 5 categories + a "Show more" tile
const VISIBLE_CATEGORIES = MOCK_CATEGORIES.slice(0, 5);

function SectionHeader({
    title,
    onShowAll,
}: {
    title: string;
    onShowAll: () => void;
}) {
    return (
        <View style={styles.sectionHeader}>
            <Text variant="body" weight="bold" style={styles.sectionTitle}>
                {title}
            </Text>
            <Pressable onPress={onShowAll} style={styles.seeAll} hitSlop={8}>
                <Text variant="caption" style={styles.seeAllText}>
                    See all
                </Text>
                <ChevronRight size={14} color={colors.primary} />
            </Pressable>
        </View>
    );
}

function ProductRow({ products }: { products: typeof MOCK_POPULAR_PRODUCTS; }) {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.productGrid}>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    style={{ width: CARD_WIDTH }}
                    onPress={p =>
                        navigation.navigate('OthersStack', {
                            screen: 'HomeSubScreens',
                            params: {
                                screen: 'ProductDetails',
                                params: { productId: p.id },
                            },
                        })
                    }
                />
            ))}
        </View>
    );
}

export default function Home() {
    const navigation = useNavigation<any>();

    const goToSubScreen = (screen: string, params?: object) =>
        navigation.navigate('OthersStack', {
            screen: 'HomeSubScreens',
            params: { screen, ...(params ? { params } : {}) },
        });

    return (
        <View style={styles.screen}>
            <HomeHeader
                userName="MD, Moinuddin"
                onSearchPress={() => navigation.navigate('SearchTab')}
                onCartPress={() => goToSubScreen('Cart')}
            />

            <ScrollView
                contentContainerStyle={styles.body}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Categories ── */}
                <SectionHeader
                    title="Categories"
                    onShowAll={() => goToSubScreen('AllCategories')}
                />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryRow}
                >
                    {VISIBLE_CATEGORIES.map(cat => (
                        <CategoryCard
                            key={cat.id}
                            category={cat}
                            size="sm"
                            onPress={c =>
                                goToSubScreen('PerCategoryProducts', {
                                    categoryId: c.id,
                                    categoryName: c.name,
                                })
                            }
                        />
                    ))}
                    {/* Show more tile */}
                    <Pressable
                        style={styles.showMoreTile}
                        onPress={() => goToSubScreen('AllCategories')}
                    >
                        <View style={styles.showMoreCircle}>
                            <ChevronRight size={22} color={colors.primary} />
                        </View>
                        <Text
                            variant="caption"
                            weight="medium"
                            style={styles.showMoreLabel}
                        >
                            Show{'\n'}more
                        </Text>
                    </Pressable>
                </ScrollView>

                {/* ── Top Items ── */}
                <SectionHeader
                    title="Top Items"
                    onShowAll={() => goToSubScreen('AllPopularProducts')}
                />
                <ProductRow products={MOCK_POPULAR_PRODUCTS.slice(0, 6)} />

                {/* ── Best Deals ── */}
                <SectionHeader
                    title="Best Deals"
                    onShowAll={() => goToSubScreen('BestDeals')}
                />
                <ProductRow products={MOCK_BEST_DEALS.slice(0, 6)} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    body: {
        paddingTop: 20,
        paddingBottom: 32,
        gap: 12,
    },

    /* Section header */
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: H_PAD,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 16,
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    seeAllText: {
        color: colors.primary,
        fontSize: 13,
    },

    /* Category strip */
    categoryRow: {
        paddingHorizontal: H_PAD,
        gap: 16,
        paddingBottom: 4,
    },
    showMoreTile: {
        alignItems: 'center',
        gap: 8,
        width: 64,
    },
    showMoreCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.infoLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    showMoreLabel: {
        color: colors.textSecondary,
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 16,
    },

    /* Product grids */
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: H_PAD,
        gap: CARD_GAP,
    },
});

