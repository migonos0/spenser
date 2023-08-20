import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Tag} from '../entities/tag';
import {
  useSWRDataSourceMutation,
  useSWRImmutableDataSource,
} from '../hooks/use-swr';
import {
  createTags,
  findAllTags,
  findMessagesByTrackerAndTagIds,
} from '../services/tag.service';
import {Tracker} from '../entities/tracker';

export const useTags = () => {
  const {data} = useSWRImmutableDataSource(
    swrKeyGetters.getUseTagsKey(),
    findAllTags,
  );

  return {tags: data};
};

export const useMessagesByTrackerAndTagIds = (
  trackerId?: Tracker['id'],
  tagId?: Tag['id'],
) => {
  const key =
    tagId && trackerId
      ? swrKeyGetters.getUseMessagesByTrackerAndTagIdsKey(trackerId, tagId)
      : undefined;
  const fetcher =
    tagId && trackerId
      ? findMessagesByTrackerAndTagIds(trackerId, tagId)
      : () => undefined;

  const {data} = useSWRImmutableDataSource(key, fetcher);

  return {messages: data};
};

export const useCreateTags = () => {
  const {trigger} = useSWRDataSourceMutation(
    swrKeyGetters.getUseTagsKey(),
    createTags,
    (createdTags, currentData: Tag[] | undefined) => {
      if (!createdTags) {
        return currentData;
      }
      return [...(currentData ?? []), ...createdTags];
    },
  );

  return {createTagsTrigger: trigger};
};
