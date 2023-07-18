import {ScreenLayout} from '../layouts/screen.layout';
import {useAppTheme} from '../../hooks/use-app-theme';
import {useMessages, useMutateMessages} from '../../state/message.state';
import {ChatBox} from '../components/chat-box';
import {FlatList} from 'react-native';
import {MessageCard} from '../components/message-card';
import {
  cleanMessageDescription,
  findAmount,
  findTags,
  validateExpense,
} from '../../utilities/message-pattern-finders';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {messages} = useMessages();
  const {trigger} = useMutateMessages();

  const onSendButtonPress = (message: string) => {
    const isExpense = validateExpense(message);
    const stringifiedAmount = findAmount(message);
    const tags = findTags(message);
    const description = cleanMessageDescription(
      message,
      isExpense,
      stringifiedAmount,
      tags,
    );
    const amount = Number(stringifiedAmount) * (isExpense ? -1 : 1);

    trigger({
      amount,
      description,
      isExpense,
    });
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
              message.isExpense
                ? colors.tertiaryContainer
                : colors.surfaceVariant
            }
            cardTitle={message.amount.toString()}
            body={message.description}
          />
        )}
      />
    </ScreenLayout>
  );
};
