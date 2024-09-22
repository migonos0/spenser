import {ChatButtonBox} from '@/common/components/chat-button-box';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

export default function Index() {
  return (
    <View>
      <Text className="bg-red-400">Hello World!</Text>
      <ChatButtonBox />
    </View>
  );
}
