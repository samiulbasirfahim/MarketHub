import { Logo } from '@/components/common';
import { Lock, Mail } from 'lucide-react-native';
import { Layout } from '@/components/layout';
import { Input, Text } from '@/components/ui';
import { KeyboardController } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native';

export default function LoginScreen() {
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
            <Text
                variant="body"
                style={sts.forgotPassword}
                onPress={() => }
            >
                Forgot Password?
            </Text>
        </Layout>
    );
}

const sts = StyleSheet.create({
    forgotPassword: {
            alignSelf: "flex-end",
            marginTop: 8,
    }
})
