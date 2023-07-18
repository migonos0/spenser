import {create} from 'zustand';

interface SnackbarState {
  isVisible: boolean;
  message?: string;
  severity?: 'danger' | 'info' | 'warning' | 'success';
}

export const useSnackbarStore = create<SnackbarState>(() => ({
  isVisible: false,
}));

export const snackbarStoreActions = {
  showSnackbar(input: Required<Omit<SnackbarState, 'isVisible'>>) {
    useSnackbarStore.setState({
      message: input.message,
      severity: input.severity,
      isVisible: true,
    });
  },
  hideSnackbar() {
    useSnackbarStore.setState({isVisible: false});
  },
};
