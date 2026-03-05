import { StyleSheet, View } from 'react-native';
import LogoIcon from '@/assets/icons/logo.svg';
import { Text } from '../ui';
import { colors } from '@/constants/colors';

export function Logo() {
    return (
        <View style={sts.container}>
            <View style={sts.iconContainer}>
                <LogoIcon width={50} height={50} />
            </View>
            <Text variant="logo">MarketHub</Text>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    iconContainer: {
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 8,
    },
});
