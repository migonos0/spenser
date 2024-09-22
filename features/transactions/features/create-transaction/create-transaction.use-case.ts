import {TransactionsRepo} from '../../common/infra/transactions-repo';
import {TransactionInput} from '../../domain/transaction';

type Dependencies = {
  transactionsRepo: TransactionsRepo;
};
export const makeCreateTransactionUseCase = ({
  transactionsRepo,
}: Dependencies) => ({
  execute(input: TransactionInput) {
    return transactionsRepo.createTransaction(input);
  },
});
export type CreateTransactionUseCase = ReturnType<
  typeof makeCreateTransactionUseCase
>;
