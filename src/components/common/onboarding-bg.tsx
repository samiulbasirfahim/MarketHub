import OnboardingTop from '@/assets/icons/onboarding-top.svg';
import OnboardingBottom from '@/assets/icons/onboarding-bottom.svg';
import { StyleSheet, View } from 'react-native';
export default function OnboardingBackground() {
    return (
        <View pointerEvents="none" style={styles.container}>
            <OnboardingTop
                width="60%"
                height={200}
                style={[styles.top, styles.commonStyle]}
            />
            <OnboardingBottom
                width="60%"
                height={200}
                style={[styles.bottom, styles.commonStyle]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    top: {
        position: 'absolute',
        top: '15%',
        left: 0,
    },
    bottom: {
        position: 'absolute',
        bottom: '18%',
        right: 0,
    },
    commonStyle: {
        width: '60%',
        height: 200,
    },
    container: {
        flex: 1,
    },
})
