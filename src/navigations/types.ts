import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    App: NavigatorScreenParams<AppStackParamList>;
    Others: NavigatorScreenParams<OthersStackParamList>;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: NavigatorScreenParams<RegisterStackParamList>;
    ForgotPassword: NavigatorScreenParams<ForgotPasswordStackParamList>;
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
