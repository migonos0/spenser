import {TextInputProps, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {LOCALE} from '../../constants/locale';
import {cn} from '../../utilities/cn';

interface ChatBoxProps {
  twClass?: string;
  onSendButtonPress?: () => void;
  avoidCleaningAfterSent?: boolean;
  value?: TextInputProps['value'];
  onChange?: TextInputProps['onChangeText'];
  onBlur?: TextInputProps['onBlur'];
}
export const ChatBox = ({twClass, ...props}: ChatBoxProps) => {
  return (
    <View className={cn('flex flex-row w-full px-5 py-3', twClass)}>
      <View className="flex-1 flex justify-center content-center pb-2 mr-2">
        <TextInput
          onBlur={props.onBlur}
          multiline
          value={props.value}
          onChangeText={props.onChange}
          mode="outlined"
        />
      </View>
      <View className="flex justify-center">
        <Button onPress={props.onSendButtonPress} icon="send" mode="contained">
          {LOCALE.common.send}
        </Button>
      </View>
    </View>
  );
};
