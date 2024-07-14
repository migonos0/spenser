import { useCreateTransaction } from "@/hooks/data/use-create-transaction";
import { useTransactions } from "@/hooks/data/use-transactions";
import { Button, Text } from "react-native";

const HomeScreen = () => {
  const { transactions } = useTransactions();
  const { createTransaction } = useCreateTransaction();

  return (
    <>
      <Text className="text-yellow-500">Hello World!</Text>
      <Button
        title="Create"
        onPress={() => {
          createTransaction({
            amount: Math.random(),
            description: Math.random().toString(36).substring(2, 6),
            isExpense: true,
          });
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
