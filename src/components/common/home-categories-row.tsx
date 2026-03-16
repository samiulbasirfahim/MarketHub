import { MOCK_CATEGORIES } from '@/constants/mock-data';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CategoryCard from './category-card';
import { colors } from '@/constants/colors';
import { Text } from '../ui';

const H_PAD = 20;

const VISIBLE_CATEGORIES = MOCK_CATEGORIES.slice(0, 5);


export function CategoriesRow(
    { goToSubScreen }: { goToSubScreen: (screen: string, params?: object) => void }
) {
    return (
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
            <Pressable
                style={styles.showMoreTile}
                onPress={() => goToSubScreen('AllCategories')}
            >
                <View style={styles.showMoreCircle}>
                    <Text variant="label" style={styles.seeAllLabel}>
                        SEE ALL
                    </Text>
                </View>
                <Text variant="label" style={styles.showMoreLabel}>
                    See All
                </Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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

    showMoreLabel: {
        color: colors.primary,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 16,
    },

    seeAllLabel: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: 'bold',
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
});
