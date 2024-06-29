import { useTransactions } from "@/hooks/data/use-transactions";
import { useTransactionsService } from "@/hooks/services/use-transactions-service";
import { Button, Text } from "react-native";

const HomeScreen = () => {
  const { transactions, mutateTransactions } = useTransactions();
  const transactionsService = useTransactionsService();

  return (
    <>
      <Text style={{ color: "red" }}>Hello World!</Text>
      <Button
        title="Create"
        onPress={() => {
          transactionsService
            .createTransaction({
              amount: Math.random(),
              description: Math.random().toString(36).substr(2, 6),
              isExpense: true,
            })
            .then((ct) =>
              mutateTransactions((t) => [...(t ?? []), ct], {
                revalidate: false,
              })
            );
        }}
      ></Button>
      <Button title="Read"></Button>
      {transactions?.map((transaction, index) => (
        <Text
          style={{ color: "red" }}
          key={index}
        >{`ID: ${transaction.id}, DESC: ${transaction.description}`}</Text>
      ))}
    </>
  );
};

export default HomeScreen;
