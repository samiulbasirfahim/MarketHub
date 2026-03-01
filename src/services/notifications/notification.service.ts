// import { Platform } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import { apiClient } from '../api/client';
//
// export const notificationService = {
//     // ─── Request permission ───────────────────────────────────────
//     requestPermission: async (): Promise<boolean> => {
//         if (Platform.OS === 'ios') {
//             const status = await messaging().requestPermission();
//             return (
//                 status === messaging.AuthorizationStatus.AUTHORIZED ||
//                 status === messaging.AuthorizationStatus.PROVISIONAL
//             );
//         }
//         return true; // Android grants by default
//     },
//
//     // ─── Get FCM push token ───────────────────────────────────────
//     getPushToken: async (): Promise<string | null> => {
//         try {
//             const token = await messaging().getToken();
//             return token;
//         } catch {
//             return null;
//         }
//     },
//
//     // ─── Register token with backend ─────────────────────────────
//     registerPushToken: async (): Promise<void> => {
//         const token = await notificationService.getPushToken();
//         if (!token) return;
//
//         await apiClient.post('/users/me/push-token', {
//             token,
//             platform: Platform.OS,
//         });
//     },
//
//     // ─── Remove token on logout ───────────────────────────────────
//     unregisterPushToken: async (): Promise<void> => {
//         const token = await notificationService.getPushToken();
//         if (!token) return;
//
//         await apiClient.delete('/users/me/push-token', {
//             data: { token },
//         });
//     },
// };
