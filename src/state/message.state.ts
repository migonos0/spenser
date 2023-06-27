import {MESSAGES_TABLE_NAME} from '../constants/db';
import {useSWRSQLite, useSWRSQLiteMutation} from '../hooks/swr';
import {createMessage, findAllMessages} from '../service/message.service';

export const useMessages = (params?: {ascendant?: boolean}) => {
  const fetcher = findAllMessages({ascendant: params?.ascendant});
  const {data, mutate} = useSWRSQLite(MESSAGES_TABLE_NAME, fetcher);

  return {messages: data, mutateMessages: mutate};
};

export const useMutateMessages = (params?: {ascendant?: boolean}) => {
  const {trigger} = useSWRSQLiteMutation(
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

  return {trigger};
};
