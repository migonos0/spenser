import {App} from '@/App';
import {Slot} from 'expo-router';
import {KeyboardAvoidingView} from 'react-native';
import {Appbar, Surface} from 'react-native-paper';

export default function RootLayout() {
  return (
    <App>
      <KeyboardAvoidingView className="flex flex-col bg-red-400 w-full h-full">
        <Appbar.Header>
          <Appbar.Content title="Spencer" />
        </Appbar.Header>

        <Surface className="flex-1">
          <Slot />
        </Surface>
      </KeyboardAvoidingView>
    </App>
  );
}
