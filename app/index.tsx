import {CreateTransactionChatBox} from '@/features/transactions/features/create-transaction/create-transaction-chat-box';
import {TransactionsMessageList} from '@/features/transactions/features/find-all-transactions/transactions-message-list';
import {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {AppBarContext} from './_layout';
import {useBalance} from '@/features/transactions/features/find-balance/use-balance';

export default function Index() {
  const {balance} = useBalance();
  const appbarContext = useContext(AppBarContext);

  useEffect(() => {
    if (!balance || balance === 0 || !appbarContext) {
      return;
    }
    appbarContext.setTitle(balance.toString());
  }, [appbarContext, balance]);

  return (
    <View className="h-full px-4 pb-4">
      <TransactionsMessageList />
      <CreateTransactionChatBox />
    </View>
  );
}
