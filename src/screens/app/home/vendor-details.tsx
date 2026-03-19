import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabView } from 'react-native-tab-view';
import {
    MessageSquare,
    Laptop,
    Phone,
    Headphones,
    Cable,
    HardDrive,
    ChevronDown,
    ChevronRight,
} from 'lucide-react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import Text from '@/components/ui/Text';
import StarRating from '@/components/common/star-rating';
import { colors } from '@/constants/colors';
import { MOCK_VENDORS, MOCK_POPULAR_PRODUCTS } from '@/constants/mock-data';
import ProductCard from '@/components/common/product-card';
import { HomeSubScreensStackParamList } from '@/navigations/types';

// ─── Types ────────────────────────────────────────────────────

type Props = NativeStackScreenProps<
    HomeSubScreensStackParamList,
    'VendorDetails'
>;

type CategoryOption = {
    label: string;
    value: string;
    icon: React.ComponentType<{ size: number; color: string }>;
};

// ─── Static data ──────────────────────────────────────────────

const TAB_ROUTES = [
    { key: 'all', title: 'All Product' },
    { key: 'profile', title: 'Profile' },
];

const CATEGORY_OPTIONS: CategoryOption[] = [
    { label: 'Phone', value: 'phone', icon: Phone },
    { label: 'Laptop', value: 'laptop', icon: Laptop },
    { label: 'Airpods', value: 'airpods', icon: Headphones },
    { label: 'Cable', value: 'cable', icon: Cable },
    { label: 'Hard disk', value: 'harddisk', icon: HardDrive },
];

// ─── Scenes ───────────────────────────────────────────────────

type AllProductProps = {
    products: typeof MOCK_POPULAR_PRODUCTS;
    onProductPress: (id: string) => void;
};

function AllProductRoute({ products, onProductPress }: AllProductProps) {
    return (
        <ScrollView
            style={styles.tabContent}
            contentContainerStyle={styles.tabContentInner}
        >
            <Text variant="body" weight="semibold" style={styles.sectionTitle}>
                Fashion & Accessories
            </Text>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        style={styles.productCard}
                        onPress={p => onProductPress(p.id)}
                    />
                )}
            />
        </ScrollView>
    );
}

type ProfileRouteProps = {
    vendor: (typeof MOCK_VENDORS)[0];
};

function ProfileRoute({ vendor }: ProfileRouteProps) {
    return (
        <ScrollView
            style={styles.tabContent}
            contentContainerStyle={styles.tabContentInner}
        >
            <View style={styles.profileCard}>
                <Text variant="body" weight="semibold">
                    Vendor Profile
                </Text>
                <View style={styles.detailsContainer}>
                    <Text variant="secondary">{vendor.name}</Text>
                    <Text variant="body">Email: {vendor.email}</Text>
                    <Text variant="body">
                        Gender: {vendor.gender === 0 ? 'Male' : 'Female'}
                    </Text>
                    <Text variant="body">Phone: {vendor.phone}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

// ─── Main screen ──────────────────────────────────────────────

export default function VendorDetailsScreen({ route, navigation }: Props) {
    const [index, setIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const layout = useWindowDimensions();

    const dropAnim = useSharedValue(0);
    const rotateAnim = useSharedValue(0);

    const vendor =
        MOCK_VENDORS.find(item => item.id === route.params.vendorId) ??
        MOCK_VENDORS[0];

    const products = useMemo(() => MOCK_POPULAR_PRODUCTS.slice(0, 6), []);

    const handleProductPress = useMemo(
        () => (id: string) =>
            navigation.navigate('ProductDetails', { productId: id }),
        [navigation],
    );

    // ─── Category handlers ──────────────────────────────────

    const toggleCategory = () => {
        const next = !categoryOpen;
        setCategoryOpen(next);
        dropAnim.value = withTiming(next ? 1 : 0, { duration: 180 });
        rotateAnim.value = withTiming(next ? 1 : 0, { duration: 200 });
    };

    const handleSelectCategory = (value: string) => {
        setSelectedCategory(value);
        setCategoryOpen(false);
        dropAnim.value = withTiming(0, { duration: 180 });
        rotateAnim.value = withTiming(0, { duration: 200 });
    };

    const clearCategory = () => {
        setSelectedCategory(null);
        setCategoryOpen(false);
        dropAnim.value = withTiming(0);
        rotateAnim.value = withTiming(0);
    };

    // ─── Animated styles ────────────────────────────────────

    const arrowStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotateAnim.value * 180}deg` }],
    }));

    const dropdownStyle = useAnimatedStyle(() => ({
        opacity: dropAnim.value,
        transform: [
            { translateY: withTiming(dropAnim.value ? 0 : -8) },
            { scale: 0.97 + dropAnim.value * 0.03 },
        ],
    }));

    const isCategoryActive = !!selectedCategory;
    const selectedCategoryLabel = CATEGORY_OPTIONS.find(
        c => c.value === selectedCategory,
    )?.label;

    // ─── Render scene ───────────────────────────────────────

    const renderScene = useMemo(
        () =>
            ({ route: sceneRoute }: { route: { key: string } }) => {
                switch (sceneRoute.key) {
                    case 'all':
                        return (
                            <AllProductRoute
                                products={products}
                                onProductPress={handleProductPress}
                            />
                        );
                    case 'profile':
                        return <ProfileRoute vendor={vendor} />;
                    default:
                        return null;
                }
            },
        [products, vendor, handleProductPress],
    );

    return (
        <View style={styles.screen}>
            <View style={styles.headerSection}>
                <View style={styles.vendorCardWrap}>
                    <View style={styles.vendorCard}>
                        <View style={styles.vendorLeft}>
                            <Text variant="label" style={styles.subtle}>
                                Since {vendor.since}
                            </Text>
                            <Text variant="body" weight="bold" style={styles.vendorName}>
                                {vendor.name}
                            </Text>
                            <Text variant="body" style={styles.vendorCount}>
                                ({vendor.productCount} products)
                            </Text>
                            <View style={styles.starsRow}>
                                <StarRating rating={5} size={14} />
                                <Text variant="caption" style={styles.subtle}>
                                    ({vendor.reviewCount})
                                </Text>
                            </View>
                        </View>
                        <Image source={{ uri: vendor.image }} style={styles.vendorAvatar} />
                        <View style={styles.bellBtn}>
                            <MessageSquare size={18} color={colors.white} strokeWidth={3} />
                        </View>
                    </View>
                </View>
            </View>

            <TabView
                navigationState={{ index, routes: TAB_ROUTES }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                swipeEnabled
                animationEnabled
                renderTabBar={() => (
                    <>
                        <View style={styles.tabBarWrap}>
                            <View style={styles.tabBar}>
                                <Pressable
                                    style={[styles.tabItem, index === 0 && styles.tabItemActive]}
                                    onPress={() => setIndex(0)}
                                >
                                    <Text
                                        variant="label"
                                        weight="semibold"
                                        style={[
                                            styles.tabLabel,
                                            index === 0 && styles.tabLabelActive,
                                        ]}
                                    >
                                        {selectedCategoryLabel
                                            ? `${selectedCategoryLabel}`
                                            : TAB_ROUTES[0].title}
                                    </Text>
                                </Pressable>

                                {/* Category */}
                                <Pressable
                                    style={[
                                        styles.tabItem,
                                        // isCategoryActive && styles.tabItemActive,
                                    ]}
                                    onPress={toggleCategory}
                                >
                                    <View style={styles.categoryTabInner}>
                                        <Text
                                            variant="label"
                                            weight="semibold"
                                            style={[
                                                styles.tabLabel,
                                                // isCategoryActive && styles.tabLabelActive,
                                            ]}
                                            numberOfLines={1}
                                        >
                                            {'Category'}
                                        </Text>
                                        <Animated.View style={arrowStyle}>
                                            <ChevronDown
                                                size={12}
                                                color={
                                                    isCategoryActive
                                                        ? colors.primary
                                                        : colors.textSecondary
                                                }
                                            />
                                        </Animated.View>
                                    </View>
                                </Pressable>

                                {/* Profile */}
                                <Pressable
                                    style={[styles.tabItem, index === 1 && styles.tabItemActive]}
                                    onPress={() => setIndex(1)}
                                >
                                    <Text
                                        variant="label"
                                        weight="semibold"
                                        style={[
                                            styles.tabLabel,
                                            index === 1 && styles.tabLabelActive,
                                        ]}
                                    >
                                        {TAB_ROUTES[1].title}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* ── Category dropdown — full width below tab bar ─ */}
                        <Animated.View
                            pointerEvents={categoryOpen ? 'auto' : 'none'}
                            style={[styles.categoryDropdown, dropdownStyle]}
                        >
                            {categoryOpen && (
                                <Pressable
                                    style={StyleSheet.absoluteFill}
                                    onPress={toggleCategory}
                                />
                            )}

                            <View style={styles.categoryDropdownInner}>
                                {isCategoryActive && (
                                    <Pressable
                                        style={[styles.categoryOption, styles.clearOption]}
                                        onPress={clearCategory}
                                    >
                                        <Text variant="body" style={styles.clearText}>
                                            Clear filter
                                        </Text>
                                    </Pressable>
                                )}

                                {CATEGORY_OPTIONS.map(item => {
                                    const isActive = item.value === selectedCategory;
                                    const Icon = item.icon;
                                    return (
                                        <Pressable
                                            key={item.value}
                                            onPress={() => handleSelectCategory(item.value)}
                                            style={[
                                                styles.categoryOption,
                                                isActive && styles.categoryOptionActive,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.iconWrap,
                                                    isActive && styles.iconWrapActive,
                                                ]}
                                            >
                                                <Icon
                                                    size={16}
                                                    color={
                                                        isActive ? colors.primary : colors.textSecondary
                                                    }
                                                />
                                            </View>
                                            <Text
                                                variant="body"
                                                style={[
                                                    styles.categoryOptionText,
                                                    isActive && styles.categoryOptionTextActive,
                                                ]}
                                            >
                                                {item.label}
                                            </Text>
                                            <ChevronRight
                                                size={16}
                                                color={isActive ? colors.primary : colors.textTertiary}
                                            />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </Animated.View>
                    </>
                )}
            />
        </View>
    );
}

// ─── Styles ───────────────────────────────────────────────────

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },

    // ── Header ─────────────────────────────────────────────────
    headerSection: {
        padding: 16,
        paddingBottom: 0,
    },
    vendorCardWrap: {
        borderRadius: 12,
        backgroundColor: '#3E2474',
        padding: 8,
    },
    vendorCard: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCE3F2',
        backgroundColor: colors.background,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    vendorLeft: { width: '50%' },
    subtle: { color: colors.textSecondary },
    vendorName: { color: colors.text, fontSize: 20 },
    vendorCount: { color: colors.textSecondary, fontSize: 14, marginTop: 2 },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginTop: 4,
    },
    vendorAvatar: { width: 92, height: 92, borderRadius: 46 },
    bellBtn: {
        borderRadius: 999,
        padding: 12,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ── Tab bar ────────────────────────────────────────────────
    tabBarWrap: {
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        gap: 12,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent', // ← always present, invisible when inactive
    },
    tabItemActive: {
        borderBottomColor: colors.primary, // ← full width of tab item ✅
    },
    tabLabel: {
        color: colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
    },
    tabLabelActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    categoryTabInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },

    // ── Category dropdown ──────────────────────────────────────
    categoryDropdown: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 999,
        elevation: 8,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    categoryDropdownInner: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    categoryOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        gap: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    categoryOptionActive: {
        backgroundColor: `${colors.primary}0D`,
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapActive: {
        backgroundColor: `${colors.primary}18`,
    },
    categoryOptionText: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: 15,
    },
    categoryOptionTextActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    clearOption: {
        backgroundColor: colors.errorLight,
    },
    clearText: {
        flex: 1,
        color: colors.error,
    },

    // ── Tab content ────────────────────────────────────────────
    tabContent: { flex: 1, backgroundColor: colors.background },
    tabContentInner: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 30,
        gap: 14,
    },
    sectionTitle: { color: '#3E4A5F', marginTop: 4 },
    grid: { gap: 10 },
    gridRow: { justifyContent: 'space-between' },
    productCard: { width: '48.5%' },
    profileCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        padding: 14,
        gap: 8,
    },
    detailsContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        gap: 6,
    },
});
