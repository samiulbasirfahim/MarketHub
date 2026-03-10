import { Layout } from '@/components/layout';
import { Button, Text } from '@/components/ui';
import OtpInput from '@/components/ui/OtpInput';
import { router } from '@/navigations/router';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RegisterStackParamList } from '@/navigations/types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = NativeStackScreenProps<RegisterStackParamList, 'VerifiyOtp'>;

export default function VerifyOtp({ route }: Props) {
    const { email } = route.params;
    const [otp, setOtp] = useState('');

    return (
        <Layout centered>
            <View style={sts.topSection} />

            <Text variant="primary" style={{ fontSize: 26, lineHeight: 34 }}>
                Verify Your Email
            </Text>
            <Text variant="text" style={{ marginTop: 8 }}>
                We sent a 4-digit verification code to{' '}
                <Text variant="bodyBold">{email}</Text>. Please enter it below to
                activate your account.
            </Text>

            <View style={sts.otpWrapper}>
                <OtpInput numberOfDigits={4} onChange={setOtp} />
            </View>

            <Button
                style={{ marginTop: 32, width: '100%' }}
                disabled={otp.length < 4}
                onPress={() => {
                    router.replace('Auth', { screen: 'Login' });
                }}
                label="Verify & Continue"
                fullWidth
            />

            <Text style={{ marginTop: 16 }}>
                Didn't receive the code?{' '}
                <Text variant="link" onPress={() => {}}>Resend</Text>
            </Text>
        </Layout>
    );
}

const sts = StyleSheet.create({
    topSection: { height: 60 },
    otpWrapper: { width: '80%', alignSelf: 'center', marginTop: 32 },
});
