import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ACCOUNTS_NAVIGATOR_SCREEN_NAMES} from '../../constants/navigation';
import {TransactionsByAccountScreen} from '../screens/accounts/transactions-by-account.screen';
import {TransactionsByTagScreen} from '../screens/transactions-by-tag.screen';
import {AccountsScreen} from '../screens/accounts.screen';

const Stack = createNativeStackNavigator();

export const AccountsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ACCOUNTS_NAVIGATOR_SCREEN_NAMES.ACCOUNTS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ACCOUNTS_NAVIGATOR_SCREEN_NAMES.ACCOUNTS}
        component={AccountsScreen}
      />
      <Stack.Screen
        name={ACCOUNTS_NAVIGATOR_SCREEN_NAMES.TRANSACTIONS}
        component={TransactionsByAccountScreen}
      />
      <Stack.Screen
        name={ACCOUNTS_NAVIGATOR_SCREEN_NAMES.TRANSACTIONS_BY_TAG_ID}
        component={TransactionsByTagScreen}
      />
    </Stack.Navigator>
  );
};
