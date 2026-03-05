import { Layout } from '@/components/layout';
import { BASE_URL } from '@env';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
    return (
        <Layout>
            <Text>Loading...</Text>
        </Layout>
    );
}

const sts = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF0000',
    },
});
