import {useDependency} from '@/common/hooks/use-dependency';
import {RelateTagToTransactionUseCase} from './relate-tag-to-transaction.use-case';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {queryKeys} from '@/common/constants/query-keys';
import {Tag} from '../../domain/tag';
import {Transaction} from '@/features/transactions/domain/transaction';

export const useRelateTagToTransaction = () => {
    const useCase: RelateTagToTransactionUseCase = useDependency(
        'relateTagToTransactionUseCase',
    );

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: useCase.execute,
        onSuccess(data) {
            queryClient.setQueryData<Tag[]>(queryKeys.tags, (state) =>
                state?.map((tag) =>
                    tag.id === data.tag.id
                        ? {
                              ...tag,
                              transactions: [
                                  ...(data.tag.transactions ?? []),
                                  ...(tag.transactions ?? []),
                              ],
                          }
                        : tag,
                ),
            );
            queryClient.setQueryData<Transaction[]>(queryKeys.tags, (state) =>
                state?.map((transaction) =>
                    transaction.id === data.transaction.id
                        ? {
                              ...transaction,
                              tags: [
                                  ...(data.transaction.tags ?? []),
                                  ...(transaction.tags ?? []),
                              ],
                          }
                        : transaction,
                ),
            );
        },
    });

    return {relateTagToTransaction: mutate};
};
