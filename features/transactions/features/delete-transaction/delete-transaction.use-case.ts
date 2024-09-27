import {TransactionsRepo} from '../../common/infra/transactions-repo';
import {Transaction} from '../../domain/transaction';

type Dependencies = {
  transactionsRepo: TransactionsRepo;
};
export const makeDeleteTransactionUseCase = ({
  transactionsRepo,
}: Dependencies) => ({
  execute(input: Transaction) {
    return transactionsRepo.deleteTransaction(input);
  },
});
export type DeleteTransactionUseCase = ReturnType<
  typeof makeDeleteTransactionUseCase
>;
