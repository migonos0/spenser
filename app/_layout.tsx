import {App} from '@/App';
import {Slot} from 'expo-router';
import {View} from 'react-native';
import {Appbar, Surface} from 'react-native-paper';

export default function RootLayout() {
  return (
    <App>
      <View className="flex flex-col bg-red-400 w-screen h-screen">
        <Appbar.Header>
          <Appbar.Content title="Spencer" />
        </Appbar.Header>

        <Surface className="flex-1">
          <Slot />
        </Surface>
      </View>
    </App>
  );
}
