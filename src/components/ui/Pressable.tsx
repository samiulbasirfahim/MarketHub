import React from 'react';
import {
    Pressable as RNPressable,
    PressableProps,
    StyleSheet,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

interface Props extends PressableProps {
    scaleTo?: number;
}

export default function Pressable({
    scaleTo = 0.96,
    style,
    children,
    ...props
}: Props) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            style={[animatedStyle, style]}
            onPressIn={() => {
                scale.value = withSpring(scaleTo, { damping: 15, stiffness: 300 });
            }}
            onPressOut={() => {
                scale.value = withSpring(1, { damping: 15, stiffness: 300 });
            }}
            {...props}
        >
            {children}
        </AnimatedPressable>
    );
}
