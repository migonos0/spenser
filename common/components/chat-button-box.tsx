import {FC} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

type ChatButtonBoxProps = {
    onSendButtonPress?: () => void;
    value?: string;
    onChangeText?: (newText: string) => void;
    sendButtonLabel?: string;
};

export const ChatButtonBox: FC<ChatButtonBoxProps> = ({
    onSendButtonPress: onSendButtonClick,
    onChangeText,
    value,
    sendButtonLabel = 'Send',
}) => {
    return (
        <View className="flex-row items-center justify-between gap-x-2">
            {/* Chatbox */}
            <View className="flex-1 flex justify-center items-center">
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    className="w-full"
                    mode="outlined"
                    multiline
                />
            </View>

            {/* Send button */}
            <View className="flex justify-center items-center">
                <Button
                    icon="send"
                    mode="contained"
                    onPress={onSendButtonClick}>
                    {sendButtonLabel}
                </Button>
            </View>
        </View>
    );
};
