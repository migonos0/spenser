import {useEffect} from 'react';
import {appbarActions, useAppbarStore} from '../../stores/appbar-store';
import {Appbar} from '../components/appbar';
import {themeStoreActions} from '../../stores/theme.store';

export const AppbarProvider = () => {
  const {
    LeftComponent: leftComponent,
    menuItems,
    quickActions,
    title,
    MiddleComponent,
  } = useAppbarStore(state => state);

  useEffect(() => {
    appbarActions.setQuickActions([
      {iconName: 'theme-light-dark', onPress: themeStoreActions.switchTheme},
    ]);
  }, []);

  return (
    <Appbar
      MiddleComponent={MiddleComponent}
      LeftComponent={leftComponent}
      menuItems={menuItems}
      quickActions={quickActions}
      title={title}
    />
  );
};
