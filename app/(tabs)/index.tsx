import { useTransactionsService } from "@/hooks/services/use-transactions-service";
import { Transaction } from "@/modules/transactions/domain/transaction";
import { useEffect, useState } from "react";
import { Button, Text } from "react-native";

const HomeScreen = () => {
  const transactionsService = useTransactionsService();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    transactionsService
      ?.findAllTransactions()
      .then((transactions) => setTransactions(transactions));
  }, []);

  return (
    <>
      <Text style={{ color: "red" }}>Hello World!</Text>
      <Button
        title="Create"
        onPress={() => {
          transactionsService
            ?.createTransaction({
              amount: Math.random(),
              description: Math.random().toString(36).substr(2, 6),
              isExpense: true,
            })
            .then((ct) => {
              setTransactions((t) => [...t, ct]);
            });
        }}
      ></Button>
      <Button title="Read"></Button>
      {transactions.map((transaction, index) => (
        <Text
          style={{ color: "red" }}
          key={index}
        >{`ID: ${transaction.id}, DESC: ${transaction.description}`}</Text>
      ))}
    </>
  );
};

export default HomeScreen;
