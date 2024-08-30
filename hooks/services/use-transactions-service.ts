import {TransactionsService} from '@/modules/transactions/transactions-service';
import {useDependency} from '../use-dependency';

export const useTransactionsService = () =>
  useDependency<TransactionsService>('transactionsService');
