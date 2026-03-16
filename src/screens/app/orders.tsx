import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions,
    Pressable,
} from 'react-native';
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
                    <View style={styles.tabBarOuterContainer}>
                        <View style={styles.tabBar}>
                            {routes.map((route, i) => (
                                <Pressable
                                    key={route.key}
                                    style={styles.tabButtonWrap}
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
                                    {index === i && (
                                        <View style={styles.tabIndicator} />
                                    )}
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
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    tabButtonWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        position: 'relative',
    },
    tabLabel: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    tabLabelActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 3,
        backgroundColor: colors.primary,
    },
});
