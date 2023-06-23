import {ReactNativePaperProvider} from './src/app/providers/react-native-paper.provider';
import {SQLiteProvider} from './src/app/providers/sqlite.provider';
import {ChatScreen} from './src/app/screens/chat.screen';

function App(): JSX.Element {
  return (
    <ReactNativePaperProvider>
      <SQLiteProvider>
        <ChatScreen />
      </SQLiteProvider>
    </ReactNativePaperProvider>
  );
}

export default App;
