import {useSnackbarStore} from '../stores/snackbar.store';

export const useSnackbarState = () => useSnackbarStore(state => state);
