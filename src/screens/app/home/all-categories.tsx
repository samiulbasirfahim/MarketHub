import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeSubScreensStackParamList } from '@/navigations/types';
import CategoryCard from '@/components/common/category-card';
import { colors } from '@/constants/colors';
import { MOCK_CATEGORIES } from '@/constants/mock-data';

type Props = NativeStackScreenProps<HomeSubScreensStackParamList, 'AllCategories'>;

const { width } = Dimensions.get('window');
const PADDING = 20;
const GAP = 12;
const COLS = 3;
const ITEM_WIDTH = (width - PADDING * 2 - GAP * (COLS - 1)) / COLS;

export default function AllCategoriesScreen({ navigation }: Props) {
    return (
        <View style={styles.screen}>
            <FlatList
                data={MOCK_CATEGORIES}
                keyExtractor={item => item.id}
                numColumns={3}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ width: ITEM_WIDTH, alignItems: 'center' }}>
                        <CategoryCard
                            category={item}
                            size="md"
                            onPress={cat =>
                                navigation.navigate('PerCategoryProducts', {
                                    categoryId: cat.id,
                                    categoryName: cat.name,
                                })
                            }
                        />
                    </View>
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
        gap: 20,
    },
    row: {
        gap: GAP,
    },
});
