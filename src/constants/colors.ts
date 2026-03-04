export const colors = {
    primary: '#2962FF',
    primaryForeground: '#FFFFFF',

    secondary: '#F5F5F5',
    secondaryForeground: '#000000',

    accent: '#2563EB',
    accentForeground: '#FFFFFF',

    background: '#FFFFFF',
    surface: '#FAFAFA', // cards, sheets, inputs
    overlay: '#00000060', // modal backdrops

    text: '#0A0A0A',
    textSecondary: '#6B6B6B',
    textTertiary: '#ADADAD',
    textDisabled: '#D4D4D4',
    textInverse: '#FFFFFF',

    border: '#E5E5E5',
    borderFocus: '#000000',
    borderStrong: '#A3A3A3',

    success: '#16A34A',
    successLight: '#DCFCE7',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    info: '#2563EB',
    infoLight: '#DBEAFE',

    tabBar: '#FFFFFF',
    tabBarBorder: '#F0F0F0',
    tabBarActive: '#000000',
    tabBarInactive: '#A3A3A3',

    transparent: 'transparent',
    white: '#FFFFFF',
    black: '#000000',
} as const;

export type Colors = typeof colors;
