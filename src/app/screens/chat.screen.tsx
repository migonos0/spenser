import {ScreenLayout} from '../layouts/screen.layout';
import {useAppTheme} from '../../hooks/use-app-theme';
import {
  useMessageAmountSummatory,
  useMessagesWithTags,
  useCreateMessageWithTags,
  useDeleteMessageWithTags,
} from '../../state/message.state';
import {ChatBox} from '../components/chat-box';
import {FlatList} from 'react-native';
import {MessageCard} from '../components/message-card';
import {
  findTags,
  getCreatableMessageFromString,
} from '../../utilities/message-pattern-finders';
import {DEVELOPER_MENU_ITEMS} from '../../constants/menu-items';
import {NODE_ENV} from '../../constants/environment';
import {LOCALE} from '../../constants/locale';
import {useCreateTags, useTags} from '../../state/tag.state';
import {MessageWithTags} from '../../schemas/message.schema';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {messageAmountSummatory, increaseOrDecreaseMessageAmountSummatory} =
    useMessageAmountSummatory();
  const {messagesWithTags} = useMessagesWithTags();
  const {tags} = useTags();
  const {createTagsTrigger} = useCreateTags();
  const {createMessageWithTagsTrigger} = useCreateMessageWithTags();
  const {deleteMessageWithTagsTrigger} = useDeleteMessageWithTags();

  const onSendButtonPress = (message: string) => {
    const tagNames = findTags(message);
    const creatableMessage = getCreatableMessageFromString(message, tagNames);

    const newTagNames = tagNames?.filter(
      tagName => !tags?.map(tag => tag.name).includes(tagName),
    );
    createTagsTrigger(newTagNames ?? [], {
      onSuccess(createdTags) {
        const alreadyCreatedTags = tags?.filter(tag =>
          tagNames?.includes(tag.name),
        );
        createMessageWithTagsTrigger({
          message: creatableMessage,
          tags: [...(alreadyCreatedTags ?? []), ...(createdTags ?? [])],
        });
      },
    });
    increaseOrDecreaseMessageAmountSummatory(creatableMessage.amount);
  };

  const getOnDeletePressHandler = (message: MessageWithTags) => () => {
    increaseOrDecreaseMessageAmountSummatory(message.amount * -1);
    deleteMessageWithTagsTrigger({
      messageId: message.id,
      tags: message.tags,
    });
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
                onPress: getOnDeletePressHandler(message),
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
