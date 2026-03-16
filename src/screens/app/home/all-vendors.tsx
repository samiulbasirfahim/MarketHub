import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import { HomeSubScreensStackParamList } from '@/navigations/types';
import { MOCK_VENDORS } from '@/constants/mock-data';

type Props = NativeStackScreenProps<HomeSubScreensStackParamList, 'AllVendors'>;

export default function AllVendorsScreen({ navigation }: Props) {
    return (
        <View style={styles.screen}>
            <FlatList
                data={MOCK_VENDORS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('VendorDetails', { vendorId: item.id })
                        }
                    >
                        <View style={styles.left}>
                            <Text variant="label" style={styles.muted}>
                                Since {item.since}
                            </Text>
                            <Text variant="secondary" weight="bold" style={styles.name}>
                                {item.name}
                            </Text>
                            <Text variant="body" style={styles.count}>
                                ({item.productCount} products)
                            </Text>

                            <View style={styles.ratingRow}>
                                {new Array(5).fill(0).map((_, idx) => (
                                    <Star
                                        key={`${item.id}-star-${idx}`}
                                        size={18}
                                        color="#F5B63B"
                                        fill="#F5B63B"
                                    />
                                ))}
                                <Text variant="body" style={styles.reviewCount}>
                                    ({item.reviewCount})
                                </Text>
                            </View>
                        </View>

                        <Image
                            source={{ uri: item.image }}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    list: {
        padding: 16,
        gap: 12,
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDE4F0',
        borderRadius: 12,
        backgroundColor: colors.background,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
        paddingRight: 12,
        gap: 2,
    },
    muted: {
        color: '#7384A3',
    },
    name: {
        color: '#1A243A',
        fontSize: 23,
    },
    count: {
        color: '#495A78',
        fontSize: 14,
    },
    ratingRow: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    reviewCount: {
        color: '#495A78',
        marginLeft: 8,
        fontSize: 14,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 1,
        borderColor: '#ECF0F6',
    },
});
