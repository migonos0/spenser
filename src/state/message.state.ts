import {useCallback} from 'react';
import {TAGS_TABLE_NAME} from '../constants/db';
import {useSWRSQLite, useSWRSQLiteMutation} from '../hooks/use-swr';
import {
  createMessageWithTags,
  deleteMessageWithTagsById,
  findAllMessagesWithTags,
  findMessageAmountSummatory,
} from '../services/message.service';
import {
  MESSAGES_WITH_TAGS_KEY,
  MESSAGE_AMOUNT_SUMMATORY_KEY,
} from '../constants/swr-keys';
import {MessageWithTags} from '../schemas/message.schema';
import {useSWRConfig} from 'swr';
import {Tag} from '../schemas/tag.schema';

export const useMessageAmountSummatory = () => {
  const {data, mutate} = useSWRSQLite(
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

  const {data} = useSWRSQLite(MESSAGES_WITH_TAGS_KEY, fetcher);

  return {messagesWithTags: data};
};

export const useCreateMessageWithTags = (params?: {ascendant?: boolean}) => {
  const {trigger} = useSWRSQLiteMutation(
    MESSAGES_WITH_TAGS_KEY,
    createMessageWithTags,
    (result, currentData: MessageWithTags[] | undefined) => {
      if (!result) {
        return currentData;
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
