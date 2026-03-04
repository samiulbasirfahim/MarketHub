import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Button } from '@/components/ui';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolation,
    SharedValue,
} from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigations';
import OnboardingBackground from '../common/onboarding-bg';

const PILL_WIDTH_ACTIVE = 24;
const PILL_WIDTH_INACTIVE = 8;
const PILL_HEIGHT = 8;
const GAP = 6;

const SPRING_CONFIG = {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
};

function Pill({
    index,
    activeIndex,
}: {
    index: number;
    activeIndex: SharedValue<number>;
}) {
    const animatedStyle = useAnimatedStyle(() => {
        const distance = Math.abs(activeIndex.value - index);

        const width = interpolate(
            distance,
            [0, 1],
            [PILL_WIDTH_ACTIVE, PILL_WIDTH_INACTIVE],
            Extrapolation.CLAMP,
        );

        const opacity = interpolate(
            distance,
            [0, 1],
            [1, 0.35],
            Extrapolation.CLAMP,
        );

        return { width, opacity };
    });

    return <Animated.View style={[styles.pill, animatedStyle]} />;
}

export function OnboardingLayout({
    state,
    navigation,
}: MaterialTopTabBarProps) {
    const totalScreens = state.routes.length;
    const currentIndex = state.index;
    const isLast = currentIndex === totalScreens - 1;

    const activeIndex = useSharedValue(currentIndex);

    useEffect(() => {
        activeIndex.value = withSpring(currentIndex, SPRING_CONFIG);
    }, [currentIndex]);

    const handleLast = () => {
        const parent =
            navigation.getParent<NativeStackNavigationProp<AuthStackParamList>>();
        parent.navigate('Login');
    };

    const handleNext = () => {
        if (isLast) return handleLast();
        const nextRoute = state.routes[currentIndex + 1];
        navigation.navigate(nextRoute.name);
    };

    return (
        <>
            <View style={styles.backgroundContainer} pointerEvents="none">
                <OnboardingBackground />
            </View>
            <View style={styles.skipButton}>
                <Button
                    style={styles.skipButtonInner}
                    label="Skip"
                    variant="primary"
                    onPress={handleLast}
                />
            </View>
            <View style={styles.container} pointerEvents="box-none">
                <View style={styles.pills} pointerEvents="none">
                    {state.routes.map((_, index) => (
                        <Pill key={index} index={index} activeIndex={activeIndex} />
                    ))}
                </View>

                <Button
                    label={isLast ? 'GET STARTED' : 'NEXT'}
                    suffixIcon={ChevronRight}
                    onPress={handleNext}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
        gap: 20,
    },
    pills: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: GAP,
        width: '100%',
    },
    pill: {
        height: PILL_HEIGHT,
        width: PILL_WIDTH_INACTIVE,
        borderRadius: PILL_HEIGHT / 2,
        backgroundColor: colors.primary,
    },
    skipButton: {
        position: 'absolute',
        right: 0,
        top: '15%',
    },
    skipButtonInner: {
        borderRadius: 0,
        borderTopLeftRadius: 999,
        borderBottomLeftRadius: 999,
    },

    backgroundContainer: {
        position: 'absolute',
        inset: 0,
    }
});
