import { Logo } from '@/components/common';
import { Lock, Mail } from 'lucide-react-native';
import { Layout } from '@/components/layout';
import { Button, Input, Pressable, Text } from '@/components/ui';
import { KeyboardController } from 'react-native-keyboard-controller';
import { Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Navigation, RootStackParamList } from '@/navigations';
import { router } from '@/navigations/router';

export default function LoginScreen() {
    const { push, replace } = useNavigation<Navigation>();
    const handleSubmit = () => { };

    return (
        <Layout includeTopInset centered>
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
            <Pressable
                onPress={() => {
                    router.push('Auth', {
                        screen: 'ForgotPassword',
                        params: {
                            screen: 'EmailScreen',
                        },
                    });
                }}
            >
                <Text variant="link" style={sts.forgotPassword}>
                    Forgot Password?
                </Text>
            </Pressable>
        </Layout>
    );
}

const sts = StyleSheet.create({
    forgotPassword: {
        alignSelf: 'flex-end',
    },
});
