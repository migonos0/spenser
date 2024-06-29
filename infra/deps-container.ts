import { makeDrizzleTransactionsRepo } from "@/modules/transactions/infra/drizzle.transactions-repo";
import { makeTransactionsService } from "@/modules/transactions/transactions-service";
import { asFunction, createContainer } from "awilix";

const depNames = {
  TRANSACTIONS_REPO: "transactionsRepo",
  TRANSACTIONS_SERVICE: "transactionsService",
} as const;
export type DepNames = (typeof depNames)[keyof typeof depNames];

export const makeDepsContainer = () => {
  const container = createContainer({ strict: true });

  // Repos
  container.register({
    [depNames.TRANSACTIONS_REPO]: asFunction(
      makeDrizzleTransactionsRepo
    ).singleton(),
  });

  // Services (Application layer)
  container.register({
    [depNames.TRANSACTIONS_SERVICE]: asFunction(makeTransactionsService),
  });

  return container;
};
