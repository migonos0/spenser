import {ReactNode} from 'react';
import {View} from 'react-native';
import {Surface} from 'react-native-paper';
import {cn} from '../../utilities/cn';

interface ScreenLayoutProps {
  children?: ReactNode;
  twClass?: string;
  footer?: ReactNode;
}

export const ScreenLayout = ({twClass, ...props}: ScreenLayoutProps) => (
  <Surface className={cn('h-full flex', twClass)}>
    <View className="flex-1">{props.children}</View>

    <View>{props.footer}</View>
  </Surface>
);
