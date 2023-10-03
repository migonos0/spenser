import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Tag} from '../entities/tag';
import {
  useSWRDataSourceMutation,
  useSWRImmutableDataSource,
} from '../hooks/use-swr';
import {
  createTags,
  findAllTags,
  findTransactionsByAccountAndTagIds,
} from '../services/tag.service';
import {Account} from '../entities/account';

export const useTags = () => {
  const {data} = useSWRImmutableDataSource(
    swrKeyGetters.getUseTagsKey(),
    findAllTags,
  );

  return {tags: data};
};

export const useTransactionsByAccountAndTagIds = (
  accountId?: Account['id'],
  tagId?: Tag['id'],
) => {
  const key =
    tagId && accountId
      ? swrKeyGetters.getUseTransactionsByAccountAndTagIdsKey(accountId, tagId)
      : undefined;
  const fetcher =
    tagId && accountId
      ? findTransactionsByAccountAndTagIds(accountId, tagId)
      : () => undefined;

  const {data} = useSWRImmutableDataSource(key, fetcher);

  return {transactions: data};
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
