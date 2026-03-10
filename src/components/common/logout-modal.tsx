import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui';
import Text from '@/components/ui/Text';
import { useAuthStore } from '@/store';
import { router } from '@/navigations/router';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export function LogoutModal({ isOpen, onClose }: Props) {
    const clearAuth = useAuthStore(s => s.clearAuth);

    const handleLogout = () => {
        clearAuth();
        onClose();
        router.replace('Auth', { screen: 'Login' });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <View style={styles.container}>
                <Text variant="secondary" style={styles.title}>
                    Sign Out
                </Text>
                <Text variant="body" style={styles.message}>
                    Are you sure you want to sign out of your account?
                </Text>

                <Button
                    label="Sign Out"
                    onPress={handleLogout}
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
    container: { gap: 12, alignItems: 'center' },
    title: { textAlign: 'center' },
    message: { textAlign: 'center', opacity: 0.7 },
});
