import { StyleSheet, View } from 'react-native';
import { Pressable, Text } from '../ui';
import { colors } from '@/constants/colors';
import { ChevronRight } from 'lucide-react-native';

const H_PAD = 20;

export function SectionHeader({
    title,
    onShowAll,
}: {
    title: string;
    onShowAll?: () => void;
}) {
    return (
        <View style={styles.sectionHeader}>
            <Text variant="body" weight="bold" style={styles.sectionTitle}>
                {title}
            </Text>
            {onShowAll && (
                <Pressable onPress={onShowAll} style={styles.seeAll} hitSlop={8}>
                    <Text variant="caption" style={styles.seeAllText}>
                        See all
                    </Text>
                    <ChevronRight size={14} color={colors.primary} />
                </Pressable>
            )}
        </View>
    );
}

export const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: 22,
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
});
