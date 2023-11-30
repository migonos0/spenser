import {FlatList} from 'react-native';

import {useAppTheme} from '../../hooks/use-app-theme';
import {useLooseRoute} from '../../hooks/use-loose-route';
import {useTransactionsByAccountAndTagIds} from '../../state/tag.state';
import {TransactionCard} from '../components/transaction-card';
import {ScreenLayout} from '../layouts/screen.layout';

export const TransactionsByTagAndAccountScreen = () => {
  const {params} = useLooseRoute();
  const tagId = params?.tagId;
  const transactionId = params?.transactionId;
  const {colors} = useAppTheme();
  const {transactions: transactions} = useTransactionsByAccountAndTagIds(
    +(transactionId ?? -1),
    +(tagId ?? -1),
  );

  return (
    <ScreenLayout>
      <FlatList
        inverted
        className="px-4"
        data={transactions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item: message}) => (
          <TransactionCard
            class="m-2"
            backgroundColor={
              message.isExpense
                ? colors.tertiaryContainer
                : colors.surfaceVariant
            }
            title={(!message.isExpense ? '+' : '') + message.amount.toString()}
            body={message.description}
          />
        )}
      />
    </ScreenLayout>
  );
};
