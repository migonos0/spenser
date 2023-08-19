import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Tag} from '../entities/tag';
import {
  useSWRDataSourceMutation,
  useSWRImmutableDataSource,
} from '../hooks/use-swr';
import {
  createTags,
  findAllTags,
  findMessagesByTagId,
} from '../services/tag.service';

export const useTags = () => {
  const {data} = useSWRImmutableDataSource(
    swrKeyGetters.getUseTagsKey(),
    findAllTags,
  );

  return {tags: data};
};

export const useMessagesByTagId = (tagId?: Tag['id']) => {
  const key = tagId ? swrKeyGetters.getUseMessagesByTagIdKey(tagId) : undefined;
  const fetcher = tagId ? findMessagesByTagId(tagId) : () => undefined;

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
