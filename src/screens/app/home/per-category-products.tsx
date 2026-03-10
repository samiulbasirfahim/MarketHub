import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeSubScreensStackParamList } from '@/navigations/types';
import ProductCard from '@/components/common/product-card';
import { colors } from '@/constants/colors';
import { MOCK_POPULAR_PRODUCTS } from '@/constants/mock-data';

type Props = NativeStackScreenProps<HomeSubScreensStackParamList, 'PerCategoryProducts'>;

const { width } = Dimensions.get('window');
const PADDING = 16;
const GAP = 12;
const CARD_WIDTH = (width - PADDING * 2 - GAP) / 2;

export default function PerCategoryProductsScreen({ navigation, route }: Props) {
    return (
        <View style={styles.screen}>
            <FlatList
                data={MOCK_POPULAR_PRODUCTS}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        style={{ width: CARD_WIDTH }}
                        onPress={p =>
                            navigation.navigate('ProductDetails', {
                                productId: p.id,
                            })
                        }
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    list: {
        padding: PADDING,
        gap: GAP,
    },
    row: {
        gap: GAP,
    },
});
