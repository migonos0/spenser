import { makeDrizzleTransactionsRepo } from "@/modules/transactions/infra/drizzle.transactions-repo";
import { makeTransactionsService } from "@/modules/transactions/transactions-service";
import { asFunction, createContainer } from "awilix";

export const makeDepsContainer = () => {
  const container = createContainer({ strict: true });

  // Repos
  container.register({
    transactionsRepo: asFunction(makeDrizzleTransactionsRepo).singleton(),
  });

  // Services (Application layer)
  container.register({
    transactionsService: asFunction(makeTransactionsService),
  });

  return container;
};
