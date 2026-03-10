import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ChevronRight, LucideIcon } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import Switch from '@/components/ui/Switch';

export type SettingsButton = {
    label: string;
    description?: string;
    icon: LucideIcon;
    iconColor?: string;
    onPress?: () => void;
    disabled?: boolean;
    toggle?: boolean;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
};

type Props = {
    label: string;
    buttons: SettingsButton[];
};

export function SettingsButtonGroup({ label, buttons }: Props) {
    return (
        <View style={{ width: '100%' }}>
            <Text
                variant="label"
                style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}
            >
                {label}
            </Text>
            <View
                style={[
                    sts.container,
                    {
                        borderColor: colors.border,
                        backgroundColor: colors.surface,
                    },
                ]}
            >
                {buttons.map((button, index) => {
                    const lastItem = index === buttons.length - 1;
                    return (
                        <Pressable
                            onPress={() => {
                                if (button.onPress && !button.disabled) button.onPress();
                            }}
                            disabled={button.disabled}
                            key={index}
                            style={({ pressed }) => [
                                sts.buttonContainer,
                                {
                                    borderBottomWidth: lastItem ? 0 : 1,
                                    borderBottomColor: colors.border,
                                    paddingVertical: 12,
                                    opacity: button.disabled ? 0.5 : pressed ? 0.7 : 1,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    sts.iconContainer,
                                    {
                                        backgroundColor: colors.border + '66',
                                        borderColor: colors.border,
                                    },
                                ]}
                            >
                                <button.icon
                                    size={20}
                                    strokeWidth={1.5}
                                    color={button.iconColor || colors.text}
                                />
                            </View>

                            <View style={sts.textContainer}>
                                <Text variant="bodyBold">{button.label}</Text>
                                {button.description && (
                                    <Text
                                        variant="caption"
                                        style={{ marginTop: 2, color: colors.textSecondary }}
                                    >
                                        {button.description}
                                    </Text>
                                )}
                            </View>

                            <View style={sts.rightContainer}>
                                {button.toggle ? (
                                    <Switch
                                        value={button.value || false}
                                        onValueChange={
                                            button.onValueChange ||
                                            (() => {
                                                if (button.onPress && !button.disabled)
                                                    button.onPress();
                                            })
                                        }
                                        disabled={button.disabled}
                                    />
                                ) : (
                                    <ChevronRight size={18} color={colors.textTertiary} />
                                )}
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        borderRadius: 12,
        borderWidth: 1,
        width: '100%',
        overflow: 'hidden',
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    iconContainer: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
});
