import { colors } from '@/constants/colors';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolateColor,
} from 'react-native-reanimated';

interface Props {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
}

const THUMB_SIZE = 22;
const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 28;
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - 6;

export default function Switch({ value, onValueChange, disabled }: Props) {
    const progress = useSharedValue(value ? 1 : 0);

    React.useEffect(() => {
        progress.value = withSpring(value ? 1 : 0, {
            damping: 15,
            stiffness: 300,
        });
    }, [value]);

    const trackStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            [colors.surface, colors.background],
        ),
        opacity: disabled ? 0.5 : 1,
    }));

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: progress.value * TRAVEL + 3,
            },
        ],
    }));

    return (
        <Pressable
            onPress={() => !disabled && onValueChange(!value)}
            accessibilityRole="switch"
            accessibilityState={{ checked: value, disabled }}
        >
            <Animated.View style={[styles.track, trackStyle]}>
                <Animated.View style={[styles.thumb, thumbStyle]} />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    track: {
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
        borderRadius: TRACK_HEIGHT / 2,
        justifyContent: 'center',
    },
    thumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        backgroundColor: colors.surface,
        shadowColor: colors.border,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
    },
});
