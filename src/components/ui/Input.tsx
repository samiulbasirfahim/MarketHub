import { colors } from '@/constants/colors';
import React, { useState } from 'react';
import {
    TextInput,
    TextInputProps,
    StyleSheet,
    Text,
    View,
    ViewStyle,
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
}

export default function Input({
    label,
    error,
    containerStyle,
    onFocus,
    onBlur,
    ...props
}: Props) {
    const focused = useSharedValue(0);
    const hasError = !!error;

    const animatedBorder = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            focused.value,
            [0, 1],
            [hasError ? '#ef4444' : '#e0e0e0', hasError ? '#ef4444' : '#000'],
        ),
        borderWidth: withSpring(focused.value === 1 ? 1.5 : 1),
    }));

    const animatedLabel = useAnimatedStyle(() => ({
        color: interpolateColor(
            focused.value,
            [0, 1],
            [hasError ? '#ef4444' : '#999', hasError ? '#ef4444' : '#000'],
        ),
    }));

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Animated.Text style={[styles.label, animatedLabel]}>
                    {label}
                </Animated.Text>
            )}
            <Animated.View style={[styles.inputWrapper, animatedBorder]}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#bbb"
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
            </Animated.View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 6 },
    label: { fontSize: 13, fontWeight: '500' },
    inputWrapper: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.borderFocus,
        backgroundColor: colors.surface,
        paddingHorizontal: 14,
        height: 48,
        justifyContent: 'center',
    },
    input: {
        fontSize: 15,
        color: colors.text,
        flex: 1,
    },
    error: { fontSize: 12, color: colors.error },
});
