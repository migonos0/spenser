import {ScreenLayout} from '../layouts/screen.layout';
import {useAppTheme} from '../../hooks/use-app-theme';
import {
  useMessageAmountSummatory,
  useMessages,
  useCreateMessage,
  useDeleteMessage,
} from '../../state/message.state';
import {ChatBox} from '../components/chat-box';
import {FlatList} from 'react-native';
import {MessageCard} from '../components/message-card';
import {
  cleanMessageDescription,
  findAmount,
  findTags,
  validateExpense,
} from '../../utilities/message-pattern-finders';
import {DEVELOPER_MENU_ITEMS} from '../../constants/menu-items';
import {NODE_ENV} from '../../constants/environment';
import {LOCALE} from '../../constants/locale';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {messages} = useMessages();
  const {trigger: triggerMessageCreation} = useCreateMessage();
  const {messageAmountSummatory, updateWithValue} = useMessageAmountSummatory();
  const {trigger: triggerMessageDeletion} = useDeleteMessage();

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

    triggerMessageCreation({
      amount,
      description,
      isExpense,
    });
    updateWithValue(amount);
  };

  return (
    <ScreenLayout
      appbar={{
        avatarBackgroundColor: colors.primaryContainer,
        foregroundColor: colors.inverseOnSurface,
        backgroundColor: colors.primary,
        developerMenuItems:
          NODE_ENV === 'development' ? DEVELOPER_MENU_ITEMS : undefined,
        amountSummatory: messageAmountSummatory,
      }}
      footer={<ChatBox onSendButtonPress={onSendButtonPress} />}
      colors={colors}>
      <FlatList
        inverted
        className="px-4"
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item: message}) => (
          <MessageCard
            longPressDialogItems={[
              {
                title: LOCALE.common.delete,
                iconName: 'delete',
                onPress: () => {
                  triggerMessageDeletion(message.id);
                  updateWithValue(message.amount * -1);
                },
              },
            ]}
            twClass="m-2"
            backgroundColor={
              message.isExpense
                ? colors.tertiaryContainer
                : colors.surfaceVariant
            }
            cardTitle={
              (!message.isExpense ? '+' : '') + message.amount.toString()
            }
            body={message.description}
          />
        )}
      />
    </ScreenLayout>
  );
};
