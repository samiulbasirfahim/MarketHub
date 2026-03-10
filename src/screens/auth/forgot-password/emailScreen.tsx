import { Layout } from '@/components/layout';
import { Button, Input, Text } from '@/components/ui';
import { router } from '@/navigations/router';
import { Mail } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function EmailScreen() {
    const [email, setEmail] = useState('');

    const isInvalidEmail = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(email);
    }, [email]);

    return (
        <Layout>
            <Text variant="secondary">
                Forgot Password?
            </Text>
            <Text variant="body">
                Enter the email address associated with your account and we'll
                send you a verification code.
            </Text>

            <View style={sts.form}>
                <Input
                    prefixIcon={Mail}
                    label="Email/Phone"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="done"
                    value={email}
                    onChangeText={setEmail}
                />

                <Button
                    style={{ marginTop: 8 }}
                    disabled={isInvalidEmail}
                    onPress={() => {
                        router.push('Auth', {
                            screen: 'ForgotPassword',
                            params: {
                                screen: 'VerifiyOtp',
                                params: { email },
                            },
                        });
                    }}
                    label="Send OTP"
                    fullWidth
                />
            </View>

            <Text centered variant="body" style={{ width: '100%' }}>
                Remembered your password?{' '}
                <Text
                    variant="link"
                    onPress={() => router.push('Auth', { screen: 'Login' })}
                >
                    Sign In
                </Text>
            </Text>
        </Layout>
    );
}

const sts = StyleSheet.create({
    form: { width: '100%', gap: 16, marginTop: 16 },
});
