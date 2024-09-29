import {useDependency} from '@/common/hooks/use-dependency';
import {UpdateTransactionUseCase} from './update-transaction.use-case';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Transaction} from '../../domain/transaction';
import {queryKeys} from '@/common/constants/query-keys';

export const useUpdateTransaction = () => {
    const useCase: UpdateTransactionUseCase = useDependency(
        'updateTransactionUseCase',
    );
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: useCase.execute,
        onSuccess(updatedTransaction) {
            queryClient.setQueryData<Transaction[]>(
                queryKeys.transactions,
                (cachedTransactions) =>
                    cachedTransactions?.map((transaction) =>
                        transaction.id === updatedTransaction.id
                            ? updatedTransaction
                            : transaction,
                    ),
            );
        },
    });

    return {updateTransaction: mutate};
};
