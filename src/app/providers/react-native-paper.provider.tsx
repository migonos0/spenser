import {StatusBar} from 'expo-status-bar';
import {ReactNode} from 'react';
import {PaperProvider} from 'react-native-paper';

import {DARK_COLORS, LIGHT_COLORS} from '../../constants/colors';
import {DARK_THEME, LIGHT_THEME} from '../../constants/theme';
import {useIsDarkMode} from '../../stores/theme.store';

interface ReactNativePaperProviderProps {
  children?: ReactNode;
}

export const ReactNativePaperProvider = (
  props: ReactNativePaperProviderProps,
) => {
  const isDarkMode = useIsDarkMode();

  return (
    <PaperProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <StatusBar
        style={isDarkMode ? 'dark' : 'light'}
        backgroundColor={
          isDarkMode ? DARK_COLORS.primary : LIGHT_COLORS.primary
        }
      />
      {props.children}
    </PaperProvider>
  );
};
