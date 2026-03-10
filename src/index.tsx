import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queries';
import { RootNavigator } from './navigations';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Host } from 'react-native-portalize';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <KeyboardProvider statusBarTranslucent>
                    <Host>
                        <RootNavigator />
                    </Host>
                </KeyboardProvider>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}
