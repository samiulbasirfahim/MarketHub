import React from 'react';
import {
    Pressable,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import { LucideIcon, Search, SlidersHorizontal } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface Props extends TextInputProps {
    onFilterPress?: () => void;
    /** When set, the entire input becomes a tap target (no keyboard) */
    onPress?: () => void;
    prefixIcon?: LucideIcon;
}

export function SearchBar({ onFilterPress, onPress, prefixIcon: PrefixIcon = Search, ...props }: Props) {
    const isReadOnly = !!onPress;

    return (
        <View style={styles.row}>
            <Pressable
                style={styles.inputWrapper}
                onPress={onPress}
                pointerEvents={isReadOnly ? 'box-only' : 'auto'}
            >
                <PrefixIcon size={18} color={colors.textTertiary} />
                <TextInput
                    style={styles.input}
                    placeholder="Search for any product...."
                    placeholderTextColor={colors.textTertiary}
                    editable={!isReadOnly}
                    pointerEvents={isReadOnly ? 'none' : 'auto'}
                    returnKeyType="search"
                    {...props}
                />
            </Pressable>

            {onFilterPress && (
                <Pressable onPress={onFilterPress} style={styles.filterBtn}>
                    <SlidersHorizontal size={20} color={colors.text} strokeWidth={2} />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: colors.text,
    },
    filterBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
