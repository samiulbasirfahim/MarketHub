import { BASE_URL } from '@env';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
    return <View style={sts.container}>
        <Text>{BASE_URL}</Text>
    </View>;
}

const sts = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF0000',
    },
});
