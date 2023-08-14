import {MESSAGES_KEY, TAGS_KEY} from '../constants/swr-keys';
import {Tag} from '../entities/tag';
import {useSWRImmutableDataSource} from '../hooks/use-swr';
import {findAllTags, findMessagesByTagId} from '../services/tag.service';

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
