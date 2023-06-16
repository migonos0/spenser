import classNames from 'classnames';
import {ReactNode} from 'react';
import {Surface} from 'react-native-paper';
import {Appbar} from '../components/app-bar';
import {View} from 'react-native';
import {Colors} from '../../types/colors';
import {ChatBox} from '../components/chat-box';

interface ScreenLayoutProps {
  children?: ReactNode;
  twClass?: string;
  colors: Colors;
}

export const ScreenLayout = (props: ScreenLayoutProps) => (
  <Surface className={classNames('h-full flex', props.twClass)}>
    <Appbar
      avatarBackgroundColor={props.colors.primaryContainer}
      foregroundColor={props.colors.inverseOnSurface}
      backgroundColor={props.colors.primary}
    />

    <View className="flex-1 p-5">{props.children}</View>

    <ChatBox />
  </Surface>
);
