import {useDependency} from '@/common/hooks/use-dependency';
import {FindAllTransactionsUseCase} from './find-all-transactions.use-case';
import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '@/common/constants/query-keys';

export const useTransactions = () => {
  const findAllTransactionsUseCase = useDependency<FindAllTransactionsUseCase>(
    'findAllTransactionsUseCase',
  );

  const {data} = useQuery({
    queryKey: queryKeys.transactions,
    queryFn: findAllTransactionsUseCase.execute,
  });

  return {transactions: data};
};
