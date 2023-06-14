import {ReactNode} from 'react';
import {View} from 'react-native';

interface ScreenLayoutProps {
  children?: ReactNode;
}

export const ScreenLayout = (props: ScreenLayoutProps) => (
  <View>{props.children}</View>
);
