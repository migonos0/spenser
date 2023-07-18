import {ReactNode, useMemo} from 'react';
import {Snackbar} from 'react-native-paper';
import {useSnackbarState} from '../../state/snackbar.state';
import {useAppTheme} from '../../hooks/use-app-theme';
import classNames from 'classnames';
import {snackbarStoreActions} from '../../stores/snackbar.store';

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
        className={classNames({'border-t-4': borderTopColor})}
        style={{borderTopColor: borderTopColor}}
        visible={isVisible}
        onDismiss={snackbarStoreActions.hideSnackbar}>
        {message}
      </Snackbar>
    </>
  );
};
