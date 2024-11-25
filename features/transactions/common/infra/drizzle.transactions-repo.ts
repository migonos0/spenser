import {drizzleDB} from '@/common/infra/drizzle/drizzle-db';
import {transactions} from '@/common/infra/drizzle/drizzle.schema';
import {TransactionsRepo} from './transactions-repo';
import {eq} from 'drizzle-orm';

export const makeDrizzleTransactionsRepo = (): TransactionsRepo => ({
    async findAllTransactions() {
        return (
            await drizzleDB.query.transactions.findMany({
                orderBy: (transactions, {desc}) => [desc(transactions.id)],
                with: {tagsToTransactions: {with: {tag: true}}},
            })
        ).map((foundTransaction) => ({
            ...foundTransaction,
            tags: foundTransaction.tagsToTransactions.map(
                (tagToTransaction) => tagToTransaction.tag,
            ),
        }));
    },

    async createTransaction(input) {
        const createdTransaction = (
            await drizzleDB.insert(transactions).values(input).returning()
        ).at(0);

        if (!createdTransaction) {
            throw new Error(
                `An error occured while creating the transaction:\ntransaction: ${input}`,
            );
        }

        return createdTransaction;
    },

    async deleteTransaction(input) {
        const deletedTransaction = (
            await drizzleDB
                .delete(transactions)
                .where(eq(transactions.id, input.id))
                .returning()
        ).at(0);

        if (!deletedTransaction) {
            throw Error(
                `An error occured while deleting the transaction.\n{"transactionId": ${input.id}}`,
            );
        }

        return {...deletedTransaction, tags: input.tags};
    },

    async updateTransaction(input) {
        const updatedTransacion = (
            await drizzleDB
                .update(transactions)
                .set({
                    amount: input.amount,
                    description: input.description,
                    isExpense: input.isExpense,
                })
                .where(eq(transactions.id, input.id))
                .returning()
        ).at(0);
        if (!updatedTransacion) {
            throw Error(
                `An error occured while updating the transaction.\n{"transaction": ${input}}`,
            );
        }
        return {...updatedTransacion, tags: input.tags};
    },
});
