import {FC} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

type ChatButtonBoxProps = {
  onSendButtonPress?: () => void;
  value?: string;
  onChangeText?: (newText: string) => void;
};

export const ChatButtonBox: FC<ChatButtonBoxProps> = ({
  onSendButtonPress: onSendButtonClick,
  onChangeText,
  value,
}) => {
  return (
    <View className="flex-row items-center justify-between gap-x-2">
      {/* Chatbox */}
      <View className="flex-1 flex justify-center items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className="w-full"
          multiline
          mode="outlined"
          numberOfLines={2}
        />
      </View>

      {/* Send button */}
      <View className="flex justify-center items-center">
        <Button icon="send" mode="contained" onPress={onSendButtonClick}>
          Enviar
        </Button>
      </View>
    </View>
  );
};
