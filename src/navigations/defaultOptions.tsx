import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import Text from '@/components/ui/Text';
import HeaderBackground from '@/components/common/header-background';
import HeaderBackButton from '@/components/common/header-back-button';

export const defaultScreenOptions: NativeStackNavigationOptions = {
    headerShown: true,
    headerTransparent: false,
    headerShadowVisible: false,
    headerTitleAlign: 'left',
    headerBackVisible: false,
    headerBackground: () => React.createElement(HeaderBackground),
    headerLeft: ({ canGoBack }) =>
        React.createElement(HeaderBackButton, { canGoBack: !!canGoBack }),
    headerTitle: ({ children }) => (
        <Text variant="secondary" weight="semibold">
            {children}
        </Text>
    ),
};
