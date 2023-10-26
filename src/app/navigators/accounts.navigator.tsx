import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ACCOUNTS_NAVIGATOR_SCREEN_NAMES} from '../../constants/navigation';
import {TransactionsByAccountScreen} from '../screens/accounts/transactions-by-account.screen';

const Tab = createBottomTabNavigator();

export const AccountsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ACCOUNTS_NAVIGATOR_SCREEN_NAMES.TRANSACTIONS_BY_ACCOUNT}
        component={TransactionsByAccountScreen}
      />
    </Tab.Navigator>
  );
};
