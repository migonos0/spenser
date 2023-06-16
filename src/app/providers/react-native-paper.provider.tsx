import {ReactNode} from 'react';
import {PaperProvider} from 'react-native-paper';
import {useIsDarkMode} from '../../stores/theme.store';
import {DARK_THEME, LIGHT_THEME} from '../../constants/theme';
import {StatusBar} from 'react-native';
import {DARK_COLORS, LIGHT_COLORS} from '../../constants/colors';

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
        backgroundColor={
          isDarkMode ? DARK_COLORS.primary : LIGHT_COLORS.primary
        }
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
      />
      {props.children}
    </PaperProvider>
  );
};
