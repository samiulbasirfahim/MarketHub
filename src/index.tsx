import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queries';
import { RootNavigator } from './navigations';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <KeyboardProvider statusBarTranslucent>
                        <BottomSheetModalProvider>
                            <Host>
                                <RootNavigator />
                            </Host>
                        </BottomSheetModalProvider>
                    </KeyboardProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
