import {useCallback, useMemo} from 'react';
import {MESSAGES_TABLE_NAME} from '../constants/db';
import {useSWRSQLite, useSWRSQLiteMutation} from '../hooks/swr';
import {
  createMessage,
  deleteMessage,
  findAllMessages,
  findMessageAmountSummatory,
} from '../service/message.service';
import {Message} from '../schemas/message.schema';
import {useTags} from './tag.state';
import {useMessagesTags} from './message-tag.state';
import {Tag} from '../schemas/tag.schema';

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

  const updateWithValue = useCallback(
    (number: number) => {
      mutate(state => +((state ?? 0) + number).toFixed(2));
    },
    [mutate],
  );

  return {messageAmountSummatory: data, updateWithValue};
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
  const {messages} = useMessages(params);
  const {tags} = useTags();
  const {messagesTags} = useMessagesTags();

  const messagesWithTags = useMemo(() => {
    const localMessagesWithTags: (Message & {tags: Tag[]})[] = [];

    for (const message of messages ?? []) {
      const messageTagIds = messagesTags
        ?.filter(messageTag => messageTag.messageId === message.id)
        .map(messageTag => messageTag.id);
      const messageTags = tags?.filter(tag => messageTagIds?.includes(tag.id));
      localMessagesWithTags.push({...message, tags: messageTags ?? []});
    }

    return localMessagesWithTags;
  }, [messages, tags, messagesTags]);

  return {messagesWithTags};
};
