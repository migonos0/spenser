import {SWR_KEYS} from '../constants/swr-keys';
import {Tracker} from '../entities/tracker';
import {
  useSWRDataSourceMutation,
  useSWRImmutableDataSource,
} from '../hooks/use-swr';
import {createTracker, findAllTrackers} from '../services/tracker.service';

export const useTrackers = () => {
  const {data} = useSWRImmutableDataSource(SWR_KEYS.TRACKERS, findAllTrackers);

  return {trackers: data};
};

export const useCreateTracker = () => {
  const {trigger} = useSWRDataSourceMutation(
    SWR_KEYS.TRACKERS,
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
