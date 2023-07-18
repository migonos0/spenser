import {ReactNativePaperProvider} from './src/app/providers/react-native-paper.provider';
import {SnackbarProvider} from './src/app/providers/snackbar.provider';
import {SQLiteProvider} from './src/app/providers/sqlite.provider';
import {ChatScreen} from './src/app/screens/chat.screen';

function App(): JSX.Element {
  return (
    <SQLiteProvider>
      <ReactNativePaperProvider>
        <SnackbarProvider>
          <ChatScreen />
        </SnackbarProvider>
      </ReactNativePaperProvider>
    </SQLiteProvider>
  );
}

export default App;
