import {
  ACCOUNTS_NAVIGATOR_SCREEN_NAMES,
  NAVIGATOR_NAMES,
} from '../../constants/navigation';
import {TransactionsByAccountScreen} from '../screens/accounts/transactions-by-account.screen';
import {TransactionsByTagScreen} from '../screens/transactions-by-tag.screen';
import {AccountsNavigator} from './accounts.navigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NAVIGATOR_NAMES.ACCOUNTS}>
      <Stack.Screen
        name={NAVIGATOR_NAMES.ACCOUNTS}
        component={AccountsNavigator}
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
