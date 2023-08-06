import {NavigationContainer} from '@react-navigation/native';
import {ReactNativePaperProvider} from './src/app/providers/react-native-paper.provider';
import {SnackbarProvider} from './src/app/providers/snackbar.provider';
import {SQLiteProvider} from './src/app/providers/sqlite.provider';
import {StackNavigator} from './src/app/navigators/stack.navigator';
import 'reflect-metadata';

function App(): JSX.Element {
  return (
    <SQLiteProvider>
      <ReactNativePaperProvider>
        <SnackbarProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SnackbarProvider>
      </ReactNativePaperProvider>
    </SQLiteProvider>
  );
}

export default App;
