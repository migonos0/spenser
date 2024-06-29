import useSWR from "swr";
import { useTransactionsService } from "../services/use-transactions-service";

export const useTransactions = () => {
  const transactionsService = useTransactionsService();
  const { data, mutate } = useSWR(
    [transactionsService.findAllTransactions],
    transactionsService.findAllTransactions
  );
  return { transactions: data, mutateTransactions: mutate };
};
