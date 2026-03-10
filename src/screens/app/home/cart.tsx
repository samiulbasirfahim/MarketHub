import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export default function Screen() {
    return (
        <View style={sts.container}>
            <Text style={sts.text}>Cart</Text>
        </View>
    );
}

const sts = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    text: { fontSize: 18, color: colors.text },
});
