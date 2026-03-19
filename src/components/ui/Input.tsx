import { colors } from '@/constants/colors';
import { Eye, EyeOff, LucideIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    TextInput,
    TextInputProps,
    StyleSheet,
    Text,
    TextStyle,
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
    inputWrapperStyle?: ViewStyle;
    inputStyle?: TextStyle;
    prefixIcon?: LucideIcon;
    iconSize?: number;
}

export default function Input({
    label,
    error,
    containerStyle,
    inputWrapperStyle,
    inputStyle,
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
    const isMultiline = !!props.multiline;

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
            <Animated.View
                style={[
                    styles.inputWrapper,
                    animatedBorder,
                    isMultiline && styles.multilineWrapper,
                    inputWrapperStyle,
                ]}
            >
                {/* Prefix Icon */}
                {PrefixIcon && (
                    <View style={styles.iconLeft}>
                        <PrefixIcon size={iconSize} color={iconColor} />
                    </View>
                )}

                <TextInput
                    style={[
                        styles.input,
                        isMultiline && styles.multilineInput,
                        PrefixIcon && styles.inputWithPrefixIcon,
                        secureTextEntry && styles.inputWithSuffixIcon,
                        inputStyle,
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
    multilineWrapper: {
        minHeight: 92,
        height: 92,
        alignItems: 'flex-start',
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
        paddingHorizontal: 14,
    },
    multilineInput: {
        textAlignVertical: 'top',
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
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
