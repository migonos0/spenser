import classNames from 'classnames';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

interface ChatBoxProps {
  twClass?: string;
}
export const ChatBox = (props: ChatBoxProps) => {
  return (
    <View
      className={classNames('flex flex-row w-full px-5 py-3', props.twClass)}>
      {/* <TextInput className="flex-1 mr-2 bg-blue-500" mode="outlined" /> */}
      <View className="flex-1 flex justify-center content-center pb-2 mr-2">
        <TextInput mode="outlined" />
      </View>
      <View className="flex justify-center">
        <Button icon={'send'} mode="contained">
          Send
        </Button>
      </View>
    </View>
  );
};
