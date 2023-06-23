import {useSWRSQLite} from '../hooks/swr';
import {findAllMessages} from '../service/message.service';

export const useMessages = () => {
  const {data} = useSWRSQLite('messages', findAllMessages);

  return {messages: data};
};
