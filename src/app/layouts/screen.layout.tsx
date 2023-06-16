import classNames from 'classnames';
import {ReactNode} from 'react';
import {Surface} from 'react-native-paper';

interface ScreenLayoutProps {
  children?: ReactNode;
  twClass?: string;
}

export const ScreenLayout = (props: ScreenLayoutProps) => (
  <Surface className={classNames('h-full', props.twClass)}>
    {props.children}
  </Surface>
);
