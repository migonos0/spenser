import {FC, ReactNode, useEffect} from 'react';
import {DepsProvider} from './providers/deps-provider';
import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {PaperProvider} from 'react-native-paper';
import {MigrationsProvider} from './providers/migrations-provider';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import './i18n';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError(error) {
            console.error(error);
        },
    }),
    mutationCache: new MutationCache({
        onError(error) {
            console.error(error);
        },
    }),
});

type AppProps = {
    children?: ReactNode;
};
export const App: FC<AppProps> = ({children}) => {
    const [loaded] = useFonts({
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <MigrationsProvider>
            <DepsProvider>
                <QueryClientProvider client={queryClient}>
                    <PaperProvider>{children}</PaperProvider>
                </QueryClientProvider>
            </DepsProvider>
        </MigrationsProvider>
    );
};
