import {Avatar, Appbar as PaperAppbar} from 'react-native-paper';
import {themeStoreActions} from '../../stores/theme.store';
import classNames from 'classnames';

interface AppbarProps {
  backgroundColor?: string;
  foregroundColor?: string;
  avatarBackgroundColor?: string;
  twClass?: string;
}

export const Appbar = (props: AppbarProps) => {
  return (
    <PaperAppbar.Header
      className={classNames(props.twClass)}
      style={{backgroundColor: props.backgroundColor}}>
      <Avatar.Text
        className="mr-2"
        style={{backgroundColor: props.avatarBackgroundColor}}
        size={42}
        label="MR"
      />
      <PaperAppbar.Content
        titleStyle={{color: props.foregroundColor}}
        title="500.35$"
      />

      <PaperAppbar.Action
        color={props.foregroundColor}
        icon="theme-light-dark"
        onPress={themeStoreActions.switchTheme}
      />
    </PaperAppbar.Header>
  );
};
