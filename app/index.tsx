import {CreateTransactionChatBox} from '@/features/transactions/features/create-transaction/create-transaction-chat-box';
import {TransactionsMessageList} from '@/features/transactions/features/find-all-transactions/transactions-message-list';
import {View} from 'react-native';

export default function Index() {
  return (
    <View className="h-full px-4 pb-4">
      <TransactionsMessageList />
      <CreateTransactionChatBox />
    </View>
  );
}
