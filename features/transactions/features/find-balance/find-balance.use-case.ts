import {TransactionsRepo} from '../../common/infra/transactions-repo';

type Dependencies = {
  transactionsRepo: TransactionsRepo;
};
export const makeFindBalanceUseCase = ({transactionsRepo}: Dependencies) => ({
  async execute() {
    return (await transactionsRepo.findAllTransactions()).reduce(
      (acc, transaction) =>
        acc +
        (transaction.isExpense ? transaction.amount * -1 : transaction.amount),
      0,
    );
  },
});
export type FindBalanceUseCase = ReturnType<typeof makeFindBalanceUseCase>;
