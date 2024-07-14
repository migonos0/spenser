import { useQuery } from "@tanstack/react-query";
import { useTransactionsService } from "../services/use-transactions-service";
import { queryKeys } from "@/constants/query-keys";

export const useTransactions = () => {
  const transactionsService = useTransactionsService();

  const { data } = useQuery({
    queryKey: queryKeys.transactions,
    queryFn: transactionsService.findAllTransactions,
  });

  return { transactions: data };
};
