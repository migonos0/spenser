import classNames from 'classnames';
import {ReactNode} from 'react';
import {Surface} from 'react-native-paper';
import {Appbar} from '../components/app-bar';
import {View} from 'react-native';
import {Colors} from '../../types/colors';
import {DEVELOPER_MENU_ITEMS} from '../../constants/menu-items';

interface ScreenLayoutProps {
  children?: ReactNode;
  twClass?: string;
  colors: Colors;
  footer?: ReactNode;
}

export const ScreenLayout = (props: ScreenLayoutProps) => (
  <Surface className={classNames('h-full flex', props.twClass)}>
    <Appbar
      avatarBackgroundColor={props.colors.primaryContainer}
      foregroundColor={props.colors.inverseOnSurface}
      backgroundColor={props.colors.primary}
      developerMenuItems={DEVELOPER_MENU_ITEMS}
    />

    <View className="flex-1">{props.children}</View>

    <View>{props.footer}</View>
  </Surface>
);
