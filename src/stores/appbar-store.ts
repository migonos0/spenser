import {create} from 'zustand';
import {AppbarProps} from '../app/components/appbar';

export const useAppbarStore = create<AppbarProps>(() => ({}));

export const appbarActions = {
  setTitle(title: AppbarProps['title']) {
    useAppbarStore.setState({title: title});
  },
  setLeftComponent(leftComponent: AppbarProps['LeftComponent']) {
    useAppbarStore.setState({LeftComponent: leftComponent});
  },
  setQuickActions(quickActions: AppbarProps['quickActions']) {
    useAppbarStore.setState({quickActions: quickActions});
  },
  setMenuItems(menuItems: AppbarProps['menuItems']) {
    useAppbarStore.setState({menuItems: menuItems});
  },
  setMiddleComponent(middleComponent: AppbarProps['MiddleComponent']) {
    useAppbarStore.setState({MiddleComponent: middleComponent});
  },
};

export const appbarSelectors = {
  useTitle: () => useAppbarStore(state => state.title),
  useLeftCompnent: () => useAppbarStore(state => state.LeftComponent),
  useQuickActions: () => useAppbarStore(state => state.quickActions),
  useMenuItems: () => useAppbarStore(state => state.menuItems),
};
