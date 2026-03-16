import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Camera, UserRound } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { router } from '@/navigations/router';

export default function PersonalInformationScreen() {
    const [fullName, setFullName] = useState('Akash');
    const [phone, setPhone] = useState('0140317XXXX');
    const [email, setEmail] = useState('Akash@gmail.com');
    const [gender, setGender] = useState('Male');

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <View style={styles.card}>
                <View style={styles.avatarWrap}>
                    <View style={styles.avatarCircle}>
                        <UserRound size={38} color={colors.primary} />
                    </View>
                    <Pressable style={styles.cameraBtn}>
                        <Camera size={15} color={colors.text} />
                    </Pressable>
                </View>

                <Input
                    label="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter full name"
                />
                <Input
                    label="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                />
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Input
                    label="Gender"
                    value={gender}
                    onChangeText={setGender}
                    placeholder="Gender"
                />

                <View style={styles.buttonRow}>
                    <Button
                        label="Cancel"
                        variant="ghost"
                        onPress={router.goBack}
                        style={styles.cancelBtn}
                    />
                    <Button
                        label="Save Changes"
                        onPress={router.goBack}
                        style={styles.saveBtn}
                    />
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
    },
    card: {
        borderWidth: 1,
        borderColor: '#DCE3F2',
        borderRadius: 10,
        backgroundColor: colors.background,
        padding: 12,
        gap: 12,
    },
    avatarWrap: {
        width: 96,
        height: 96,
        marginBottom: 6,
    },
    avatarCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: '#DCE9FB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraBtn: {
        position: 'absolute',
        right: 6,
        bottom: 12,
        width: 22,
        height: 22,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DCE3F2',
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 4,
    },
    cancelBtn: {
        flex: 0.9,
        borderRadius: 24,
        borderColor: '#FF8F8F',
    },
    saveBtn: {
        flex: 1.6,
        borderRadius: 24,
    },
});
