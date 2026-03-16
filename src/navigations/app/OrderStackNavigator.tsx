import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderStackParamList } from '../types';
import { defaultScreenOptions } from '../defaultOptions';

const Stack = createNativeStackNavigator<OrderStackParamList>();

export default function OrderStackNavigator() {
    return (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen
                name="OrdersTab"
                component={require('@/screens/app/orders').default}
                options={{ title: 'My Orders', headerShown: true }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={require('@/screens/app/order-details').default}
                options={{ title: 'Order Details' }}
            />
        </Stack.Navigator>
    );
}
