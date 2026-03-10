import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type FAQItem = {
    id: string;
    title: string;
    content: string;
};

type Props = {
    data: FAQItem[];
};

const FAQAccordion = ({ data }: Props) => {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <View style={styles.groupContainer}>
            {data.map((item, index) => (
                <React.Fragment key={item.id}>
                    <AccordionItem
                        title={item.title}
                        isOpen={openId === item.id}
                        onPress={() =>
                            setOpenId(openId === item.id ? null : item.id)
                        }
                    >
                        {item.content}
                    </AccordionItem>
                    {index !== data.length - 1 && (
                        <View style={styles.separator} />
                    )}
                </React.Fragment>
            ))}
        </View>
    );
};

type ItemProps = {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onPress: () => void;
};

const AccordionItem = ({ title, children, isOpen, onPress }: ItemProps) => {
    const height = useSharedValue(0);
    const rotate = useSharedValue(0);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        height.value = withTiming(isOpen ? contentHeight : 0, {
            duration: 300,
        });
        rotate.value = withTiming(isOpen ? 90 : 0, {
            duration: 300,
        });
    }, [isOpen, contentHeight]);

    const contentStyle = useAnimatedStyle(() => ({
        height: height.value,
        opacity: withTiming(isOpen ? 1 : 0, { duration: 250 }),
    }));

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    return (
        <View>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    styles.header,
                    { opacity: pressed ? 0.7 : 1 },
                ]}
            >
                <Text style={styles.title}>{title}</Text>
                <Animated.View style={iconStyle}>
                    <ChevronRight
                        size={20}
                        color={colors.textSecondary}
                        strokeWidth={2}
                    />
                </Animated.View>
            </Pressable>

            <Animated.View style={[styles.content, contentStyle]}>
                <View
                    onLayout={(e) => {
                        const measuredHeight = e.nativeEvent.layout.height;
                        if (
                            measuredHeight > 0 &&
                            contentHeight !== measuredHeight
                        ) {
                            setContentHeight(measuredHeight);
                        }
                    }}
                    style={{ position: 'absolute', opacity: 0 }}
                >
                    <Text style={styles.text}>{children}</Text>
                </View>
                <Text style={styles.text}>{children}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    groupContainer: {
        width: '100%',
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surface,
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.text,
        flex: 1,
        marginRight: 8,
    },
    content: {
        paddingHorizontal: 16,
        overflow: 'hidden',
        backgroundColor: colors.surface,
    },
    text: {
        fontSize: 14,
        color: colors.textSecondary,
        paddingVertical: 12,
        lineHeight: 20,
    },
    separator: {
        height: 1,
        backgroundColor: colors.border,
    },
});

export default FAQAccordion;
