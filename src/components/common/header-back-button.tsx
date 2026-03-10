import { Pressable, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { router } from '@/navigations/router';

export default function HeaderBackButton({
    canGoBack,
}: {
    canGoBack: boolean;
}) {
    if (!canGoBack) return null;

    return (
        <Pressable
            onPress={router.goBack}
            style={styles.button}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <ChevronLeft size={24} color={colors.text} strokeWidth={2} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
});
