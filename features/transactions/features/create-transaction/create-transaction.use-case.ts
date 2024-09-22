import {TransactionInput} from '../../domain/transaction';
import {TransactionsRepo} from '../../infra/transactions-repo';

type Dependencies = {
  transactionsRepo: TransactionsRepo;
};
export const makeCreateTransactionUseCase = ({
  transactionsRepo,
}: Dependencies) => ({
  execute(input: TransactionInput) {
    return transactionsRepo.createTransaction(input);
  },
});
export type CreateTransactionUseCase = ReturnType<
  typeof makeCreateTransactionUseCase
>;
