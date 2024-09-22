import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

export const ChatButtonBox = () => {
  return (
    <View className="bg-blue-400 flex-row items-center">
      <View className="flex-1 flex justify-center content-center pb-2 mr-2">
        <TextInput multiline mode="outlined" />
      </View>
      <View className="flex justify-center">
        <Button icon="send" mode="contained">
          Enviar
        </Button>
      </View>
    </View>
  );
};
