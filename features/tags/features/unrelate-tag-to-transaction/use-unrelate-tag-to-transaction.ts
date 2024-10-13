import {useDependency} from '@/common/hooks/use-dependency';
import {UnrelateTagToTransactionUseCase} from './unrelate-tag-to-transaction.use-case';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Tag} from '../../domain/tag';
import {queryKeys} from '@/common/constants/query-keys';
import {Transaction} from '@/features/transactions/domain/transaction';

export const useUnrelateTagToTransaction = () => {
    const useCase: UnrelateTagToTransactionUseCase = useDependency(
        'unrelateTagToTransactionUseCase',
    );

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: useCase.execute,
        onSuccess(deletedTagToTransaction) {
            queryClient.setQueryData<Tag[]>(queryKeys.tags, (cachedTags) =>
                cachedTags?.map((cachedTag) =>
                    cachedTag.id === deletedTagToTransaction.tag.id
                        ? {
                              ...cachedTag,
                              transactions: cachedTag.transactions?.filter(
                                  (transaction) =>
                                      transaction.id !==
                                      deletedTagToTransaction.transaction.id,
                              ),
                          }
                        : cachedTag,
                ),
            );
            queryClient.setQueryData<Transaction[]>(
                queryKeys.transactions,
                (cachedTransactions) =>
                    cachedTransactions?.map((cachedTransaction) =>
                        cachedTransaction.id ===
                        deletedTagToTransaction.transaction.id
                            ? {
                                  ...cachedTransaction,
                                  tags: cachedTransaction.tags?.filter(
                                      (tag) =>
                                          tag.id !==
                                          deletedTagToTransaction.tag.id,
                                  ),
                              }
                            : cachedTransaction,
                    ),
            );
        },
    });

    return {unrelateTagToTransaction: mutate};
};
