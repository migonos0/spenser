import {MESSAGES_TAGS_TABLE_NAME} from '../constants/db';
import {useSWRSQLite, useSWRSQLiteMutation} from '../hooks/swr';
import {MessageTag} from '../schemas/message-tag.schema';
import {
  createMessagesTags,
  findAllMessagesTags,
} from '../service/message-tag.service';

export const useMessagesTags = () => {
  const {data} = useSWRSQLite(MESSAGES_TAGS_TABLE_NAME, findAllMessagesTags);

  return {messagesTags: data};
};

export const useCreateMessagesTags = () => {
  const {trigger} = useSWRSQLiteMutation(
    MESSAGES_TAGS_TABLE_NAME,
    createMessagesTags,
    (result, currentData: MessageTag[] | undefined) => {
      if (!result) {
        return currentData;
      }
      return [...(currentData ?? []), ...result];
    },
  );

  return {createMessagesTagsTrigger: trigger};
};
