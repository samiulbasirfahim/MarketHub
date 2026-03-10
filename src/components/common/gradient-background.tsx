import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    children: ReactNode | ReactNode[];
    colors?: string[];
};

export function GradientBackground({
    children,
    colors: gradientColors = ['#2962FF', '#1E40FF'],
}: Props) {
    return (
        <View style={sts.container}>
            <LinearGradient
                style={sts.gradient}
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            {children}
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        gap: 8,
        padding: 16,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
});
