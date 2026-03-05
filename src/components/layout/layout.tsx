import React, { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

export type LayoutProps = PropsWithChildren<{
    centered?: boolean;
    verticalCenter?: boolean;
    noPadding?: boolean;
    bottomPadding?: boolean;
    horizontalPadding?: number;
    includeTopInset?: boolean;
    includeBottomInset?: boolean;
    style?: ViewStyle;
    backgroundColor?: string;
}> &
    KeyboardAwareScrollViewProps;

export function Layout({
    children,
    centered = false,
    verticalCenter = false,
    noPadding = false,
    bottomPadding = false,
    horizontalPadding = 24,
    includeTopInset = false,
    includeBottomInset = true,
    style,
    backgroundColor = colors.background,
    ...props
}: LayoutProps) {
    const { top, bottom } = useSafeAreaInsets();

    const paddingTop = noPadding ? 0 : includeTopInset ? top + 16 : 16;
    const paddingBottom = noPadding
        ? 0
        : (includeBottomInset ? bottom : 0) + (bottomPadding ? 120 : 16);

    return (
        <KeyboardAwareScrollView
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            {...props}
            style={[styles.scroll, { backgroundColor }]}
            contentContainerStyle={[
                styles.content,
                {
                    paddingTop,
                    paddingBottom,
                    paddingHorizontal: noPadding ? 0 : horizontalPadding,
                    alignItems: centered ? 'center' : 'flex-start',
                    justifyContent: verticalCenter ? 'center' : 'flex-start',
                },
                style,
            ]}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        gap: 16,
    },
});
