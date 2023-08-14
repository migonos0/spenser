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
  findTags,
  getCreatableMessageFromString,
} from '../../utilities/message-pattern-finders';
import {LOCALE} from '../../constants/locale';
import {useTags} from '../../state/tag.state';
import {useLooseNavigation} from '../../hooks/use-loose-navigation';
import {STACK_NAVIGATOR_SCREEN_NAMES} from '../../constants/stack-navigator-screen-names';
import {Tag} from '../../entities/tag';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {increaseOrDecreaseMessageAmountSummatory} =
    useMessageAmountSummatory();
  const {messages: messagesWithTags} = useMessages();
  const {tags} = useTags();
  const {createMessageTrigger} = useCreateMessage();
  const {deleteMessageTrigger} = useDeleteMessage();
  const {navigate} = useLooseNavigation();

  const onSendButtonPress = (message: string) => {
    const tagNames = findTags(message);
    const creatableMessage = getCreatableMessageFromString(message, tagNames);

    const alreadyCreatedTags = tags?.filter(tag =>
      tagNames?.includes(tag.name),
    );
    const newTags = tagNames
      ?.filter(tagName => !tags?.map(tag => tag.name).includes(tagName))
      .map(tagName => new Tag(tagName));

    createMessageTrigger({
      ...creatableMessage,
      tags: [...(alreadyCreatedTags ?? []), ...(newTags ?? [])],
    });

    increaseOrDecreaseMessageAmountSummatory(creatableMessage.amount);
  };

  const getOnDeletePressHandler = (message: MessageWithTags) => () => {
    // increaseOrDecreaseMessageAmountSummatory(message.amount * -1);
    // deleteMessageWithTagsTrigger({
    //   messageId: message.id,
    //   tags: message.tags,
    // });
  };

  return (
    <ScreenLayout footer={<ChatBox onSendButtonPress={onSendButtonPress} />}>
      <FlatList
        inverted
        className="px-4"
        data={messagesWithTags}
        keyExtractor={(_, index) => index.toString()}
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
                  tagId: tag.id ?? -1,
                });
              },
            }))}
          />
        )}
      />
    </ScreenLayout>
  );
};
