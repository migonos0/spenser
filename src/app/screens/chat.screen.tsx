import {ScreenLayout} from '../layouts/screen.layout';
import {useAppTheme} from '../../hooks/use-app-theme';
import {
  useMessageAmountSummatory,
  useCreateMessage,
  useDeleteMessage,
  useMessagesWithTags,
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
import {useCreateTags, useTags} from '../../state/tag.state';
import {useCreateMessagesTags} from '../../state/message-tag.state';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {trigger: triggerMessageCreation} = useCreateMessage();
  const {messageAmountSummatory, increaseOrDecreaseMessageAmountSummatory} =
    useMessageAmountSummatory();
  const {trigger: triggerMessageDeletion} = useDeleteMessage();
  const {messagesWithTags, addMessageWithTags} = useMessagesWithTags();
  const {tags} = useTags();
  const {createMessagesTagsTrigger} = useCreateMessagesTags();
  const {createTagsTrigger} = useCreateTags();

  const onSendButtonPress = (message: string) => {
    const isExpense = validateExpense(message);
    const stringifiedAmount = findAmount(message);
    const tagNames = findTags(message);
    const description = cleanMessageDescription(
      message,
      isExpense,
      stringifiedAmount,
      tagNames,
    );
    const amount = Number(stringifiedAmount) * (isExpense ? -1 : 1);

    triggerMessageCreation(
      {
        amount,
        description,
        isExpense,
      },
      {
        onSuccess(createdMessage) {
          if (!createdMessage) {
            return;
          }
          const alreadyCreatedTags = tags?.filter(tag =>
            tagNames?.includes(tag.name),
          );
          createMessagesTagsTrigger(
            (alreadyCreatedTags ?? []).map(tag => ({
              messageId: createdMessage.id,
              tagId: tag.id,
            })),
          );
          const newTagNames = tagNames?.filter(
            tagName => !tags?.map(tag => tag.name).includes(tagName),
          );
          createTagsTrigger(newTagNames ?? [], {
            onSuccess(createdTags) {
              createMessagesTagsTrigger(
                (createdTags ?? []).map(tag => ({
                  messageId: createdMessage.id,
                  tagId: tag.id,
                })),
              );
              if (!createdMessage || !createdTags || !alreadyCreatedTags) {
                return;
              }
              addMessageWithTags(createdMessage, [
                ...alreadyCreatedTags,
                ...createdTags,
              ]);
            },
          });
        },
      },
    );
    increaseOrDecreaseMessageAmountSummatory(amount);
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
        data={messagesWithTags}
        keyExtractor={item => item.id.toString()}
        renderItem={({item: message}) => (
          <MessageCard
            longPressDialogItems={[
              {
                title: LOCALE.common.delete,
                iconName: 'delete',
                onPress: () => {
                  triggerMessageDeletion(message.id);
                  increaseOrDecreaseMessageAmountSummatory(message.amount * -1);
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
            tags={message.tags.map(tag => ({label: tag.name}))}
          />
        )}
      />
    </ScreenLayout>
  );
};
