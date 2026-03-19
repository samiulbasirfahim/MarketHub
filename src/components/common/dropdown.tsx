import { ChevronDown } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';

type Option = {
    label: string;
    value: string;
};

type AppSelectProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    options: Option[];
    onChange?: (value: string) => void;
    errorMessage?: string;
};

export function AppSelect({
    label,
    placeholder = 'Select option',
    value,
    options,
    onChange,
    errorMessage,
}: AppSelectProps) {
    const [open, setOpen] = useState(false);

    const dropdownAnim = useSharedValue(0);
    const rotate = useSharedValue(0);

    const selected = options.find(o => o.value === value);

    useEffect(() => {
        dropdownAnim.value = withTiming(open ? 1 : 0, { duration: 180 });
        rotate.value = withTiming(open ? 1 : 0, { duration: 200 });
    }, [open]);

    function toggle() {
        Keyboard.dismiss();
        setOpen(prev => !prev);
    }

    function handleSelect(v: string) {
        onChange?.(v);
        setOpen(false);
    }

    const arrowStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value * 180}deg` }],
    }));

    const dropdownStyle = useAnimatedStyle(() => ({
        opacity: dropdownAnim.value,
        transform: [
            { translateY: withTiming(dropdownAnim.value ? 6 : 0) },
            { scale: 0.95 + dropdownAnim.value * 0.05 },
        ],
    }));

    return (
        <View style={styles.root}>
            {label && (
                <Text variant="label" style={styles.label}>
                    {label}
                </Text>
            )}

            {/* Trigger */}
            <Pressable
                onPress={toggle}
                style={[
                    styles.trigger,
                    errorMessage && styles.triggerError,
                    open && styles.triggerOpen,
                ]}
            >
                <Text
                    variant="body"
                    style={selected ? styles.triggerText : styles.placeholderText}
                >
                    {selected?.label ?? placeholder}
                </Text>
                <Animated.View style={arrowStyle}>
                    <ChevronDown size={20} color={colors.textTertiary} />
                </Animated.View>
            </Pressable>

            {/* Dropdown */}
            <Animated.View
                pointerEvents={open ? 'auto' : 'none'}
                style={[styles.dropdown, dropdownStyle]}
            >
                <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    {options.map(item => {
                        const isActive = item.value === value;
                        return (
                            <Pressable
                                key={item.value}
                                onPress={() => handleSelect(item.value)}
                                style={[styles.option, isActive && styles.optionActive]}
                            >
                                <Text
                                    variant="body"
                                    style={isActive ? styles.optionTextActive : styles.optionText}
                                >
                                    {item.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </Animated.View>

            {errorMessage && (
                <Text variant="caption" style={styles.error}>
                    {errorMessage}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        gap: 6,
    },
    label: {
        color: colors.text,
    },

    // ── Trigger ────────────────────────────────────────────────
    trigger: {
        minHeight: 48,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.textTertiary,
        backgroundColor: colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    triggerOpen: {
        borderColor: colors.text,
        borderWidth: 1.5,
    },
    triggerError: {
        borderColor: colors.error,
    },
    triggerText: {
        flex: 1,
        color: colors.text,
    },
    placeholderText: {
        flex: 1,
        color: colors.textTertiary,
    },

    // ── Dropdown ───────────────────────────────────────────────
    dropdown: {
        position: 'absolute',
        top: 56,
        width: '100%',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        maxHeight: 220,
        overflow: 'hidden',
        zIndex: 999,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    optionActive: {
        backgroundColor: `${colors.primary}12`,
    },
    optionText: {
        color: colors.textSecondary,
    },
    optionTextActive: {
        color: colors.primary,
        fontWeight: '600',
    },

    // ── Error ──────────────────────────────────────────────────
    error: {
        color: colors.error,
    },
});
