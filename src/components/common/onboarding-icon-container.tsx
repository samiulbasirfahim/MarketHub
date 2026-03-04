import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function OnboardingIconContainer({
    children,
    colors = [],
}: {
    children: React.ReactNode;
    colors?: string[];
}) {
    return (
        <LinearGradient
            style={styles.container}
            colors={colors}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
