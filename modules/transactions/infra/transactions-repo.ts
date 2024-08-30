import {Transaction, TransactionInput} from '../domain/transaction';

export type TransactionsRepo = {
  findAllTransactions(): Promise<Transaction[]>;
  createTransaction(input: TransactionInput): Promise<Transaction>;
};
