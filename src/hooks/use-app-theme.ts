import {useTheme} from 'react-native-paper';
import {LIGHT_THEME} from '../constants/theme';

export const useAppTheme = useTheme<typeof LIGHT_THEME>;
