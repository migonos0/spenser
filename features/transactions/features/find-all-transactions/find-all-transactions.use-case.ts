import {TransactionsRepo} from '../../common/infra/transactions-repo';

type Dependencies = {
    transactionsRepo: TransactionsRepo;
};
export const makeFindAllTransactionsUseCase = ({
    transactionsRepo: repo,
}: Dependencies) => ({
    execute() {
        return repo.findAllTransactions();
    },
});
export type FindAllTransactionsUseCase = ReturnType<
    typeof makeFindAllTransactionsUseCase
>;
