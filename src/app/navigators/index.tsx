import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NAVIGATOR_SCREEN_NAMES} from '../../constants/navigator-screen-names';
import {TransactionsScreen} from '../screens/transactions.screen';
import {TransactionsByTagScreen} from '../screens/transactions-by-tag.screen';
import {AccountsScreen} from '../screens/accounts.screen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATOR_SCREEN_NAMES.ACCOUNTS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={NAVIGATOR_SCREEN_NAMES.ACCOUNTS}
        component={AccountsScreen}
      />
      <Stack.Screen
        name={NAVIGATOR_SCREEN_NAMES.TRANSACTIONS}
        component={TransactionsScreen}
      />
      <Stack.Screen
        name={NAVIGATOR_SCREEN_NAMES.TRANSACTIONS_BY_TAG_ID}
        component={TransactionsByTagScreen}
      />
    </Stack.Navigator>
  );
};
