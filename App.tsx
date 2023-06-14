import {ReactNativePaperProvider} from './src/app/providers/react-native-paper.provider';
import {ChatScreen} from './src/app/screens/chat.screen';

function App(): JSX.Element {
  return (
    <ReactNativePaperProvider>
      <ChatScreen />
    </ReactNativePaperProvider>
  );
}

export default App;
