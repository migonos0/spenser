import { Transaction, TransactionInput } from "./domain/transaction";
import { TransactionsRepo } from "./infra/transactions-repo";

export type TransactionsService = {
  findAllTransactions(): Promise<Transaction[]>;
  createTransaction(input: TransactionInput): Promise<Transaction>;
};

type Dependencies = {
  transactionsRepo: TransactionsRepo;
};
export const makeTransactionsService = ({
  transactionsRepo: repo,
}: Dependencies): TransactionsService => ({
  findAllTransactions() {
    return repo.findAllTransactions();
  },

  createTransaction(input) {
    return repo.createTransaction(input);
  },
});
