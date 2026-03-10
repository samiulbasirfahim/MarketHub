import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { colors } from '@/constants/colors';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

export function Modal({ children, isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <Portal>
            <Pressable onPress={onClose} style={styles.backdrop}>
                <Pressable
                    onPress={e => e.stopPropagation()}
                    style={styles.sheet}
                >
                    {children}
                </Pressable>
            </Pressable>
        </Portal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheet: {
        width: '82%',
        backgroundColor: colors.background,
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 16,
        padding: 20,
    },
});
