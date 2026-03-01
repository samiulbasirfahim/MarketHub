import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queries';
import { RootNavigator } from './navigations';

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RootNavigator />
        </QueryClientProvider>
    );
}
