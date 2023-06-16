import {persist} from 'zustand/middleware';
import {zustandPersistentStorage} from '../lib/zustand';
import {create} from 'zustand';
import {Appearance} from 'react-native';

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
