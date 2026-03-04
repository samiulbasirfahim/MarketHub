import { StyleSheet, View } from 'react-native';
import Search from '@/assets/icons/search.svg';
import OnboardingIconContainer from '@/components/common/onboarding-icon-container';
import { colors } from '@/constants/colors';

export default function OnboardingScreen() {
    return (
        <View style={styles.container}>
            <OnboardingIconContainer
                colors={[colors.accent, colors.primary, colors.secondary]}
            >
                <Search width={80} height={80} />
            </OnboardingIconContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    children: {
        marginTop: -60,
    },
});
