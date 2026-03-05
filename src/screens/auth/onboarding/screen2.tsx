import { View } from 'react-native';
import ORDER from '@/assets/icons/order.svg';
import OnboardingIconContainer from '@/components/common/onboarding-icon-container';
import { Text } from '@/components/ui';
import { styles } from './styles';

export default function OnboardingScreen() {
    return (
        <View style={styles.container}>
            <OnboardingIconContainer
                colors={[
                    '#2962FF',
                    '#2769FA',
                    '#217DEC',
                    '#189ED6',
                    '#0CCBB8',
                    '#09D8B0',
                ]}
            >
                <ORDER width={80} height={80} />
            </OnboardingIconContainer>
            <View style={styles.textContainer}>
                <Text variant="bodyLarge">Order in Minutes</Text>
                <Text centered variant="body">
                    Browse menus, customize your order, and checkout in just a few taps
                </Text>
            </View>
        </View>
    );
}
