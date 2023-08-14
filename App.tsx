import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/app/navigators/stack.navigator';
import {DataSourceProvider} from './src/app/providers/data-source.provider';
import {ReactNativePaperProvider} from './src/app/providers/react-native-paper.provider';
import {SnackbarProvider} from './src/app/providers/snackbar.provider';

export default function App() {
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
