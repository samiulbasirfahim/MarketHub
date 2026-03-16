import { MOCK_POPULAR_PRODUCTS } from '@/constants/mock-data';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import ProductCard from './product-card';

const CARD_GAP = 12;
const H_PAD = 20;
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - H_PAD * 2 - CARD_GAP) / 2;

export function ProductRow({
    products,
}: {
    products: typeof MOCK_POPULAR_PRODUCTS;
}) {
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

const styles = StyleSheet.create({
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: H_PAD,
        gap: CARD_GAP,
    },
});
