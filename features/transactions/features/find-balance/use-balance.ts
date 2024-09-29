import {useDependency} from '@/common/hooks/use-dependency';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {FindBalanceUseCase} from './find-balance.use-case';
import {queryKeys} from '@/common/constants/query-keys';
import {Transaction} from '../../domain/transaction';

export const useBalance = () => {
    const useCase: FindBalanceUseCase = useDependency('findBalanceUseCase');

    const {data} = useQuery({
        queryFn: useCase.execute,
        queryKey: queryKeys.balance,
    });

    const queryClient = useQueryClient();

    const {mutate: addTransaction} = useMutation({
        mutationFn: async (input: Transaction) => input,
        onSuccess(data) {
            queryClient.setQueryData<number>(
                queryKeys.balance,
                (state) =>
                    (state ?? 0) +
                    (data.isExpense ? -1 * data.amount : data.amount),
            );
        },
    });
    const {mutate: removeTransaction} = useMutation({
        mutationFn: async (input: Transaction) => input,
        onSuccess(data) {
            queryClient.setQueryData<number>(
                queryKeys.balance,
                (state) =>
                    (state ?? 0) -
                    (data.isExpense ? -1 * data.amount : data.amount),
            );
        },
    });
    const {mutate: replaceTransaction} = useMutation({
        mutationFn: async (input: {
            oldTransaction: Transaction;
            newTransaction: Transaction;
        }) => input,
        onSuccess(data) {
            removeTransaction(data.oldTransaction);
            addTransaction(data.newTransaction);
        },
    });

    return {
        balance: data,
        addTransaction,
        removeTransaction,
        replaceTransaction,
    };
};
