import { Logo } from '@/components/common';
import { ChevronRight, Lock, Mail } from 'lucide-react-native';
import { Layout } from '@/components/layout';
import { Button, Checkbox, Input, Text } from '@/components/ui';
import { KeyboardController } from 'react-native-keyboard-controller';
import { StyleSheet, View } from 'react-native';
import { router } from '@/navigations/router';
import { useState } from 'react';

export default function RegisterScreen() {
    const handleSubmit = () => { };

    const [agreed, setAgreed] = useState(false);

    return (
        <Layout includeTopInset centered>
            <View style={sts.topSection} />
            <Logo />

            <Input
                prefixIcon={Mail}
                label="Name"
                placeholder="Enter your name"
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="emergency-call"
                onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                submitBehavior="submit"
            />
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
                submitBehavior="submit"
                autoCapitalize="none"
                returnKeyType="next"
                placeholder="Password"
                label="Password"
                secureTextEntry
                prefixIcon={Lock}
                onSubmitEditing={() => KeyboardController.setFocusTo('next')}
            />
            <Input
                autoCapitalize="none"
                returnKeyType="done"
                placeholder="Confirm Password"
                label="Confirm Password"
                secureTextEntry
                prefixIcon={Lock}
                onSubmitEditing={handleSubmit}
            />

            <View style={sts.container}>
                <Checkbox value={agreed} onValueChange={setAgreed} size={22} />
                <Text variant="body" style={sts.text}>
                    I agree to the{' '}
                    <Text variant="link" onPress={() => { }}>
                        Terms & Conditions
                    </Text>{' '}
                    and{' '}
                    <Text variant="link" onPress={() => { }}>
                        Privacy Policy
                    </Text>
                </Text>
            </View>

            <Button
                onPress={handleSubmit}
                label="Login"
                fullWidth
                suffixIcon={ChevronRight}
            />

            <Text>
                Already Have an account?{' '}
                <Text
                    variant="link"
                    onPress={() => {
                        router.push('Auth', {
                            screen: 'Login',
                        });
                    }}
                >
                    Sign In
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
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        flexShrink: 1,
    },
});
