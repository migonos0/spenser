import {useDependency} from '@/common/hooks/use-dependency';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {DeleteTransactionUseCase} from './delete-transaction.use-case';
import {Transaction} from '../../domain/transaction';
import {queryKeys} from '@/common/constants/query-keys';

export const useDeleteTransaction = () => {
    const useCase: DeleteTransactionUseCase = useDependency(
        'deleteTransactionUseCase',
    );

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: useCase.execute,
        onSuccess(data) {
            queryClient.setQueryData<Transaction[]>(
                queryKeys.transactions,
                (state) =>
                    state?.filter((transaction) => transaction.id !== data.id),
            );
        },
    });

    return {deleteTransaction: mutate};
};
