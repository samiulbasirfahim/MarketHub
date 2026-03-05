import {  View } from 'react-native';
import Search from '@/assets/icons/search.svg';
import OnboardingIconContainer from '@/components/common/onboarding-icon-container';
import { colors } from '@/constants/colors';
import { Text } from '@/components/ui';
import { styles } from './styles';

export default function OnboardingScreen() {
    return (
        <View style={styles.container}>
            <OnboardingIconContainer
                colors={[colors.primary, colors.secondary]}
            >
                <Search width={80} height={80} />
            </OnboardingIconContainer>
            <View style={styles.textContainer}>
                <Text variant="bodyLarge">Discover Best Product </Text>
                <Text centered variant="body">Find the best product near you with our powerful search and filters</Text>
            </View>
        </View>
    );
}
