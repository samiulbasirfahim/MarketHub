import { View } from 'react-native';
import LOCATION from '@/assets/icons/location.svg';
import OnboardingIconContainer from '@/components/common/onboarding-icon-container';
import { colors } from '@/constants/colors';
import { Text } from '@/components/ui';
import { styles } from './styles';

export default function OnboardingScreen() {
    return (
        <View style={styles.container}>
            <OnboardingIconContainer colors={[colors.accent, colors.secondary]}>
                <LOCATION width={80} height={80} />
            </OnboardingIconContainer>
            <View style={styles.textContainer}>
                <Text variant="bodyLarge">Track Live Delivery</Text>
                <Text centered variant="body">
                    Monitor your order in real-time from preparation to your doorstep
                </Text>
            </View>
        </View>
    );
}
