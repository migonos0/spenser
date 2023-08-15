import {ReactNode, useMemo} from 'react';
import {Snackbar} from 'react-native-paper';

import {useAppTheme} from '../../hooks/use-app-theme';
import {useSnackbarState} from '../../state/snackbar.state';
import {snackbarStoreActions} from '../../stores/snackbar.store';
import {cn} from '../../utilities/cn';

interface SnackbarProviderProps {
  children?: ReactNode;
}

export const SnackbarProvider = (props: SnackbarProviderProps) => {
  const {isVisible, message, severity} = useSnackbarState();
  const {colors} = useAppTheme();
  const borderTopColor = useMemo(() => {
    switch (severity) {
      case 'danger':
        return colors.onErrorContainer;
      case 'success':
        return colors.primaryContainer;
      case 'warning':
        return colors.secondaryContainer;
      default:
        return undefined;
    }
  }, [severity, colors]);

  return (
    <>
      {props.children}
      <Snackbar
        className={cn({'border-t-4': borderTopColor})}
        style={{borderTopColor}}
        visible={isVisible}
        onDismiss={snackbarStoreActions.hideSnackbar}>
        {message}
      </Snackbar>
    </>
  );
};
