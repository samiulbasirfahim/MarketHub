import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Plus, MapPin } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import AddressCard from '@/components/common/address-card';
import DeleteAddressModal from '@/components/common/delete-address-modal';
import { SettingsSubScreensStackParamList } from '@/navigations/types';
import { MOCK_ADDRESSES } from './address-data';
import { Button } from '@/components/ui';
import { ScreenHeader } from '@/components/common/screen-header';

type Props = NativeStackScreenProps<
    SettingsSubScreensStackParamList,
    'SavedAddresses'
>;

export default function SavedAddressesScreen({ navigation }: Props) {
    const [selectedId, setSelectedId] = useState(MOCK_ADDRESSES[0]?.id ?? '');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const selectedDelete = MOCK_ADDRESSES.find(item => item.id === deleteId);

    return (
        <View style={styles.screen}>
            <View style={styles.headerRow}>
                <MapPin size={22} color={colors.primary} />
                <ScreenHeader title="Address Book" />
            </View>

            <FlatList
                data={MOCK_ADDRESSES}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <AddressCard
                        address={item}
                        showActions
                        onEdit={() => navigation.navigate('AddressForm', { id: item.id })}
                        onDelete={() => setDeleteId(item.id)}
                    />
                )}
                ListFooterComponent={
                    <Button
                        label="Add New Address"
                        variant="outline"
                        prefixIcon={Plus}
                        onPress={() => navigation.navigate('AddressForm')}
                    />
                }
            />

            <DeleteAddressModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={() => setDeleteId(null)}
                addressName={selectedDelete?.fullName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
    },
    title: {
        color: colors.text,
    },
    list: {
        gap: 12,
        paddingBottom: 20,
    },
    addAddressBtn: {
        marginTop: 2,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 18,
        minHeight: 88,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 6,
        backgroundColor: colors.background,
    },
    addAddressText: {
        color: colors.primary,
    },
});
