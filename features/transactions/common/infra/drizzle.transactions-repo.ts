import {transactions} from '@/common/infra/drizzle/drizzle-schema';
import {TransactionsRepo} from './transactions-repo';
import {drizzleDB} from '@/common/infra/drizzle/drizzle-db';

export const makeDrizzleTransactionsRepo = (): TransactionsRepo => ({
  findAllTransactions() {
    return drizzleDB.query.transactions.findMany();
  },

  async createTransaction(input) {
    const createdTransaction = (
      await drizzleDB.insert(transactions).values(input).returning()
    ).at(0);

    if (!createdTransaction) {
      throw new Error(
        `An error occured while creating the transaction:. transaction: ${input}`,
      );
    }

    return createdTransaction;
  },
});
