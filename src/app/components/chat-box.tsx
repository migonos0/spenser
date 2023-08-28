import {useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {LOCALE} from '../../constants/locale';
import {cn} from '../../utilities/cn';

interface ChatBoxProps {
  twClass?: string;
  onSendButtonPress?: (t: string) => void;
  avoidCleaningAfterSent?: boolean;
}
export const ChatBox = ({twClass, ...props}: ChatBoxProps) => {
  const [text, setText] = useState<string>('');

  return (
    <View className={cn('flex flex-row w-full px-5 py-3', twClass)}>
      <View className="flex-1 flex justify-center content-center pb-2 mr-2">
        <TextInput
          multiline
          value={text}
          onChangeText={t => setText(t)}
          mode="outlined"
        />
      </View>
      <View className="flex justify-center">
        <Button
          onPress={() => {
            props.onSendButtonPress && props.onSendButtonPress(text);
            !props.avoidCleaningAfterSent && setText('');
          }}
          icon="send"
          mode="contained">
          {LOCALE.common.send}
        </Button>
      </View>
    </View>
  );
};
