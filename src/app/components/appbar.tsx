import {ReactNode, useState} from 'react';
import {
  Dialog,
  List,
  Appbar as PaperAppbar,
  Portal,
  Text,
} from 'react-native-paper';
import {useAppTheme} from '../../hooks/use-app-theme';
import {View} from 'react-native';

interface QuickAction {
  iconName: string;
  onPress: () => void;
}

interface MenuItem {
  label: string;
  description?: string;
  iconName?: string;
  onPress: () => void;
}

export interface AppbarProps {
  LeftComponent?: ReactNode;
  title?: string | number;
  quickActions?: [QuickAction] | [QuickAction, QuickAction];
  menuItems?: MenuItem[];
  MiddleComponent?: ReactNode;
}

export const Appbar = (props: AppbarProps) => {
  const [areMenuItemsVisible, setAreMenuItemsVisible] = useState(false);
  const {colors} = useAppTheme();

  const onMenuItemsDismiss = () => setAreMenuItemsVisible(false);

  return (
    <>
      <View
        style={{backgroundColor: colors.primary}}
        className="flex flex-row items-center justify-center py-2 pl-5 pr-1 h-20">
        <View className="flex flex-grow flex-shrink basis-16 flex-row items-center">
          {props.LeftComponent}
          <Text
            style={{color: colors.onPrimary}}
            variant="titleLarge"
            className="flex-1">
            {props.title}
          </Text>
        </View>

        <View className="flex flex-shrink flex-grow basis-1 flex-row flex-wrap items-center justify-center mx-2">
          {props.MiddleComponent}
        </View>

        <View className="flex flex-grow flex-shrink basis-16 flex-row items-center justify-end">
          {props.quickActions &&
            props.quickActions.map((quickAction, index) => (
              <PaperAppbar.Action
                color={colors.onPrimary}
                key={index}
                icon={quickAction.iconName}
                onPress={quickAction.onPress}
              />
            ))}
          {props.menuItems && <PaperAppbar.Action icon="dots-vertical" />}
        </View>
      </View>

      {props.menuItems && (
        <Portal>
          <Dialog visible={areMenuItemsVisible} onDismiss={onMenuItemsDismiss}>
            <Dialog.Content>
              {props.menuItems.map((menuItem, index) => (
                <List.Item
                  key={index}
                  title={menuItem.label}
                  description={menuItem.description}
                  onTouchEnd={menuItem.onPress}
                />
              ))}
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
    </>
  );
};
