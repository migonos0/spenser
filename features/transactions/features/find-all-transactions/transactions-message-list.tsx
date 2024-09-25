import {FlatList} from 'react-native';
import {useTransactions} from './use-transactions';
import {TransactionCard} from '@/common/components/transaction-card';
import {useTheme} from 'react-native-paper';
import {useDeleteTransaction} from '../delete-transaction/use-delete-transaction';
import {Transaction} from '../../domain/transaction';

export const TransactionsMessageList = () => {
  const {transactions} = useTransactions();
  const {colors} = useTheme();
  const {deleteTransaction} = useDeleteTransaction();

  const makeHandleDeleteDialogItemPress = (item: Transaction) => () =>
    deleteTransaction(item);

  return (
    <FlatList
      inverted
      data={transactions}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item: transaction}) => (
        <TransactionCard
          longPressDialogItems={[
            {
              title: 'Eliminar',
              iconName: 'delete',
              onPress: makeHandleDeleteDialogItemPress(transaction),
            },
          ]}
          class="my-2"
          backgroundColor={
            transaction.isExpense
              ? colors.tertiaryContainer
              : colors.surfaceVariant
          }
          title={
            (transaction.isExpense ? '- ' : '+ ') +
            transaction.amount.toString()
          }
          body={transaction.description}
          tags={[]}
        />
      )}
    />
  );
};
