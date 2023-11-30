import {
  ACCOUNTS_NAVIGATOR_SCREEN_NAMES,
  SCREEN_NAMES,
} from '../../constants/screen-names';
import {TransactionsByAccountScreen} from '../screens/accounts/transactions-by-account.screen';
import {TransactionsByTagAndAccountScreen} from '../screens/transactions-by-tag-and-acount.screen';
import {HomeNavigator} from './home.navigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={SCREEN_NAMES.HOME}>
      <Stack.Screen name={SCREEN_NAMES.HOME} component={HomeNavigator} />
      <Stack.Screen
        name={SCREEN_NAMES.TRANSACTIONS_BY_ACCOUNT}
        component={TransactionsByAccountScreen}
      />
      <Stack.Screen
        name={ACCOUNTS_NAVIGATOR_SCREEN_NAMES.TRANSACTIONS_BY_TAG_ID}
        component={TransactionsByTagAndAccountScreen}
      />
    </Stack.Navigator>
  );
};
