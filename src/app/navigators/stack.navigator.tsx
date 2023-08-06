import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from '../screens/chat.screen';
import {Appbar} from '../components/app-bar';
import {useAppTheme} from '../../hooks/use-app-theme';
import {NODE_ENV} from '../../constants/environment';
import {DEVELOPER_MENU_ITEMS} from '../../constants/menu-items';
import {useMessageAmountSummatory} from '../../state/message.state';
import {MessagesByTagIdScreen} from '../screens/messages-by-tag-id.screen';
import {STACK_NAVIGATOR_SCREEN_NAMES} from '../../constants/stack-navigator-screen-names';

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
      initialRouteName={STACK_NAVIGATOR_SCREEN_NAMES.CHAT}
      screenOptions={{header: StackNavigatorAppbar}}>
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREEN_NAMES.CHAT}
        component={ChatScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREEN_NAMES.MESSAGES_BY_TAG_ID}
        component={MessagesByTagIdScreen}
      />
    </Stack.Navigator>
  );
};
