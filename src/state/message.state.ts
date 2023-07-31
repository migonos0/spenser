import {useCallback} from 'react';
import {MESSAGES_TABLE_NAME} from '../constants/db';
import {useSWRSQLite, useSWRSQLiteMutation} from '../hooks/use-swr';
import {
  createMessage,
  deleteMessage,
  findAllMessages,
  findMessageAmountSummatory,
} from '../services/message.service';
import {Message} from '../schemas/message.schema';
import {Tag} from '../schemas/tag.schema';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {findAllMessagesTagsByMessageId} from '../services/message-tag.service';
import {findAllTags} from '../services/tag.service';
import {MESSAGES_WITH_TAGS_KEY} from '../constants/swr-keys';

export const useMessages = (params?: {ascendant?: boolean}) => {
  const fetcher = findAllMessages({ascendant: params?.ascendant});
  const {data, mutate} = useSWRSQLite(MESSAGES_TABLE_NAME, fetcher);

  return {messages: data, mutateMessages: mutate};
};

export const useCreateMessage = (params?: {ascendant?: boolean}) => {
  const {trigger, error} = useSWRSQLiteMutation(
    MESSAGES_TABLE_NAME,
    createMessage,
    (result, currentData) => {
      if (!result) {
        return currentData;
      }
      if (params?.ascendant) {
        return [...(currentData ?? []), ...[result]];
      }
      return [...[result], ...(currentData ?? [])];
    },
  );

  return {trigger, error};
};

export const useMessageAmountSummatory = () => {
  const {data, mutate} = useSWRSQLite(
    MESSAGES_TABLE_NAME + 'message-amount-summatory',
    findMessageAmountSummatory,
  );

  const increaseOrDecreaseMessageAmountSummatory = useCallback(
    (number: number) => {
      mutate(state => +((state ?? 0) + number).toFixed(2));
    },
    [mutate],
  );

  return {
    messageAmountSummatory: data,
    increaseOrDecreaseMessageAmountSummatory,
  };
};

export const useDeleteMessage = () => {
  const {trigger, error} = useSWRSQLiteMutation(
    MESSAGES_TABLE_NAME,
    deleteMessage,
    (result, currentData) => {
      if (!result) {
        return currentData;
      }
      return (currentData as Message[] | undefined)?.filter(
        message => message.id !== result,
      );
    },
  );

  return {trigger, error};
};

export const useMessagesWithTags = (params?: {ascendant?: boolean}) => {
  const fetcher = useCallback(
    async (sqliteDatabase: SQLiteDatabase) => {
      const messages = await findAllMessages({ascendant: params?.ascendant})(
        sqliteDatabase,
      );
      const tags = await findAllTags(sqliteDatabase);

      const localMessagesWithTags: (Message & {tags: Tag[]})[] = [];
      for (const message of messages ?? []) {
        const messageTagIds = (
          await findAllMessagesTagsByMessageId(message.id)(sqliteDatabase)
        ).map(messageTag => messageTag.tagId);

        const messageTags: Tag[] = [];
        for (const tagId of messageTagIds ?? []) {
          const foundTag = tags?.find(tag => tag.id === tagId);
          if (!foundTag) {
            continue;
          }
          messageTags.push(foundTag);
        }
        localMessagesWithTags.push({...message, tags: messageTags ?? []});
      }

      return localMessagesWithTags;
    },
    [params?.ascendant],
  );

  const {data, mutate} = useSWRSQLite(MESSAGES_WITH_TAGS_KEY, fetcher);

  const addMessageWithTags = useCallback(
    (message: Message, tags: Tag[]) => {
      mutate(
        currentData =>
          params?.ascendant
            ? [...(currentData ?? []), ...[{...message, tags: tags}]]
            : [...[{...message, tags: tags}], ...(currentData ?? [])],
        {revalidate: false},
      );
    },
    [mutate, params?.ascendant],
  );

  return {messagesWithTags: data, addMessageWithTags};
};
