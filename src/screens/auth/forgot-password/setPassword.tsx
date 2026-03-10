import { Layout } from '@/components/layout';
import { Button, Input, Text } from '@/components/ui';
import { router } from '@/navigations/router';
import { Lock } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';

export default function SetPassword() {
    const [field, setField] = useState({
        password: '',
        confirmPassword: '',
    });

    const formError = useMemo(() => {
        const errors: { password?: string; confirmPassword?: string } = {};

        if (field.password.length > 0 && field.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';
        } else if (field.password.length > 0 && !/[A-Z]/.test(field.password)) {
            errors.password = 'Password must contain at least one uppercase letter.';
        }

        if (
            field.confirmPassword.length > 0 &&
            field.confirmPassword !== field.password
        ) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return errors;
    }, [field]);

    const isDisabled =
        Object.keys(formError).length > 0 ||
        field.password === '' ||
        field.confirmPassword === '';

    return (
        <Layout>
            <Text variant="secondary">
                Set New Password
            </Text>
            <Text variant="body">
                Your new password must be different from previously used passwords.
            </Text>

            <View style={sts.form}>
                <Input
                    prefixIcon={Lock}
                    label="New Password"
                    placeholder="Enter new password"
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={field.password}
                    onChangeText={(text) =>
                        setField((prev) => ({ ...prev, password: text }))
                    }
                    error={formError.password}
                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                    submitBehavior="submit"
                />

                <Input
                    prefixIcon={Lock}
                    label="Confirm Password"
                    placeholder="Re-enter new password"
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="done"
                    value={field.confirmPassword}
                    onChangeText={(text) =>
                        setField((prev) => ({ ...prev, confirmPassword: text }))
                    }
                    error={formError.confirmPassword}
                />

                <Button
                    style={{ marginTop: 8 }}
                    disabled={isDisabled}
                    onPress={() => {
                        router.replace('Auth', { screen: 'Login' });
                    }}
                    label="Reset Password"
                    fullWidth
                />
            </View>

            <Text style={{ width: '100%' }} centered variant="body">
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
