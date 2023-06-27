import {ScreenLayout} from '../layouts/screen.layout';
import {useAppTheme} from '../../hooks/use-app-theme';
import {useMessages, useMutateMessages} from '../../state/message.state';
import {ChatBox} from '../components/chat-box';
import {FlatList} from 'react-native';
import {MessageCard} from '../components/message-card';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {messages} = useMessages();
  const {trigger} = useMutateMessages();

  const onSendButtonPress = (text: string) => {
    trigger({amount: 1, description: text, isIncome: true});
  };

  return (
    <ScreenLayout
      footer={<ChatBox onSendButtonPress={onSendButtonPress} />}
      colors={colors}>
      <FlatList
        inverted
        className="px-4"
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item: message}) => (
          <MessageCard
            twClass="m-2"
            backgroundColor={
              message.isIncome
                ? colors.surfaceVariant
                : colors.tertiaryContainer
            }
            cardTitle={message.amount.toString()}
            body={message.description}
          />
        )}
      />
    </ScreenLayout>
  );
};
