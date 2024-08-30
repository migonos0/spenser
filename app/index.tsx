import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {DepsProvider} from '@/providers/deps-provider';
import {MigrationsProvider} from '@/providers/migrations-provider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PaperProvider} from '@/providers/paper-provider';
import {Text} from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
          <PaperProvider>
            <Text>Hello World!</Text>
          </PaperProvider>
        </QueryClientProvider>
      </DepsProvider>
    </MigrationsProvider>
  );
}
