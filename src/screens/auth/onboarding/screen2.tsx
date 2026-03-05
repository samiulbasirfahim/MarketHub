import { View } from 'react-native';
import ORDER from '@/assets/icons/order.svg';
import OnboardingIconContainer from '@/components/common/onboarding-icon-container';
import { colors } from '@/constants/colors';
import { Text } from '@/components/ui';
import { styles } from './styles';

export default function OnboardingScreen() {
    return (
        <View style={styles.container}>
            <OnboardingIconContainer
                colors={[colors.secondary, colors.accent]}
            >
                <ORDER width={80} height={80} />
            </OnboardingIconContainer>
            <View style={styles.textContainer}>
                <Text variant="bodyLarge">Order in Minutes</Text>
                <Text centered variant="body">Browse menus, customize your order, and checkout in just a few taps</Text>
            </View>
        </View>
    );
}
