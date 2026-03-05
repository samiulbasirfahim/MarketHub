import { createStackNavigator } from "@/utils/navigation.utils"
import { ForgotPasswordStackParamList } from "../types";

const Stack = createStackNavigator<ForgotPasswordStackParamList>();


export default function ForgetPasswordNavigator() {
    return <Stack.Navigator>
        <Stack.Screen name="EmailScreen" component={require("@/screens/auth/forgot-password/emailScreen").default} />
        <Stack.Screen name="VerifiyOtp" component={require("@/screens/auth/forgot-password/verifyOtp").default} />
        <Stack.Screen name="SetPassword" component={require("@/screens/auth/forgot-password/setPassword").default} />

    </Stack.Navigator>

}
