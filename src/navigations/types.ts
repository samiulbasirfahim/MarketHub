import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    App: NavigatorScreenParams<AppStackParamList>;
    Others: NavigatorScreenParams<OthersStackParamList>;
};

export type AuthStackParamList = {
    Login: undefined;
    OnboardingScreens: NavigatorScreenParams<OnboardingScreensStackParamList>;
    Register: NavigatorScreenParams<RegisterStackParamList>;
    ForgotPassword: NavigatorScreenParams<ForgotPasswordStackParamList>;
};

export type OnboardingScreensStackParamList = {
    OnboardingScreen1: undefined;
    OnboardingScreen2: undefined;
    OnboardingScreen3: undefined;
};

export type RegisterStackParamList = {
    Register: undefined;
    VerifiyOtp: { email: string };
};

export type ForgotPasswordStackParamList = {
    EmailScreen: undefined;
    VerifiyOtp: { email: string };
    SetPassword: { email: string; otp: string };
};

export type AppStackParamList = {
    AppTab: NavigatorScreenParams<AppTabParamList>;
    OthersStack: NavigatorScreenParams<AppOthersStackParamList>;
};

export type AppTabParamList = {
    HomeTab: undefined;
    SettingsTab: undefined;
    SearchTab: undefined;
    OrderTab: undefined;
};

export type AppOthersStackParamList = {
    NotificationScreen: undefined;
    HomeSubScreens: NavigatorScreenParams<HomeSubScreensStackParamList>;
    SettingsSubScreens: NavigatorScreenParams<SettingsSubScreensStackParamList>;
    OrderDetails: { orderId: string };
};

export type HomeSubScreensStackParamList = {
    AllCategories: undefined;
    AllPopularProducts: undefined;
    BestDeals: undefined;
    AllVendors: undefined;
    VendorDetails: { vendorId: string };
    ProductDetails: { productId: string };
    PerCategoryProducts: { categoryId: string; categoryName: string };
    Cart: undefined;
};

export type SettingsSubScreensStackParamList = {
    Profile: undefined;
    SavedAddresses: undefined;
    MyWishList: undefined;
    MyReviews: undefined;
};

export type OthersStackParamList = {
    Notifications: undefined;
    TermsCondition: undefined;
    PrivacyPolicy: undefined;
    HelpSupport: undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackParamList>;
