import {useState} from 'react';
import {
  Avatar,
  Dialog,
  List,
  Appbar as PaperAppbar,
  Portal,
} from 'react-native-paper';

import {NODE_ENV} from '../../constants/environment';
import {themeStoreActions} from '../../stores/theme.store';
import {cn} from '../../utilities/cn';

export interface MenuItem {
  label: string;
  description?: string;
  iconName?: string;
  onTouch?: () => void;
}

export interface AppbarProps {
  backgroundColor?: string;
  foregroundColor?: string;
  actionBackgroundColor?: string;
  avatarBackgroundColor?: string;
  twClass?: string;
  userMenuItems?: MenuItem[];
  developerMenuItems?: MenuItem[];
  amountSummatory?: number;
}

export const Appbar = ({twClass, ...props}: AppbarProps) => {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  const onUserMenuDismiss = () => setIsUserMenuVisible(false);

  return (
    <>
      <PaperAppbar.Header
        className={cn('pl-5', twClass)}
        style={{backgroundColor: props.backgroundColor}}>
        <Avatar.Text
          className="mr-2"
          style={{backgroundColor: props.avatarBackgroundColor}}
          size={42}
          label="U"
          onTouchEnd={() => setIsUserMenuVisible(true)}
        />
        <PaperAppbar.Content
          titleStyle={{color: props.foregroundColor}}
          title={new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
          }).format(props.amountSummatory ?? 0)}
        />

        <PaperAppbar.Action
          containerColor={props.actionBackgroundColor}
          color={props.foregroundColor}
          icon="theme-light-dark"
          onPress={themeStoreActions.switchTheme}
        />
      </PaperAppbar.Header>

      {(props.userMenuItems || props.developerMenuItems) && (
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
      )}
    </>
  );
};
