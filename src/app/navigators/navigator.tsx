import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NAVIGATOR_NAMES} from '../../constants/navigation';
import {TabBar} from '../components/tab-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AccountsNavigator} from './accounts.navigator';

const getBottomTabBarIconFC =
  (iconName: string) =>
  ({color, size}: {focused: boolean; color: string; size: number}) => {
    return <Icon name={iconName} size={size} color={color} />;
  };

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NAVIGATOR_NAMES.ACCOUNTS}
      tabBar={TabBar}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Accounts',
          tabBarIcon: getBottomTabBarIconFC('notebook'),
          tabBarStyle: {display: 'none'},
        }}
        name={NAVIGATOR_NAMES.ACCOUNTS}
        component={AccountsNavigator}
      />
    </Tab.Navigator>
  );
};
