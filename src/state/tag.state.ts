import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Tag} from '../entities/tag';
import {
  useSWRMutationOnInitializedDS,
  useSWRImmutableOnInitializedDS,
} from '../hooks/use-swr';
import {createTags, findAllTags} from '../services/tag.service';
import {Account} from '../entities/account';
import {findTransactionsByAccountAndTagIds} from '../services/transaction.service';

export const useTags = () => {
  const {data} = useSWRImmutableOnInitializedDS(
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
      ? () => findTransactionsByAccountAndTagIds(accountId, tagId)
      : () => undefined;

  const {data} = useSWRImmutableOnInitializedDS(key, fetcher);

  return {transactions: data};
};

export const useCreateTags = () => {
  const {trigger} = useSWRMutationOnInitializedDS(
    swrKeyGetters.getUseTagsKey(),
    createTags,
    {
      populateCache: (createdTags, currentData: Tag[] | undefined) => {
        if (!createdTags) {
          return currentData;
        }
        return [...(currentData ?? []), ...createdTags];
      },
    },
  );

  return {createTagsTrigger: trigger};
};
