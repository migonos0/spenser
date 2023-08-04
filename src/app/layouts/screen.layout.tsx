import classNames from 'classnames';
import {ReactNode} from 'react';
import {Surface} from 'react-native-paper';
import {View} from 'react-native';
import {Colors} from '../../types/colors';

interface ScreenLayoutProps {
  children?: ReactNode;
  twClass?: string;
  colors: Colors;
  footer?: ReactNode;
}

export const ScreenLayout = (props: ScreenLayoutProps) => (
  <Surface className={classNames('h-full flex', props.twClass)}>
    <View className="flex-1">{props.children}</View>

    <View>{props.footer}</View>
  </Surface>
);
