import {NavigationContainer} from '@react-navigation/native';
import {DataSourceProvider} from './src/app/providers/data-source.provider';
import {ReactNativePaperProvider} from './src/app/providers/react-native-paper.provider';
import {SnackbarProvider} from './src/app/providers/snackbar.provider';
import {StackNavigator} from './src/app/navigators/stack.navigator';

function App(): JSX.Element {
  return (
    <DataSourceProvider>
      <ReactNativePaperProvider>
        <SnackbarProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SnackbarProvider>
      </ReactNativePaperProvider>
    </DataSourceProvider>
  );
}

export default App;
