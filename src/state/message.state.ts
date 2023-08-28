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
import {useSWRConfig} from 'swr';
import {TrackerDto} from '../dtos/tracker.dto';

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
  const {mutate} = useSWRConfig();

  const {trigger} = useSWRDataSourceMutation(
    key,
    deleteMessageById,
    (deletedMessage, currentData: Message[] | undefined) => {
      if (!deletedMessage) {
        return currentData;
      }

      /**
       * Decreasing to the balance of the tracker, removing and placing it on top.
       */
      mutate(
        swrKeyGetters.getUseTrackerDtosKey(),
        (cachedTrackerDtos: TrackerDto[] | undefined) => {
          if (!cachedTrackerDtos) {
            return;
          }
          const cachedTrackerDtoIndex = cachedTrackerDtos.findIndex(
            ctd => ctd.id === tracker?.id,
          );
          const cachedTrackerDto = cachedTrackerDtos.at(cachedTrackerDtoIndex);
          if (!cachedTrackerDto) {
            return cachedTrackerDtos;
          }

          const cachedTrackerDtosCopy = cachedTrackerDtos.slice();
          cachedTrackerDtosCopy.splice(cachedTrackerDtoIndex, 1);

          return [
            {
              ...cachedTrackerDto,
              balance: (cachedTrackerDto.balance ?? 0) - deletedMessage.amount,
            },
            ...cachedTrackerDtosCopy,
          ];
        },
        {revalidate: false},
      );

      return currentData?.filter(message => message.id !== deletedMessage.id);
    },
  );

  return {deleteMessageTrigger: trigger};
};

export const useCreateMessageByTracker = (tracker?: Tracker) => {
  const key = tracker
    ? swrKeyGetters.getUseMessagesByTrackerKey(tracker)
    : undefined;
  const {mutate} = useSWRConfig();

  const {trigger} = useSWRDataSourceMutation(
    key,
    createMessage,
    (result, currentData: Message[] | undefined) => {
      if (!result) {
        return currentData;
      }

      /**
       * Adding to the balance of the tracker, removing and placing it on top.
       */
      mutate(
        swrKeyGetters.getUseTrackerDtosKey(),
        (cachedTrackerDtos: TrackerDto[] | undefined) => {
          if (!cachedTrackerDtos) {
            return;
          }
          const cachedTrackerDtoIndex = cachedTrackerDtos.findIndex(
            ctd => ctd.id === tracker?.id,
          );
          const cachedTrackerDto = cachedTrackerDtos.at(cachedTrackerDtoIndex);
          if (!cachedTrackerDto) {
            return cachedTrackerDtos;
          }

          const cachedTrackerDtosCopy = cachedTrackerDtos.slice();
          cachedTrackerDtosCopy.splice(cachedTrackerDtoIndex, 1);

          return [
            {
              ...cachedTrackerDto,
              balance: (cachedTrackerDto.balance ?? 0) + result.amount,
            },
            ...cachedTrackerDtosCopy,
          ];
        },
        {revalidate: false},
      );

      return [result, ...(currentData ?? [])];
    },
  );

  return {createMessageTrigger: trigger};
};
