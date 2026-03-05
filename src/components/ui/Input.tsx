import { colors } from '@/constants/colors';
import { Eye, EyeOff, LucideIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    TextInput,
    TextInputProps,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    Pressable,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolateColor,
} from 'react-native-reanimated';

interface Props extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    prefixIcon?: LucideIcon;
    iconSize?: number;
}

export default function Input({
    label,
    error,
    containerStyle,
    onFocus,
    onBlur,
    prefixIcon: PrefixIcon,
    iconSize = 18,
    secureTextEntry,
    ...props
}: Props) {
    const focused = useSharedValue(0);
    const [showPassword, setShowPassword] = useState(false);
    const hasError = !!error;

    const animatedBorder = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            focused.value,
            [0, 1],
            [
                hasError ? colors.errorLight : colors.textTertiary,
                hasError ? colors.error : colors.text,
            ],
        ),
        borderWidth: withSpring(focused.value === 1 ? 1.5 : 1),
    }));

    const animatedLabel = useAnimatedStyle(() => ({
        color: interpolateColor(
            focused.value,
            [0, 1],
            [
                hasError ? colors.errorLight : colors.textTertiary,
                hasError ? colors.error : colors.text,
            ],
        ),
    }));

    const iconColor = hasError ? colors.error : colors.textTertiary;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Animated.Text style={[styles.label, animatedLabel]}>
                    {label}
                </Animated.Text>
            )}
            <Animated.View style={[styles.inputWrapper, animatedBorder]}>
                {/* Prefix Icon */}
                {PrefixIcon && (
                    <View style={styles.iconLeft}>
                        <PrefixIcon size={iconSize} color={iconColor} />
                    </View>
                )}

                <TextInput
                    style={[
                        styles.input,
                        PrefixIcon && styles.inputWithPrefixIcon,
                        secureTextEntry && styles.inputWithSuffixIcon,
                    ]}
                    placeholderTextColor={colors.textTertiary}
                    secureTextEntry={secureTextEntry && !showPassword}
                    onFocus={e => {
                        focused.value = withSpring(1);
                        onFocus?.(e);
                    }}
                    onBlur={e => {
                        focused.value = withSpring(0);
                        onBlur?.(e);
                    }}
                    {...props}
                />

                {/* Eye toggle — only when secureTextEntry */}
                {secureTextEntry && (
                    <Pressable
                        style={styles.iconRight}
                        onPress={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? (
                            <EyeOff size={iconSize} color={iconColor} />
                        ) : (
                            <Eye size={iconSize} color={iconColor} />
                        )}
                    </Pressable>
                )}
            </Animated.View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 6, width: '100%' },
    label: { fontSize: 13, fontWeight: '500' },
    inputWrapper: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.textTertiary,
        backgroundColor: colors.surface,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
        paddingHorizontal: 14,
    },
    inputWithPrefixIcon: {
        paddingLeft: 40,
    },
    inputWithSuffixIcon: {
        paddingRight: 40,
    },
    iconLeft: {
        position: 'absolute',
        left: 12,
        zIndex: 1,
    },
    iconRight: {
        position: 'absolute',
        right: 12,
        zIndex: 1,
    },
    error: { fontSize: 12, color: colors.error },
});
