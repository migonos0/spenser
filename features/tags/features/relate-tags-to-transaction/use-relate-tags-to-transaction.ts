import {useDependency} from '@/common/hooks/use-dependency';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {RelateTagsToTransactionUseCase} from './relate-tags-to-transaction.use-case';
import {Tag} from '../../domain/tag';
import {queryKeys} from '@/common/constants/query-keys';
import {Transaction} from '@/features/transactions/domain/transaction';

export const useRelateTagsToTransaction = () => {
    const useCase: RelateTagsToTransactionUseCase = useDependency(
        'relateTagsToTransactionUseCase',
    );

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: useCase.execute,
        onSuccess(relatedTagsToTransaction) {
            const indexedRelatedTags = relatedTagsToTransaction.tags.reduce(
                (
                    indexedRelatedTags: Record<Tag['id'], Tag | undefined>,
                    tag,
                ) => ({
                    [tag.id]: tag,
                    ...indexedRelatedTags,
                }),
                {},
            );

            queryClient.setQueryData<Tag[]>(queryKeys.tags, (cachedTags) =>
                cachedTags?.map((cachedTag) =>
                    indexedRelatedTags[cachedTag.id]
                        ? {
                              ...cachedTag,
                              transactions: [
                                  ...(indexedRelatedTags[cachedTag.id]
                                      ?.transactions ?? []),
                                  ...(cachedTag.transactions ?? []),
                              ],
                          }
                        : cachedTag,
                ),
            );
            queryClient.setQueryData<Transaction[]>(
                queryKeys.transactions,
                (cachedTransactions) =>
                    cachedTransactions?.map((cachedTransaction) =>
                        cachedTransaction.id ==
                        relatedTagsToTransaction.transaction.id
                            ? {
                                  ...cachedTransaction,
                                  tags: [
                                      ...(relatedTagsToTransaction.transaction
                                          .tags ?? []),
                                      ...(cachedTransaction.tags ?? []),
                                  ],
                              }
                            : cachedTransaction,
                    ),
            );
        },
    });

    return {relateTagsToTransaction: mutate};
};
