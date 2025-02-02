import {Transaction, TransactionInput} from '../../domain/transaction';

export type TransactionsRepo = {
    findAllTransactions(): Promise<Transaction[]>;
    createTransaction(input: TransactionInput): Promise<Transaction>;
    deleteTransaction(input: Transaction): Promise<Transaction>;
    updateTransaction(input: Transaction): Promise<Transaction>;
};
