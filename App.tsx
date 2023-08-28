import {NavigationContainer} from '@react-navigation/native';
import {DataSourceProvider} from './src/app/providers/data-source.provider';
import {ReactNativePaperProvider} from './src/app/providers/react-native-paper.provider';
import {SnackbarProvider} from './src/app/providers/snackbar.provider';
import {Navigator} from './src/app/navigators';
import {AppbarProvider} from './src/app/providers/appbar.provider';

function App(): JSX.Element {
  return (
    <DataSourceProvider>
      <ReactNativePaperProvider>
        <AppbarProvider />
        <SnackbarProvider>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </SnackbarProvider>
      </ReactNativePaperProvider>
    </DataSourceProvider>
  );
}

export default App;
