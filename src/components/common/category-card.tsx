import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';

export type Category = {
    id: string;
    name: string;
    image: string;
};

type Props = {
    category: Category;
    onPress: (category: Category) => void;
    size?: 'sm' | 'md';
};

export default function CategoryCard({
    category,
    onPress,
    size = 'md',
}: Props) {
    const dim = size === 'sm' ? 64 : 80;

    return (
        <Pressable style={styles.wrapper} onPress={() => onPress(category)}>
            <View style={[styles.circle, { width: dim, height: dim, borderRadius: dim / 2 }]}>
                <Image
                    source={{ uri: category.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <Text
                variant="caption"
                weight="medium"
                style={styles.label}
                numberOfLines={2}
            >
                {category.name}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        gap: 8,
        width: 80,
    },
    circle: {
        overflow: 'hidden',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    label: {
        color: colors.text,
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 16,
    },
});
