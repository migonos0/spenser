import {Text} from 'react-native-paper';
import {useAppTheme} from '../../hooks/use-app-theme';

interface ErrorTextProps {
  error?: string | number;
  color?: string;
}

export const ErrorText = (props: ErrorTextProps) => {
  const {colors} = useAppTheme();

  return (
    <Text style={{color: props.color ?? colors.error}}>{props.error}</Text>
  );
};
