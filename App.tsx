import {FC, ReactNode} from 'react';
import {DepsProvider} from './providers/deps-provider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PaperProvider} from 'react-native-paper';
import {MigrationsProvider} from './providers/migrations-provider';

const queryClient = new QueryClient();

type AppProps = {
  children?: ReactNode;
};
export const App: FC<AppProps> = ({children}) => {
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
