import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolateColor,
    Easing,
} from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface Props {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
    size?: number;
}

const SPRING = { damping: 15, stiffness: 300, mass: 0.8 };

export default function Checkbox({
    value,
    onValueChange,
    disabled = false,
    size = 22,
}: Props) {
    const progress = useSharedValue(value ? 1 : 0);
    const scale = useSharedValue(1);

    React.useEffect(() => {
        progress.value = withSpring(value ? 1 : 0, SPRING);
    }, [value]);

    // ─── Box background + border ──────────────────────────────
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
        transform: [{ scale: scale.value }],
        opacity: disabled ? 0.5 : 1,
    }));

    // ─── Check icon scale + opacity ───────────────────────────
    const checkStyle = useAnimatedStyle(() => ({
        opacity: withTiming(progress.value, {
            duration: 150,
            easing: Easing.out(Easing.ease),
        }),
        transform: [
            {
                scale: withSpring(progress.value === 1 ? 1 : 0.5, SPRING),
            },
        ],
    }));

    const handlePress = () => {
        if (disabled) return;

        // pop animation on press
        scale.value = withSpring(0.85, SPRING, () => {
            scale.value = withSpring(1, SPRING);
        });

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
