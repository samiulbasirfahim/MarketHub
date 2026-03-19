import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface Props {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
    size?: number;
}

export default function Checkbox({
    value,
    onValueChange,
    disabled = false,
    size = 22,
}: Props) {
    const progress = useSharedValue(value ? 1 : 0);

    React.useEffect(() => {
        progress.value = withTiming(value ? 1 : 0, { duration: 120 });
    }, [value]);

    const boxStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            [colors.background, colors.primary],
        ),
        borderColor: interpolateColor(
            progress.value,
            [0, 1],
            [colors.border, colors.primary],
        ),
        opacity: disabled ? 0.5 : 1,
    }));

    const checkStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
        transform: [{ scale: 0.92 + progress.value * 0.08 }],
    }));

    const handlePress = () => {
        if (disabled) return;

        onValueChange(!value);
    };

    return (
        <Pressable
            onPress={handlePress}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: value, disabled }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
            <Animated.View
                style={[
                    styles.box,
                    { width: size, height: size, borderRadius: size * 0.25 },
                    boxStyle,
                ]}
            >
                <Animated.View style={checkStyle}>
                    <Check
                        size={size * 0.6}
                        color={colors.primaryForeground}
                        strokeWidth={3}
                    />
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    box: {
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
