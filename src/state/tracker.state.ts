import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Tracker} from '../entities/tracker';
import {
  useSWRDataSourceMutation,
  useSWRImmutableDataSource,
} from '../hooks/use-swr';
import {
  createTracker,
  findAllTrackerDtos,
  findTrackerById,
} from '../services/tracker.service';
import {useMemo} from 'react';

export const useTrackerDtos = () => {
  const {data} = useSWRImmutableDataSource(
    swrKeyGetters.getUseTrackerDtosKey(),
    findAllTrackerDtos,
  );

  return {trackerDtos: data};
};

export const useCreateTracker = () => {
  const {trigger} = useSWRDataSourceMutation(
    swrKeyGetters.getUseTrackerDtosKey(),
    createTracker,
    (createdTracker, currentData: Tracker[] | undefined) => {
      if (!createdTracker) {
        return currentData;
      }
      return [createdTracker, ...(currentData ?? [])];
    },
  );

  return {createTrackerTrigger: trigger};
};

export const useTrackerById = (trackerId?: Tracker['id']) => {
  const key = trackerId
    ? swrKeyGetters.getUseTrackerByIdKey(trackerId)
    : undefined;
  const fetcher = findTrackerById(trackerId);

  const {data} = useSWRImmutableDataSource(key, fetcher);

  return {tracker: data};
};

export const useTrackerDtoById = (trackerId?: Tracker['id']) => {
  const {trackerDtos} = useTrackerDtos();

  const data = useMemo(
    () => trackerDtos?.find(trackerDto => trackerDto.id === trackerId),
    [trackerDtos, trackerId],
  );

  return {trackerDto: data};
};
