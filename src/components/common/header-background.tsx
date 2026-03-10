import { View, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export default function HeaderBackground() {
    return <View style={styles.container} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        borderBottomWidth: 2,
        borderBottomColor: colors.border,
    },
});
