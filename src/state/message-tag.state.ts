import {MESSAGES_TAGS_TABLE_NAME} from '../constants/db';
import {useSWRImmutableSQLite, useSWRSQLiteMutation} from '../hooks/use-swr';
import {MessageTag} from '../schemas/message-tag.schema';
import {
  createMessagesTags,
  findAllMessagesTags,
} from '../services/message-tag.service';

export const useMessagesTags = () => {
  const {data} = useSWRImmutableSQLite(
    MESSAGES_TAGS_TABLE_NAME,
    findAllMessagesTags,
  );

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
