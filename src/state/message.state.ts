import {useSWRSQLite, useSWRSQLiteMutation} from '../hooks/swr';
import {createMessage, findAllMessages} from '../service/message.service';

export const useMessages = () => {
  const {data, mutate} = useSWRSQLite('messages', findAllMessages);

  return {messages: data, mutateMessages: mutate};
};

export const useMutateMessages = () => {
  const {trigger} = useSWRSQLiteMutation(
    'messages',
    createMessage,
    (result, currentData) => {
      if (!result) {
        return currentData;
      }
      return [...(currentData ?? []), ...[result]];
    },
  );

  return {trigger};
};
