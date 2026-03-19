import { StyleSheet } from 'react-native';
import { Text } from '../ui';
import { colors } from '@/constants/colors';

export function ScreenHeader({ title }: { title: string }) {
    return (
        <Text variant="secondary" weight="bold" style={styles.title}>
            {title}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: colors.text,
    },
});
