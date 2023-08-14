import {useCallback} from 'react';
import {
  createMessage,
  deleteMessageById,
  findAllMessages,
  findMessageAmountSummatory,
} from '../services/message.service';
import {
  MESSAGES_KEY,
  MESSAGE_AMOUNT_SUMMATORY_KEY,
} from '../constants/swr-keys';
import {useSWRConfig} from 'swr';
import {
  useSWRDataSourceMutation,
  useSWRImmutableDataSource,
} from '../hooks/use-swr';
import {Message} from '../entities/message';

export const useMessageAmountSummatory = () => {
  const {data, mutate} = useSWRImmutableDataSource(
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

export const useMessages = (params?: {ascendant?: boolean}) => {
  const fetcher = findAllMessages({ascendant: params?.ascendant});

  const {data} = useSWRImmutableDataSource(MESSAGES_KEY, fetcher);

  return {messages: data};
};

export const useCreateMessage = (params?: {ascendant?: boolean}) => {
  const {mutate} = useSWRConfig();
  const {trigger} = useSWRDataSourceMutation(
    MESSAGES_KEY,
    createMessage,
    (result, currentData: Message[] | undefined) => {
      if (!result) {
        return currentData;
      }

      /**
       * Adding created message to MessagesByTag state
       */
      for (const tag of result.tags) {
        mutate([MESSAGES_KEY, tag.id], (messages: Message[] | undefined) => {
          return [...(messages ?? []), ...[result]];
        });
      }

      return params?.ascendant
        ? [...(currentData ?? []), ...[result]]
        : [...[result], ...(currentData ?? [])];
    },
  );

  return {createMessageTrigger: trigger};
};

export const useDeleteMessage = () => {
  const {trigger} = useSWRDataSourceMutation(
    MESSAGES_KEY,
    deleteMessageById,
    (deletedMessage, currentData: Message[] | undefined) => {
      if (!deletedMessage) {
        return currentData;
      }

      return currentData?.filter(message => message.id !== deletedMessage.id);
    },
  );

  return {deleteMessageTrigger: trigger};
};
