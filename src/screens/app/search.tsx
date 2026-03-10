import React, { useRef, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Clock, SlidersHorizontal, TrendingUp, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Search } from 'lucide-react-native';
import Text from '@/components/ui/Text';
import { router } from '@/navigations/router';

const RECENT_SEARCHES = ['Fashion', 'Male Cloth', 'Watches', 'Phone'];
const TRENDING = ['Keyboard', 'Accesories', 'Shoes', 'baby doll', 'Ipad'];

type Chip = { label: string; trending?: boolean };

function Chip({ label, trending }: Chip) {
    return (
        <View
            style={[
                styles.chip,
                trending && styles.chipTrending,
            ]}
        >
            <Text
                variant="caption"
                style={[
                    styles.chipLabel,
                    trending && styles.chipLabelTrending,
                ]}
            >
                {label}
            </Text>
        </View>
    );
}

export default function SearchScreen() {
    const { top } = useSafeAreaInsets();
    const [query, setQuery] = useState('');
    const inputRef = useRef<TextInput>(null);

    return (
        <View style={[styles.screen, { paddingTop: top }]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.goBack()}
                    style={styles.backBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text variant="body" style={{ color: colors.primary }}>
                        ‹
                    </Text>
                </Pressable>

                <View style={styles.inputWrapper}>
                    <Search size={16} color={colors.textTertiary} />
                    <TextInput
                        ref={inputRef}
                        autoFocus
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search...."
                        placeholderTextColor={colors.textTertiary}
                        style={styles.input}
                        returnKeyType="search"
                    />
                    {query.length > 0 && (
                        <Pressable onPress={() => setQuery('')}>
                            <X size={16} color={colors.textTertiary} />
                        </Pressable>
                    )}
                </View>

                <Pressable style={styles.filterBtn}>
                    <SlidersHorizontal
                        size={18}
                        color={colors.text}
                        strokeWidth={2}
                    />
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={styles.body}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Recent */}
                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                        <Clock size={16} color={colors.textSecondary} />
                        <Text variant="bodyBold">Recent Searches</Text>
                    </View>
                    <View style={styles.chips}>
                        {RECENT_SEARCHES.map(s => (
                            <Chip key={s} label={s} />
                        ))}
                    </View>
                </View>

                {/* Trending */}
                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                        <TrendingUp size={16} color={colors.primary} />
                        <Text variant="bodyBold">Trending Now</Text>
                    </View>
                    <View style={styles.chips}>
                        {TRENDING.map(s => (
                            <Chip key={s} label={s} trending />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
    },
    backBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        gap: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: colors.text,
    },
    filterBtn: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        padding: 20,
        gap: 24,
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    chipTrending: {
        borderColor: colors.primary + '55',
        backgroundColor: colors.primary + '10',
    },
    chipLabel: {
        color: colors.text,
        fontSize: 13,
    },
    chipLabelTrending: {
        color: colors.primary,
    },
});
