import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Message} from '../entities/message';
import {
  useSWRDataSourceMutation,
  useSWRImmutableDataSource,
} from '../hooks/use-swr';
import {
  createMessage,
  deleteMessageById,
  findAllMessagesByTracker,
} from '../services/message.service';
import {Tracker} from '../entities/tracker';

export const useMessagesByTracker = (tracker?: Tracker) => {
  const key = tracker
    ? swrKeyGetters.getUseMessagesByTrackerKey(tracker)
    : undefined;
  const fetcher = tracker ? findAllMessagesByTracker(tracker) : () => undefined;

  const {data} = useSWRImmutableDataSource(key, fetcher);

  return {messages: data};
};

export const useDeleteMessageByTracker = (tracker?: Tracker) => {
  const key = tracker
    ? swrKeyGetters.getUseMessagesByTrackerKey(tracker)
    : undefined;

  const {trigger} = useSWRDataSourceMutation(
    key,
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

export const useCreateMessageByTracker = (tracker?: Tracker) => {
  const key = tracker
    ? swrKeyGetters.getUseMessagesByTrackerKey(tracker)
    : undefined;

  const {trigger} = useSWRDataSourceMutation(
    key,
    createMessage,
    (result, currentData: Message[] | undefined) => {
      if (!result) {
        return currentData;
      }
      return [result, ...(currentData ?? [])];
    },
  );

  return {createMessageTrigger: trigger};
};
