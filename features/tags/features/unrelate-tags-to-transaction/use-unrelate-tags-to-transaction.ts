import {useDependency} from '@/common/hooks/use-dependency';
import {UnrelateTagsToTransactionUseCase} from './unrelate-tags-to-transaction.use-case';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Tag} from '../../domain/tag';
import {queryKeys} from '@/common/constants/query-keys';
import {Transaction} from '@/features/transactions/domain/transaction';

export const useUnrelateTagsToTransaction = () => {
    const useCase: UnrelateTagsToTransactionUseCase = useDependency(
        'unrelateTagsToTransactionUseCase',
    );

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: useCase.execute,
        onSuccess(unrelatedTagsToTransaction) {
            const indexedUnrelatedTags = unrelatedTagsToTransaction.tags.reduce(
                (
                    indexedUnrelatedTags: Record<Tag['id'], Tag | undefined>,
                    tag,
                ) => ({
                    ...indexedUnrelatedTags,
                    [tag.id]: tag,
                }),
                {},
            );
            queryClient.setQueryData<Tag[]>(queryKeys.tags, (cachedTags) =>
                cachedTags?.map((cachedTag) =>
                    indexedUnrelatedTags[cachedTag.id]
                        ? {
                              ...cachedTag,
                              transactions: cachedTag.transactions?.filter(
                                  (transaction) =>
                                      transaction.id !==
                                      unrelatedTagsToTransaction.transaction.id,
                              ),
                          }
                        : cachedTag,
                ),
            );
            queryClient.setQueryData<Transaction[]>(
                queryKeys.transactions,
                (cachedTransactions) =>
                    cachedTransactions?.map((cachedTransaction) => ({
                        ...cachedTransaction,
                        tags: cachedTransaction.tags?.filter(
                            (tag) => !indexedUnrelatedTags[tag.id],
                        ),
                    })),
            );
        },
    });

    return {unrelateTagsToTransaction: mutate};
};
