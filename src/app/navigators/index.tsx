import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {STACK_NAVIGATOR_SCREEN_NAMES} from '../../constants/stack-navigator-screen-names';
import {ChatScreen} from '../screens/chat.screen';
import {MessagesByTagIdScreen} from '../screens/messages-by-tag-id.screen';
import {TrackersScreen} from '../screens/trackers.screen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={STACK_NAVIGATOR_SCREEN_NAMES.TRACKERS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREEN_NAMES.TRACKERS}
        component={TrackersScreen}
      />
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
