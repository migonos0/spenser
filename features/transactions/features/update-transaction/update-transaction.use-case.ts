import {TransactionsRepo} from '../../common/infra/transactions-repo';
import {Transaction} from '../../domain/transaction';

type Dependencies = {
    transactionsRepo: TransactionsRepo;
};
export const makeUpdateTransactionUseCase = ({
    transactionsRepo,
}: Dependencies) => ({
    execute(input: Transaction) {
        return transactionsRepo.updateTransaction(input);
    },
});
