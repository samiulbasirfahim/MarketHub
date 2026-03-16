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
import { TabView, SceneMap } from 'react-native-tab-view';
import {
    Bell,
    ChevronDown,
    Laptop,
    Phone,
    Headphones,
    HardDrive,
    Cable,
} from 'lucide-react-native';
import Text from '@/components/ui/Text';
import StarRating from '@/components/common/star-rating';
import { colors } from '@/constants/colors';
import {
    MOCK_VENDOR_CATEGORIES,
    MOCK_VENDORS,
    MOCK_POPULAR_PRODUCTS,
} from '@/constants/mock-data';
import ProductCard from '@/components/common/product-card';
import { HomeSubScreensStackParamList } from '@/navigations/types';

type Props = NativeStackScreenProps<HomeSubScreensStackParamList, 'VendorDetails'>;

const categoryIcon = [Phone, Laptop, Headphones, Cable, Headphones, HardDrive, Bell];

export default function VendorDetailsScreen({ route, navigation }: Props) {
    const [selectedCategory, setSelectedCategory] = useState(MOCK_VENDOR_CATEGORIES[0]);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [index, setIndex] = useState(0);
    const layout = useWindowDimensions();

    const vendor =
        MOCK_VENDORS.find(item => item.id === route.params.vendorId) ?? MOCK_VENDORS[0];

    const products = useMemo(() => MOCK_POPULAR_PRODUCTS.slice(0, 6), []);

    const AllProductRoute = () => (
        <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentInner}>
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
                        onPress={p =>
                            navigation.navigate('ProductDetails', {
                                productId: p.id,
                            })
                        }
                    />
                )}
            />
        </ScrollView>
    );

    const CategoriesRoute = () => (
        <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentInner}>
            <View style={styles.categoryPanel}>
                {MOCK_VENDOR_CATEGORIES.map((item, idx) => {
                    const Icon = categoryIcon[idx % categoryIcon.length];
                    return (
                        <Pressable key={item.id} style={styles.categoryRow}>
                            <View style={styles.categoryLeft}>
                                <View style={styles.categoryIconWrap}>
                                    <Icon size={14} color={colors.primary} />
                                </View>
                                <Text variant="body" style={styles.categoryText}>
                                    {item.label}
                                </Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </ScrollView>
    );

    const ProfileRoute = () => (
        <ScrollView style={styles.tabContent} contentContainerStyle={styles.tabContentInner}>
            <View style={styles.profileCard}>
                <Text variant="body" weight="semibold">
                    Vendor Profile
                </Text>
                <Text variant="label" style={styles.subtle}>
                    {vendor.name} has been serving customers since {vendor.since}. Excellent
                    delivery quality and highly-rated support.
                </Text>
            </View>
        </ScrollView>
    );

    const renderScene = SceneMap({
        all: AllProductRoute,
        categories: CategoriesRoute,
        profile: ProfileRoute,
    });

    const routes = [
        { key: 'all', title: 'All Product' },
        { key: 'categories', title: 'Categories' },
        { key: 'profile', title: 'Profile' },
    ];

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.headerSection}>
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

                        <View style={styles.chatBtn}>
                            <Bell size={16} color={colors.white} />
                        </View>
                    </View>
                </View>

                <View style={styles.categoryDropdownWrap}>
                    <Pressable
                        style={styles.categoryDropdownBtn}
                        onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    >
                        <Text variant="body" weight="semibold" style={styles.categoryDropdownLabel}>
                            {selectedCategory.label}
                        </Text>
                        <ChevronDown
                            size={20}
                            color={colors.primary}
                            style={showCategoryDropdown && styles.dropdownIconRotated}
                        />
                    </Pressable>

                    {showCategoryDropdown && (
                        <View style={styles.categoryDropdownMenu}>
                            {MOCK_VENDOR_CATEGORIES.map((item, idx) => (
                                <Pressable
                                    key={item.id}
                                    style={[
                                        styles.categoryDropdownItem,
                                        selectedCategory.id === item.id && styles.categoryDropdownItemActive,
                                    ]}
                                    onPress={() => {
                                        setSelectedCategory(item);
                                        setShowCategoryDropdown(false);
                                    }}
                                >
                                    <Text
                                        variant="body"
                                        style={[
                                            styles.categoryDropdownItemText,
                                            selectedCategory.id === item.id && styles.categoryDropdownItemTextActive,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => (
                    <View style={styles.tabBarWrap}>
                        <View style={styles.tabBar}>
                            {routes.map((route, i) => (
                                <React.Fragment key={route.key}>
                                    <Pressable
                                        style={styles.tabLabelWrap}
                                        onPress={() => setIndex(i)}
                                    >
                                        <Text
                                            variant="label"
                                            weight="semibold"
                                            style={[
                                                styles.tabLabel,
                                                index === i && styles.tabLabelActive,
                                            ]}
                                        >
                                            {route.title}
                                        </Text>
                                    </Pressable>
                                    {index === i && (
                                        <View style={styles.tabIndicator} />
                                    )}
                                </React.Fragment>
                            ))}
                        </View>
                    </View>
                )}
                swipeEnabled={true}
                animationEnabled={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerSection: {
        padding: 16,
        paddingBottom: 0,
        gap: 14,
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
    vendorLeft: {
        flex: 1,
    },
    subtle: {
        color: '#7384A3',
    },
    vendorName: {
        color: '#1A243A',
        fontSize: 20,
    },
    vendorCount: {
        color: '#495A78',
        fontSize: 14,
        marginTop: 2,
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginTop: 4,
    },
    vendorAvatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
    },
    chatBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryDropdownWrap: {
        position: 'relative',
    },
    categoryDropdownBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: colors.background,
    },
    categoryDropdownLabel: {
        fontSize: 14,
        color: colors.text,
    },
    dropdownIconRotated: {
        transform: [{ rotate: '180deg' }],
    },
    categoryDropdownMenu: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        marginTop: 4,
        zIndex: 100,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    categoryDropdownItem: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4FB',
    },
    categoryDropdownItemActive: {
        backgroundColor: '#F0F4FB',
    },
    categoryDropdownItemText: {
        fontSize: 14,
        color: colors.text,
    },
    categoryDropdownItemTextActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    tabBarWrap: {
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    tabLabelWrap: {
        flex: 1,
    },
    tabLabel: {
        paddingVertical: 8,
        color: colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
    },
    tabLabelActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: '16.67%',
        width: '33.33%',
        height: 3,
        backgroundColor: colors.primary,
    },
    tabContent: {
        flex: 1,
        backgroundColor: colors.background,
    },
    tabContentInner: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 30,
        gap: 14,
    },
    sectionTitle: {
        color: '#3E4A5F',
        marginTop: 4,
    },
    grid: {
        gap: 10,
    },
    gridRow: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48.5%',
    },
    categoryPanel: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        padding: 10,
        gap: 6,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
    },
    categoryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    categoryIconWrap: {
        width: 22,
        height: 22,
        borderRadius: 6,
        backgroundColor: colors.infoLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        color: '#1A243A',
    },
    profileCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        padding: 14,
        gap: 8,
    },
});
