import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATOR_NAMES} from '../../constants/navigation';
import {AccountsNavigator} from './accounts.navigator';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATOR_NAMES.ACCOUNTS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={NAVIGATOR_NAMES.ACCOUNTS}
        component={AccountsNavigator}
      />
    </Stack.Navigator>
  );
};
