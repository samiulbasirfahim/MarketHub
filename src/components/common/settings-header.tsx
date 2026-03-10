import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import Text from '@/components/ui/Text';

type Props = {
    userName?: string;
    avatarUri?: string;
    onNotificationPress?: () => void;
};

export function SettingsHeader({
    userName = 'Guest',
    avatarUri,
    onNotificationPress,
}: Props) {
    const { top } = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={['#2962FF', '#1565C0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.container, { paddingTop: top + 12 }]}
        >
            <View style={styles.topRow}>
                <View style={styles.userRow}>
                    <View style={styles.avatar}>
                        {avatarUri ? (
                            <Image
                                source={{ uri: avatarUri }}
                                style={styles.avatarImage}
                            />
                        ) : (
                            <View style={styles.avatarFallback} />
                        )}
                    </View>
                    <View>
                        <Text style={styles.welcome}>Welcome</Text>
                        <Text style={styles.name}>{userName}</Text>
                    </View>
                </View>

                <Pressable
                    onPress={onNotificationPress}
                    style={({ pressed }) => [
                        styles.iconBtn,
                        { opacity: pressed ? 0.8 : 1 },
                    ]}
                >
                    <Bell size={22} color="#fff" strokeWidth={2} />
                </Pressable>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        overflow: 'hidden',
        backgroundColor: '#ffffff33',
        borderWidth: 2,
        borderColor: '#ffffff55',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarFallback: {
        flex: 1,
        backgroundColor: '#ffffff44',
    },
    welcome: {
        color: '#ffffffBB',
        fontSize: 13,
        fontWeight: '400',
    },
    name: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ffffff33',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
