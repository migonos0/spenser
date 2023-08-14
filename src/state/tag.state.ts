import {MESSAGES_KEY, TAGS_KEY} from '../constants/swr-keys';
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
  const {data} = useSWRImmutableDataSource(TAGS_KEY, findAllTags);

  return {tags: data};
};

export const useMessagesByTagId = (tagId?: Tag['id']) => {
  const key = tagId ? [MESSAGES_KEY, tagId] : undefined;
  const fetcher = tagId ? findMessagesByTagId(tagId) : () => undefined;

  const {data} = useSWRImmutableDataSource(key, fetcher);

  return {messages: data};
};

export const useCreateTags = () => {
  const {trigger} = useSWRDataSourceMutation(
    TAGS_KEY,
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
