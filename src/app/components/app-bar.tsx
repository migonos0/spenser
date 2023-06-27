import {
  Avatar,
  Dialog,
  List,
  Appbar as PaperAppbar,
  Portal,
} from 'react-native-paper';
import {themeStoreActions} from '../../stores/theme.store';
import classNames from 'classnames';
import {useState} from 'react';
import {NODE_ENV} from '../../constants/environment';

export interface MenuItem {
  label: string;
  description?: string;
  iconName?: string;
  onTouch?: () => void;
}

interface AppbarProps {
  backgroundColor?: string;
  foregroundColor?: string;
  actionBackgroundColor?: string;
  avatarBackgroundColor?: string;
  twClass?: string;
  userMenuItems?: MenuItem[];
  developerMenuItems?: MenuItem[];
}

export const Appbar = (props: AppbarProps) => {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  const onUserMenuDismiss = () => setIsUserMenuVisible(false);

  return (
    <>
      <PaperAppbar.Header
        className={classNames('pl-5', props.twClass)}
        style={{backgroundColor: props.backgroundColor}}>
        <Avatar.Text
          className="mr-2"
          style={{backgroundColor: props.avatarBackgroundColor}}
          size={42}
          label="MR"
          onTouchEnd={() => setIsUserMenuVisible(true)}
        />
        <PaperAppbar.Content
          titleStyle={{color: props.foregroundColor}}
          title="500.35$"
        />

        <PaperAppbar.Action
          containerColor={props.actionBackgroundColor}
          color={props.foregroundColor}
          icon="theme-light-dark"
          onPress={themeStoreActions.switchTheme}
        />
      </PaperAppbar.Header>

      <Portal>
        <Dialog visible={isUserMenuVisible} onDismiss={onUserMenuDismiss}>
          <Dialog.Title>User Menu</Dialog.Title>

          <Dialog.Content>
            {props.userMenuItems?.map((menuItem, index) => (
              <List.Item
                key={index}
                title={menuItem.label}
                description={menuItem.description}
                onTouchEnd={menuItem.onTouch}
              />
            ))}
            {NODE_ENV === 'development' &&
              props.developerMenuItems?.map((menuItem, index) => (
                <List.Item
                  key={index}
                  title={menuItem.label}
                  description={menuItem.description}
                  onTouchEnd={menuItem.onTouch}
                />
              ))}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};
