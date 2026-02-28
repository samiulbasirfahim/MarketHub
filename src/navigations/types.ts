export type RootStackParamList = {
    Auth: undefined;
    App: undefined;
    Others: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    Forget_Password: undefined;
};

export type RegisterStackParamList = {
    Login: undefined;
    Verfiy_Otp: { email: string };
};

export type ResetPasswordStackParamList = {
    Email_Screen: undefined;
    Verfiy_Otp: { email: string };
    Set_Password: { email: string; otp: string };
};

export type AppStackParamList = {
    AppTab: undefined;
    OthersStack: undefined;
};

export type AppTabParamList = {};

export type AppOthersStackParamList = {};

export type OthersStackParamList = {
    Terms_Condition: undefined;
    Privacy_Policy: undefined;
    Help_Support: undefined;
};
