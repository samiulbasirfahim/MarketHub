import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeSubScreensStackParamList } from '../types';
import { defaultScreenOptions } from '../defaultOptions';

const Stack = createNativeStackNavigator<HomeSubScreensStackParamList>();

export default function HomeSubScreensNavigator() {
    return (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen
                name="AllCategories"
                component={require('@/screens/app/home/all-categories').default}
                options={{ title: 'All Categories' }}
            />
            <Stack.Screen
                name="AllPopularProducts"
                component={require('@/screens/app/home/all-popular-products').default}
                options={{ title: 'Popular Products' }}
            />
            <Stack.Screen
                name="BestDeals"
                component={require('@/screens/app/home/best-deals').default}
                options={{ title: 'Best Deals' }}
            />
            <Stack.Screen
                name="AllVendors"
                component={require('@/screens/app/home/all-vendors').default}
                options={{ title: 'All Vendors' }}
            />
            <Stack.Screen
                name="VendorDetails"
                component={require('@/screens/app/home/vendor-details').default}
                options={{ title: 'Vendor Details' }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={require('@/screens/app/home/product-details').default}
                options={{ title: 'Product Details' }}
            />
            <Stack.Screen
                name="PerCategoryProducts"
                component={require('@/screens/app/home/per-category-products').default}
                options={({ route }: any) => ({ title: route.params?.categoryName ?? 'Products' })}
            />
            <Stack.Screen
                name="Cart"
                component={require('@/screens/app/home/cart').default}
                options={{ title: 'Cart' }}
            />
        </Stack.Navigator>
    );
}
