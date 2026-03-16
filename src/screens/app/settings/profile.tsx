import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';

export default function ProfileScreen() {
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <View style={styles.card}>
                <View style={styles.rowBetween}>
                    <Text variant="secondary" weight="bold" style={styles.title}>
                        Personal Information
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('PersonalInformation')}
                        hitSlop={8}
                    >
                        <Text variant="body" style={styles.editText}>
                            Edit
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.avatarWrap}>
                    <Image
                        source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Akash' }}
                        style={styles.avatarCircle}
                    />
                </View>

                <View style={styles.grid}>
                    <View style={styles.infoItem}>
                        <Text variant="label" style={styles.muted}>
                            Full Name
                        </Text>
                        <Text variant="body" style={styles.value}>
                            Akash
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text variant="label" style={styles.muted}>
                            Email
                        </Text>
                        <Text variant="body" style={styles.value}>
                            customer@demo.com
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text variant="label" style={styles.muted}>
                            Phone
                        </Text>
                        <Text variant="body" style={styles.value}>
                            +1 234 567 8900
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text variant="label" style={styles.muted}>
                            Gender
                        </Text>
                        <Text variant="body" style={styles.value}>
                            Male
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Text variant="secondary" weight="bold" style={styles.title}>
                    Quick Stats
                </Text>
                <View style={styles.statRow}>
                    <Text variant="body" style={styles.statLabel}>
                        Total Orders
                    </Text>
                    <Text variant="secondary" weight="bold" style={styles.statValue}>
                        3
                    </Text>
                </View>
                <View style={styles.statRow}>
                    <Text variant="body" style={styles.statLabel}>
                        Saved Addresses
                    </Text>
                    <Text variant="secondary" weight="bold" style={styles.statValue}>
                        2
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16,
        gap: 16,
    },
    card: {
        borderWidth: 1,
        borderColor: '#DCE3F2',
        borderRadius: 10,
        backgroundColor: colors.background,
        padding: 12,
        gap: 12,
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: '#1A243A',
    },
    editText: {
        color: colors.primary,
        fontWeight: '500',
    },
    avatarWrap: {
        alignItems: 'flex-start',
    },
    avatarCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#DCE9FB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
    },
    infoItem: {
        width: '50%',
        paddingRight: 8,
        gap: 2,
    },
    muted: {
        color: '#6D7C97',
    },
    value: {
        color: '#1A243A',
        fontSize: 13,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statLabel: {
        color: '#425169',
    },
    statValue: {
        color: '#1A243A',
        fontSize: 22,
    },
});
