export type Transaction = {
  id: number;
  description: string;
  isExpense: boolean;
  amount: number;
};

export type TransactionInput = {
  description: Transaction["description"];
  isExpense: Transaction["isExpense"];
  amount?: Transaction["amount"];
};
