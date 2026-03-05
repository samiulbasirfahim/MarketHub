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
};

export type AppOthersStackParamList = {};

export type OthersStackParamList = {
    TermsCondition: undefined;
    PrivacyPolicy: undefined;
    HelpSupport: undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackParamList>;
