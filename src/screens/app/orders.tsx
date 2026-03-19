import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { colors } from '@/constants/colors';
import Text from '@/components/ui/Text';
import OrderList from './order/order-list';

const AllRoute = () => <OrderList status="All" />;
const DeliveredRoute = () => <OrderList status="Delivered" />;
const ReturnRoute = () => <OrderList status="Return" />;
const CancelledRoute = () => <OrderList status="Cancelled" />;

const renderScene = SceneMap({
    all: AllRoute,
    delivered: DeliveredRoute,
    return: ReturnRoute,
    cancelled: CancelledRoute,
});

const routes = [
    { key: 'all', title: 'All' },
    { key: 'delivered', title: 'Delivered' },
    { key: 'return', title: 'Return' },
    { key: 'cancelled', title: 'Cancelled' },
];

export default function OrdersScreen() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    return (
        <View style={styles.screen}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={() => (
                    <View style={styles.tabBarOuter}>
                        <View style={styles.tabBar}>
                            {routes.map((route, i) => (
                                <Pressable
                                    key={route.key}
                                    style={[
                                        styles.tabButton,
                                        index === i && styles.tabButtonActive,
                                    ]}
                                    onPress={() => setIndex(i)}
                                >
                                    <Text
                                        variant="label"
                                        weight="semibold"
                                        style={[
                                            styles.tabLabel,
                                            index === i && styles.tabLabelActive,
                                        ]}
                                    >
                                        {route.title}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                )}
                swipeEnabled={true}
                animationEnabled={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    tabBarOuterContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
    },
    tabButtonWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        position: 'relative',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 3,
        backgroundColor: colors.primary,
    },

    tabBarOuter: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.background,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F5',
        borderRadius: 14,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 10,
    },
    tabButtonActive: {
        backgroundColor: colors.primary + '1A', // ~10% opacity tint
    },
    tabLabel: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    tabLabelActive: {
        color: colors.primary,
    },
});
