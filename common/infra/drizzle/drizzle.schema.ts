import {relations} from 'drizzle-orm';
import {
    integer,
    primaryKey,
    real,
    sqliteTable,
    text,
} from 'drizzle-orm/sqlite-core';

export const transactions = sqliteTable('transactions', {
    id: integer('id').primaryKey({autoIncrement: true}),
    description: text('description').notNull(),
    isExpense: integer('is_expense', {mode: 'boolean'}).notNull(),
    amount: real('amount').notNull().default(0),
});
export const tags = sqliteTable('tags', {
    id: integer('id').primaryKey({autoIncrement: true}),
    value: text('value').notNull(),
});
export const tagsToTransactions = sqliteTable(
    'tags_to_transactions',
    {
        tagId: integer('tag_id')
            .notNull()
            .references(() => tags.id),
        transactionId: integer('transaction_id')
            .notNull()
            .references(() => transactions.id),
    },
    (t) => ({
        pk: primaryKey({columns: [t.tagId, t.transactionId]}),
    }),
);
export const tagsToTransactionsRelations = relations(
    tagsToTransactions,
    ({one}) => ({
        tag: one(tags, {
            fields: [tagsToTransactions.tagId],
            references: [tags.id],
        }),
        transaction: one(transactions, {
            fields: [tagsToTransactions.transactionId],
            references: [transactions.id],
        }),
    }),
);
export const transactionsRelations = relations(transactions, ({many}) => ({
    tagsToTransactions: many(tagsToTransactions),
}));
export const tagsRelations = relations(tags, ({many}) => ({
    tagsToTransactions: many(tagsToTransactions),
}));
