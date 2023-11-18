import {ACCOUNTS_NAVIGATOR_SCREEN_NAMES} from '../../constants/navigation';
import {TabBar} from '../components/tab-bar';
import {AccountsScreen} from '../screens/accounts.screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const getBottomTabBarIconFC =
  (iconName: string) =>
  ({color, size}: {focused: boolean; color: string; size: number}) => {
    return <Icon name={iconName} size={size} color={color} />;
  };

const Tab = createBottomTabNavigator();

export const AccountsNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      initialRouteName={ACCOUNTS_NAVIGATOR_SCREEN_NAMES.ACCOUNTS}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Accounts',
          tabBarIcon: getBottomTabBarIconFC('notebook'),
        }}
        name={ACCOUNTS_NAVIGATOR_SCREEN_NAMES.ACCOUNTS}
        component={AccountsScreen}
      />
    </Tab.Navigator>
  );
};
