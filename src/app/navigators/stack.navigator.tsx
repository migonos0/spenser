import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from '../screens/chat.screen';
import {Appbar} from '../components/app-bar';
import {useAppTheme} from '../../hooks/use-app-theme';
import {NODE_ENV} from '../../constants/environment';
import {DEVELOPER_MENU_ITEMS} from '../../constants/menu-items';
import {useMessageAmountSummatory} from '../../state/message.state';

const StackNavigatorAppbar = () => {
  const {colors} = useAppTheme();
  const {messageAmountSummatory} = useMessageAmountSummatory();

  return (
    <Appbar
      avatarBackgroundColor={colors.primaryContainer}
      foregroundColor={colors.inverseOnSurface}
      backgroundColor={colors.primary}
      developerMenuItems={
        NODE_ENV === 'development' ? DEVELOPER_MENU_ITEMS : undefined
      }
      amountSummatory={messageAmountSummatory}
    />
  );
};

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="chat"
      screenOptions={{header: StackNavigatorAppbar}}>
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
