import React from 'react';
import { Text as RNText, TextProps, TextStyle, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

type Variant =
    | 'primary'
    | 'secondary'
    | 'base'
    | 'text'
    | 'body'
    | 'bodyLarge'
    | 'bodyBold'
    | 'lead'
    | 'label'
    | 'caption'
    | 'overline'
    | 'link'
    | 'code';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

interface Props extends TextProps {
    variant?: Variant;
    size?: Size;
    weight?: Weight;
    centered?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    uppercase?: boolean;
    children: React.ReactNode;
}

const variantStyles: { [key in Variant]: TextStyle } = {
    primary: {
        color: colors.text,
        fontSize: 36,
        lineHeight: 44,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    secondary: {
        color: colors.text,
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
    },
    base: {
        color: colors.text,
        fontSize: 15,
        lineHeight: 24,
        fontWeight: '400',
    },
    text: {
        color: colors.textTertiary,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '400',
    },
    body: {
        color: colors.text,
        fontSize: 15,
        lineHeight: 24,
        fontWeight: '400',
    },
    bodyLarge: {
        color: colors.text,
        fontSize: 17,
        lineHeight: 26,
        fontWeight: '400',
    },
    bodyBold: {
        color: colors.text,
        fontSize: 15,
        lineHeight: 24,
        fontWeight: '700',
    },
    lead: {
        color: colors.text,
        fontSize: 19,
        lineHeight: 30,
        fontWeight: '500',
    },
    label: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
    },
    caption: {
        color: colors.textTertiary,
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '400',
    },
    overline: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    link: {
        color: colors.accent,
        fontSize: 15,
        lineHeight: 24,
        fontWeight: '500',
    },
    code: {
        color: colors.text,
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'monospace',
    },
};

const sizeOverride: { [key in Size]: TextStyle } = {
    xs: { fontSize: 11, lineHeight: 16 },
    sm: { fontSize: 13, lineHeight: 18 },
    md: { fontSize: 15, lineHeight: 24 },
    lg: { fontSize: 18, lineHeight: 26 },
    xl: { fontSize: 22, lineHeight: 30 },
    '2xl': { fontSize: 28, lineHeight: 36 },
    '3xl': { fontSize: 36, lineHeight: 44 },
};

const weightOverride: { [key in Weight]: TextStyle } = {
    regular: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    semibold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
};

export default function Text({
    variant = 'base',
    size,
    weight,
    centered = false,
    italic = false,
    underline = false,
    strikethrough = false,
    uppercase = false,
    style,
    children,
    ...props
}: Props) {
    return (
        <RNText
            style={[
                styles.root,
                variantStyles[variant],
                size && sizeOverride[size],
                weight && weightOverride[weight],
                centered && styles.centered,
                italic && styles.italic,
                underline && styles.underline,
                strikethrough && styles.strikethrough,
                uppercase && styles.uppercase,
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
}

const styles = StyleSheet.create({
    root: { includeFontPadding: false },
    centered: { textAlign: 'center' },
    italic: { fontStyle: 'italic' },
    underline: { textDecorationLine: 'underline' },
    strikethrough: { textDecorationLine: 'line-through' },
    uppercase: { textTransform: 'uppercase' },
});
