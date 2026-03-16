import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import { MOCK_POPULAR_PRODUCTS, MOCK_BEST_DEALS, MOCK_VENDORS } from '@/constants/mock-data';
import { SectionHeader } from '@/components/common/home-section-header';
import { ProductRow } from '@/components/common/home-product-row';
import { CategoriesRow } from '@/components/common/home-categories-row';
import { AppHeader } from '@/components/common/gradient-header';
import VendorRowCard from '@/components/common/vendor-row-card';

export default function Home() {
    const navigation = useNavigation<any>();

    const goToSubScreen = (screen: string, params?: object) =>
        navigation.navigate('OthersStack', {
            screen: 'HomeSubScreens',
            params: { screen, ...(params ? { params } : {}) },
        });

    return (
        <View style={styles.screen}>
            <AppHeader
                variant="home"
                userName={'Samiul Basir Fahim'}
                onCartPress={() => {
                    goToSubScreen('Cart');
                }}
                onSearchPress={() => {
                    navigation.navigate('SearchTab');
                }}
            />
            <ScrollView
                contentContainerStyle={styles.body}
                showsVerticalScrollIndicator={false}
            >
                <CategoriesRow goToSubScreen={goToSubScreen} />

                {/* Vendors Section */}

                <SectionHeader
                    title="Popular Items"
                    onShowAll={() => goToSubScreen('AllPopularProducts')}
                />
                <ProductRow products={MOCK_POPULAR_PRODUCTS.slice(0, 6)} />

                <SectionHeader
                    title="Best Deals"
                    onShowAll={() => goToSubScreen('BestDeals')}
                />
                <ProductRow products={MOCK_BEST_DEALS.slice(0, 6)} />


                <SectionHeader
                    title="Vendors"
                    onShowAll={() => goToSubScreen('AllVendors')}
                />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.vendorRow}
                >
                    {MOCK_VENDORS.slice(0, 3).map(vendor => (
                        <VendorRowCard
                            key={vendor.id}
                            vendor={vendor}
                            onPress={v =>
                                goToSubScreen('VendorDetails', { vendorId: v.id })
                            }
                        />
                    ))}
                </ScrollView>

                <SectionHeader title="Recommended for You" />
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
    vendorRow: {
        paddingHorizontal: 20,
        gap: 12,
        paddingBottom: 4,
    },
});
