import {TransactionInput} from './domain/transaction';
import {TransactionsRepo} from './infra/transactions-repo';

type Dependencies = {
  transactionsRepo: TransactionsRepo;
};
export const makeTransactionsService = ({
  transactionsRepo: repo,
}: Dependencies) => ({
  findAllTransactions() {
    return repo.findAllTransactions();
  },

  createTransaction(input: TransactionInput) {
    return repo.createTransaction(input);
  },
});

export type TransactionsService = ReturnType<typeof makeTransactionsService>;
