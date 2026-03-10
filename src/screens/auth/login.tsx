import { Logo } from '@/components/common';
import { ChevronRight, Lock, Mail } from 'lucide-react-native';
import { Layout } from '@/components/layout';
import { Button, Input, Text } from '@/components/ui';
import { KeyboardController } from 'react-native-keyboard-controller';
import { StyleSheet, View } from 'react-native';
import { router } from '@/navigations/router';
import { useAuthStore } from '@/store';

export default function LoginScreen() {
    const setTokens = useAuthStore(x => x.setTokens);
    const handleSubmit = () => {
        setTokens({
            accessToken: 'mock_access_token',
            refreshToken: 'mock_refresh_token',
        });
    };

    return (
        <Layout includeTopInset centered>
            <View style={sts.topSection} />
            <Logo />
            <Input
                prefixIcon={Mail}
                label="Email or Phone"
                placeholder="Enter your Email/Phone"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                submitBehavior="submit"
            />
            <Input
                autoCapitalize="none"
                returnKeyType="done"
                placeholder="Password"
                label="Password"
                secureTextEntry
                prefixIcon={Lock}
                onSubmitEditing={handleSubmit}
            />
            <Text
                onPress={() => {
                    router.push('Auth', {
                        screen: 'ForgotPassword',
                        params: {
                            screen: 'EmailScreen',
                        },
                    });
                }}
                variant="link"
                style={sts.forgotPassword}
            >
                Forgot Password?
            </Text>

            <Button
                onPress={handleSubmit}
                label="Login"
                fullWidth
                suffixIcon={ChevronRight}
            />

            <Text>
                Don't have an account?{' '}
                <Text
                    variant="link"
                    onPress={() => {
                        router.push('Auth', {
                            params: {
                                screen: 'Register',
                            },
                            screen: 'Register',
                        });
                    }}
                >
                    Sign Up
                </Text>
            </Text>
        </Layout>
    );
}

const sts = StyleSheet.create({
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    topSection: {
        height: 60,
    },
});
