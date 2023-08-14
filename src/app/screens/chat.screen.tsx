import {FlatList} from 'react-native';

import {LOCALE} from '../../constants/locale';
import {STACK_NAVIGATOR_SCREEN_NAMES} from '../../constants/stack-navigator-screen-names';
import {Message} from '../../entities/message';
import {Tag} from '../../entities/tag';
import {useAppTheme} from '../../hooks/use-app-theme';
import {useLooseNavigation} from '../../hooks/use-loose-navigation';
import {
  useMessageAmountSummatory,
  useMessages,
  useCreateMessage,
  useDeleteMessage,
} from '../../state/message.state';
import {useTags} from '../../state/tag.state';
import {
  findTags,
  getCreatableMessageFromString,
} from '../../utilities/message-pattern-finders';
import {ChatBox} from '../components/chat-box';
import {MessageCard} from '../components/message-card';
import {ScreenLayout} from '../layouts/screen.layout';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {increaseOrDecreaseMessageAmountSummatory} =
    useMessageAmountSummatory();
  const {messages} = useMessages();
  const {tags} = useTags();
  const {createMessageTrigger} = useCreateMessage();
  const {deleteMessageTrigger} = useDeleteMessage();
  const {navigate} = useLooseNavigation();

  const onSendButtonPress = (message: string) => {
    const tagNames = findTags(message);
    const creatableMessage = getCreatableMessageFromString(message, tagNames);

    const alreadyCreatedTags = tags?.filter(
      tag => tagNames?.includes(tag.name),
    );
    const newTags = tagNames
      ?.filter(tagName => !tags?.map(tag => tag.name).includes(tagName))
      .map(tagName => new Tag(tagName));

    createMessageTrigger(
      new Message(
        creatableMessage.isExpense,
        creatableMessage.amount,
        creatableMessage.description,
        [...(alreadyCreatedTags ?? []), ...(newTags ?? [])],
      ),
    );

    increaseOrDecreaseMessageAmountSummatory(creatableMessage.amount);
  };

  const getOnDeletePressHandler = (message: Message) => () => {
    increaseOrDecreaseMessageAmountSummatory(message.amount * -1);
    deleteMessageTrigger(message.id);
  };

  return (
    <ScreenLayout footer={<ChatBox onSendButtonPress={onSendButtonPress} />}>
      <FlatList
        inverted
        className="px-4"
        data={messages}
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
            tags={message.tags?.map(tag => ({
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
