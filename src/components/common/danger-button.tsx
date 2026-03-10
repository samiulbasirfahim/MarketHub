import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
import { LucideIcon } from 'lucide-react-native';
import Text from '@/components/ui/Text';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

type Props = {
    label: string;
    icon?: LucideIcon;
    onPress: () => void;
    disabled?: boolean;
};

export function DangerButton({ label, icon: Icon, onPress, disabled }: Props) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: withSpring(disabled ? 0.5 : 1),
    }));

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            onPressIn={() => { scale.value = withSpring(0.97); }}
            onPressOut={() => { scale.value = withSpring(1); }}
        >
            <Animated.View style={[styles.button, animatedStyle]}>
                <View style={styles.inner}>
                    {Icon && (
                        <Icon size={20} strokeWidth={2} color={colors.error} />
                    )}
                    <Text variant="bodyBold" style={{ color: colors.error }}>
                        {label}
                    </Text>
                </View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.error + '18',
        borderWidth: 1.5,
        borderColor: colors.error,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
