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
import {LOCALE} from '../../constants/locale';
import {useCreateTags, useTags} from '../../state/tag.state';
import {MessageWithTags} from '../../schemas/message.schema';
import {useLooseNavigation} from '../../hooks/use-loose-navigation';
import {STACK_NAVIGATOR_SCREEN_NAMES} from '../../constants/stack-navigator-screen-names';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {increaseOrDecreaseMessageAmountSummatory} =
    useMessageAmountSummatory();
  const {messagesWithTags} = useMessagesWithTags();
  const {tags} = useTags();
  const {createTagsTrigger} = useCreateTags();
  const {createMessageWithTagsTrigger} = useCreateMessageWithTags();
  const {deleteMessageWithTagsTrigger} = useDeleteMessageWithTags();
  const {navigate} = useLooseNavigation();

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
    <ScreenLayout footer={<ChatBox onSendButtonPress={onSendButtonPress} />}>
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
            tags={message.tags.map(tag => ({
              label: tag.name,
              onPress: () => {
                navigate(STACK_NAVIGATOR_SCREEN_NAMES.MESSAGES_BY_TAG_ID, {
                  tagId: tag.id,
                });
              },
            }))}
          />
        )}
      />
    </ScreenLayout>
  );
};
