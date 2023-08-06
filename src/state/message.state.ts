import {useCallback} from 'react';
import {MESSAGES_TABLE_NAME, TAGS_TABLE_NAME} from '../constants/db';
import {useSWRImmutableSQLite, useSWRSQLiteMutation} from '../hooks/use-swr';
import {
  createMessageWithTags,
  deleteMessageWithTagsById,
  findAllMessagesByTagId,
  findAllMessagesWithTags,
  findMessageAmountSummatory,
} from '../services/message.service';
import {
  MESSAGES_WITH_TAGS_KEY,
  MESSAGE_AMOUNT_SUMMATORY_KEY,
} from '../constants/swr-keys';
import {Message, MessageWithTags} from '../schemas/message.schema';
import {useSWRConfig} from 'swr';
import {Tag} from '../schemas/tag.schema';

export const useMessageAmountSummatory = () => {
  const {data, mutate} = useSWRImmutableSQLite(
    MESSAGE_AMOUNT_SUMMATORY_KEY,
    findMessageAmountSummatory,
  );

  const increaseOrDecreaseMessageAmountSummatory = useCallback(
    (number: number) => {
      mutate(state => (state ?? 0) + number, {revalidate: false});
    },
    [mutate],
  );

  return {
    messageAmountSummatory: data,
    increaseOrDecreaseMessageAmountSummatory,
  };
};

export const useMessagesWithTags = (params?: {ascendant?: boolean}) => {
  const fetcher = findAllMessagesWithTags({ascendant: params?.ascendant});

  const {data} = useSWRImmutableSQLite(MESSAGES_WITH_TAGS_KEY, fetcher);

  return {messagesWithTags: data};
};

export const useCreateMessageWithTags = (params?: {ascendant?: boolean}) => {
  const {mutate} = useSWRConfig();
  const {trigger} = useSWRSQLiteMutation(
    MESSAGES_WITH_TAGS_KEY,
    createMessageWithTags,
    (result, currentData: MessageWithTags[] | undefined) => {
      if (!result) {
        return currentData;
      }
      /**
       * Adding created message to MessagesByTag state
       */
      for (const tag of result.tags) {
        mutate(
          [MESSAGES_TABLE_NAME, tag.id],
          (messages: Message[] | undefined) => {
            return [...(messages ?? []), ...[{...result, tags: undefined}]];
          },
        );
      }

      return params?.ascendant
        ? [...(currentData ?? []), ...[result]]
        : [...[result], ...(currentData ?? [])];
    },
  );

  return {createMessageWithTagsTrigger: trigger};
};

export const useDeleteMessageWithTags = () => {
  const {mutate} = useSWRConfig();

  const {trigger} = useSWRSQLiteMutation(
    MESSAGES_WITH_TAGS_KEY,
    deleteMessageWithTagsById,
    (result, currentData: MessageWithTags[] | undefined) => {
      if (!result) {
        return currentData;
      }

      /**
       * Mutating tags
       */
      mutate(TAGS_TABLE_NAME, (tags: Tag[] | undefined) =>
        tags?.filter(tag => !result.deletedTagIds.includes(tag.id)),
      );

      return currentData?.filter(
        messageWithTags => messageWithTags.id !== result.deletedMessageId,
      );
    },
  );

  return {deleteMessageWithTagsTrigger: trigger};
};

export const useMessagesByTagId = (tagId?: Tag['id']) => {
  const key = tagId ? [MESSAGES_TABLE_NAME, tagId] : undefined;
  const fetcher = tagId ? findAllMessagesByTagId(tagId) : () => undefined;

  const {data} = useSWRImmutableSQLite(key, fetcher);

  return {messages: data};
};
