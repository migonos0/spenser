import {Appearance} from 'react-native';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {zustandPersistentStorage} from '../utilities/zustand-persistent-storage';

interface ThemeState {
  isDarkMode: boolean;
}

const useThemeStore = create<ThemeState>()(
  persist(() => ({isDarkMode: Appearance.getColorScheme() === 'dark'}), {
    name: 'theme-state',
    storage: zustandPersistentStorage,
  }),
);
export const useIsDarkMode = () => useThemeStore(state => state.isDarkMode);

export const themeStoreActions = {
  switchTheme() {
    useThemeStore.setState({isDarkMode: !useThemeStore.getState().isDarkMode});
  },
};
