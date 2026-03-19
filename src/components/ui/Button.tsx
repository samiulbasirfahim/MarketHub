import React from 'react';
import { StyleSheet, Text, ActivityIndicator, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import Pressable from './Pressable';
import { colors } from '@/constants/colors';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface Props {
    label: string;
    onPress: () => void;
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    prefixIcon?: LucideIcon;
    suffixIcon?: LucideIcon;
    fullWidth?: boolean; // ✅
}

const iconSize: Record<Size, number> = {
    sm: 18,
    md: 22,
    lg: 26,
};

const iconColor: Record<Variant, string> = {
    primary: colors.primaryForeground,
    secondary: colors.secondaryForeground,
    ghost: colors.text,
    danger: colors.errorLight,
    outline: colors.primary,
};

export default function Button({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    style,
    prefixIcon: PrefixIcon,
    suffixIcon: SuffixIcon,
    fullWidth = false, // ✅
}: Props) {
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    React.useEffect(() => {
        opacity.value = withSpring(disabled || loading ? 0.5 : 1);
    }, [disabled, loading]);

    const resolvedIconSize = iconSize[size];
    const resolvedIconColor = iconColor[variant];

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            scaleTo={0.97}
            style={[styles.base, styles[variant], styles[size], style,

            fullWidth && styles.fullWidth, // ✅
            ]}
        >
            <Animated.View style={[styles.inner, animatedStyle]}>
                {loading ? (
                    <ActivityIndicator
                        color={variant === 'primary' ? colors.primaryForeground : colors.text}
                        size="small"
                    />
                ) : (
                    <>
                        {PrefixIcon && (
                            <PrefixIcon
                                size={resolvedIconSize}
                                strokeWidth={2}
                                color={resolvedIconColor}
                                style={styles.prefixIcon}
                            />
                        )}
                        <Text style={[styles.label, styles[`${variant}Label`]]}>
                            {label}
                        </Text>
                        {SuffixIcon && (
                            <SuffixIcon
                                size={resolvedIconSize}
                                strokeWidth={2}
                                color={resolvedIconColor}
                                style={styles.suffixIcon}
                            />
                        )}
                    </>
                )}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    fullWidth: { width: '100%' },
    prefixIcon: {},
    suffixIcon: {},

    // ─── Variants ───────────────────────────────────────────
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.secondary },
    ghost: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.surface,
    },
    danger: { backgroundColor: colors.error },
    outline: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.primary,
    },

    // ─── Sizes ──────────────────────────────────────────────
    sm: { height: 38, paddingHorizontal: 16 },
    md: { height: 48, paddingHorizontal: 24 },
    lg: { height: 56, paddingHorizontal: 32 },

    // ─── Labels ─────────────────────────────────────────────
    label: { fontSize: 15, fontWeight: '600' },
    primaryLabel: { color: colors.primaryForeground },
    secondaryLabel: { color: colors.secondaryForeground },
    ghostLabel: { color: colors.text },
    dangerLabel: { color: colors.errorLight },
    outlineLabel: { color: colors.primary },
});
