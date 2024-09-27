import {useDependency} from '@/common/hooks/use-dependency';
import {CreateTransactionUseCase} from './create-transaction.use-case';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Transaction} from '../../domain/transaction';
import {queryKeys} from '@/common/constants/query-keys';

export const useCreateTransaction = () => {
  const createTransactionUseCase = useDependency<CreateTransactionUseCase>(
    'createTransactionUseCase',
  );

  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: createTransactionUseCase.execute,
    onSuccess(data) {
      queryClient.setQueryData<Transaction[]>(queryKeys.transactions, state => [
        data,
        ...(state ?? []),
      ]);
    },
  });

  return {createTransaction: mutate};
};
