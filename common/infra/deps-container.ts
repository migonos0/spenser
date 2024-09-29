import {makeDrizzleTransactionsRepo} from '@/features/transactions/common/infra/drizzle.transactions-repo';
import {makeCreateTransactionUseCase} from '@/features/transactions/features/create-transaction/create-transaction.use-case';
import {makeDeleteTransactionUseCase} from '@/features/transactions/features/delete-transaction/delete-transaction.use-case';
import {makeFindAllTransactionsUseCase} from '@/features/transactions/features/find-all-transactions/find-all-transactions.use-case';
import {makeFindBalanceUseCase} from '@/features/transactions/features/find-balance/find-balance.use-case';
import {makeUpdateTransactionUseCase} from '@/features/transactions/features/update-transaction/update-transaction.use-case';
import {asFunction, createContainer} from 'awilix';

const depNames = {
    // Transactions
    TRANSACTIONS_REPO: 'transactionsRepo',
    CREATE_TRANSACTION_USE_CASE: 'createTransactionUseCase',
    FIND_ALL_TRANSACTIONS_USE_CASE: 'findAllTransactionsUseCase',
    DELETE_TRANSACTION_USE_CASE: 'deleteTransactionUseCase',
    FIND_BALANCE_USE_CASE: 'findBalanceUseCase',
    UPDATE_TRANSACTION_USE_CASE: 'updateTransactionUseCase',
} as const;
export type DepNames = (typeof depNames)[keyof typeof depNames];

export const makeDepsContainer = () => {
    const container = createContainer({strict: true});

    // Transactions
    // Repos
    container.register({
        [depNames.TRANSACTIONS_REPO]: asFunction(
            makeDrizzleTransactionsRepo,
        ).singleton(),
    });
    // Use cases
    container.register({
        [depNames.CREATE_TRANSACTION_USE_CASE]: asFunction(
            makeCreateTransactionUseCase,
        ),
        [depNames.FIND_ALL_TRANSACTIONS_USE_CASE]: asFunction(
            makeFindAllTransactionsUseCase,
        ),
        [depNames.DELETE_TRANSACTION_USE_CASE]: asFunction(
            makeDeleteTransactionUseCase,
        ),
        [depNames.FIND_BALANCE_USE_CASE]: asFunction(makeFindBalanceUseCase),
        [depNames.UPDATE_TRANSACTION_USE_CASE]: asFunction(
            makeUpdateTransactionUseCase,
        ),
    });

    return container;
};
