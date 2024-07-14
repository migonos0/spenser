import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransactionsService } from "../services/use-transactions-service";
import { queryKeys } from "@/constants/query-keys";
import { Transaction } from "@/modules/transactions/domain/transaction";

export const useCreateTransaction = () => {
  const transactionsService = useTransactionsService();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: transactionsService.createTransaction,
    onSuccess(data) {
      queryClient.setQueryData<Transaction[]>(
        queryKeys.transactions,
        (state) => [...(state ?? []), data]
      );
    },
  });

  return { createTransaction: mutate };
};
