import { StyleSheet, View } from 'react-native';

export default function SplashScreen() {
    return <View style={sts.container}></View>;
}

const sts = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF0000',
    },
});
