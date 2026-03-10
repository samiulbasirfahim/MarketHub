import { colors } from '@/constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    TextInput,
    TextInputKeyPressEventData,
    View,
} from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

interface Props {
    numberOfDigits?: number;
    onChange: (otp: string) => void;
    gap?: number;
    cellHeight?: number;
}

export default function OtpInput({
    numberOfDigits = 4,
    onChange,
    gap = 12,
    cellHeight = 54,
}: Props) {
    const [values, setValues] = useState<string[]>(
        Array(numberOfDigits).fill(''),
    );
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        onChange(values.join(''));
    }, [values]);

    const handleChange = (text: string, index: number) => {
        // Only take the last character typed
        const char = text.slice(-1);
        const newValues = [...values];
        newValues[index] = char;
        setValues(newValues);

        if (char && index < numberOfDigits - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number,
    ) => {
        if (e.nativeEvent.key === 'Backspace') {
            const newValues = [...values];
            if (newValues[index]) {
                newValues[index] = '';
                setValues(newValues);
            } else if (index > 0) {
                newValues[index - 1] = '';
                setValues(newValues);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    return (
        <View style={[styles.container, { gap }]}>
            {Array(numberOfDigits)
                .fill(null)
                .map((_, index) => (
                    <OtpCell
                        key={index}
                        value={values[index]}
                        isFocused={focusedIndex === index}
                        height={cellHeight}
                        inputRef={(ref) => {
                            inputRefs.current[index] = ref;
                        }}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        onPress={() => inputRefs.current[index]?.focus()}
                    />
                ))}
        </View>
    );
}

interface CellProps {
    value: string;
    isFocused: boolean;
    height: number;
    inputRef: (ref: TextInput | null) => void;
    onChangeText: (text: string) => void;
    onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
    onFocus: () => void;
    onBlur: () => void;
    onPress: () => void;
}

function OtpCell({
    value,
    isFocused,
    height,
    inputRef,
    onChangeText,
    onKeyPress,
    onFocus,
    onBlur,
    onPress,
}: CellProps) {
    const focused = useSharedValue(isFocused ? 1 : 0);

    useEffect(() => {
        focused.value = withSpring(isFocused ? 1 : 0, {
            damping: 15,
            stiffness: 300,
        });
    }, [isFocused]);

    const animatedBorder = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            focused.value,
            [0, 1],
            [colors.textTertiary, colors.text],
        ),
        borderWidth: withSpring(isFocused ? 1.5 : 1),
    }));

    return (
        <Pressable onPress={onPress} style={{ flex: 1 }}>
            <Animated.View
                style={[
                    styles.cell,
                    animatedBorder,
                    { height },
                ]}
            >
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={onChangeText}
                    onKeyPress={onKeyPress}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    style={styles.cellText}
                    caretHidden
                    selectTextOnFocus
                />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
    },
    cell: {
        borderRadius: 12,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.text,
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
});
