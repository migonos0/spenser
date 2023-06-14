import {Text} from 'react-native-paper';
import {ReactNativePaperProvider} from './src/app/providers/react-native-paper.provider';

function App(): JSX.Element {
  return (
    <ReactNativePaperProvider>
      <Text>Hi</Text>
    </ReactNativePaperProvider>
  );
}

export default App;
