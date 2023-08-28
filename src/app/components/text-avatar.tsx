import {Avatar} from 'react-native-paper';
import {useAppTheme} from '../../hooks/use-app-theme';

interface TextAvatarProps {
  label?: string;
  class?: string;
}

export const TextAvatar = (props: TextAvatarProps) => {
  const {colors} = useAppTheme();

  return (
    <Avatar.Text
      className={props.class}
      size={48}
      label={props.label ?? ''}
      style={{backgroundColor: colors.onPrimary}}
    />
  );
};
