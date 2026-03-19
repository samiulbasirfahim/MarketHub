import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui';
import Text from '@/components/ui/Text';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    addressName?: string;
};

export default function DeleteAddressModal({
    isOpen,
    onClose,
    onConfirm,
    addressName,
}: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <View style={styles.container}>
                <Text variant="secondary" style={styles.title}>
                    Delete Address
                </Text>
                <Text variant="body" style={styles.message}>
                    Are you sure you want to delete
                    {addressName ? ` ${addressName}'s address` : ' this address'}?
                </Text>

                <Button
                    label="Delete"
                    onPress={onConfirm}
                    variant="danger"
                    fullWidth
                />
                <Button
                    label="Cancel"
                    onPress={onClose}
                    variant="ghost"
                    fullWidth
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
        opacity: 0.7,
    },
});
