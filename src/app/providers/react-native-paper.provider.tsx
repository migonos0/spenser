import {ReactNode} from 'react';
import {PaperProvider} from 'react-native-paper';
import {useIsDarkMode} from '../../stores/theme.store';
import {DARK_THEME, LIGHT_THEME} from '../../constants/theme';

interface ReactNativePaperProviderProps {
  children?: ReactNode;
}
export const ReactNativePaperProvider = (
  props: ReactNativePaperProviderProps,
) => {
  const isDarkMode = useIsDarkMode();

  return (
    <PaperProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      {props.children}
    </PaperProvider>
  );
};
