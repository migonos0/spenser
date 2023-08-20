import {FlatList} from 'react-native';

import {LOCALE} from '../../constants/locale';
import {STACK_NAVIGATOR_SCREEN_NAMES} from '../../constants/stack-navigator-screen-names';
import {Message} from '../../entities/message';
import {Tag} from '../../entities/tag';
import {useAppTheme} from '../../hooks/use-app-theme';
import {useLooseNavigation} from '../../hooks/use-loose-navigation';
import {
  useCreateMessageByTracker,
  useDeleteMessageByTracker,
  useMessagesByTracker,
} from '../../state/message.state';
import {useCreateTags, useTags} from '../../state/tag.state';
import {
  findTags,
  getCreatableMessageFromString,
} from '../../utilities/message-pattern-finders';
import {ChatBox} from '../components/chat-box';
import {MessageCard} from '../components/message-card';
import {ScreenLayout} from '../layouts/screen.layout';
import {useLooseRoute} from '../../hooks/use-loose-route';
import {useTrackerById} from '../../state/tracker.state';

export const ChatScreen = () => {
  const {colors} = useAppTheme();
  const {tags} = useTags();
  const {params} = useLooseRoute();
  const {tracker} = useTrackerById(
    params?.trackerId ? +params.trackerId : undefined,
  );
  const {createMessageTrigger} = useCreateMessageByTracker(
    tracker ?? undefined,
  );
  const {deleteMessageTrigger} = useDeleteMessageByTracker(
    tracker ?? undefined,
  );
  const {navigate} = useLooseNavigation();
  const {createTagsTrigger} = useCreateTags();
  const {messages} = useMessagesByTracker(tracker ?? undefined);

  const onSendButtonPress = (message: string) => {
    if (!tracker) {
      return;
    }
    const tagNames = findTags(message);
    const alreadyCreatedTags = tags?.filter(tag =>
      tagNames?.includes(tag.name),
    );
    const creatableTags = tagNames
      ?.filter(tagName => !tags?.map(tag => tag.name).includes(tagName))
      .map(tagName => new Tag(tagName));
    createTagsTrigger(creatableTags ?? [], {
      onSuccess(createdTags) {
        const creatableMessage = getCreatableMessageFromString(
          message,
          tagNames,
        );
        createMessageTrigger(
          new Message(
            creatableMessage.isExpense,
            creatableMessage.amount,
            creatableMessage.description,
            tracker,
            [...(alreadyCreatedTags ?? []), ...(createdTags ?? [])],
          ),
        );
      },
    });
  };

  const getOnDeletePressHandler = (message: Message) => () =>
    deleteMessageTrigger(message.id);

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
                  trackerId: message.tracker?.id,
                });
              },
            }))}
          />
        )}
      />
    </ScreenLayout>
  );
};
