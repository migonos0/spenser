import {List, Text} from 'react-native-paper';
import {View} from 'react-native';
import {useAppTheme} from '../../hooks/use-app-theme';
import {cn} from '../../utilities/cn';
import {AccountDto} from '../../dtos/account.dto';
import {TextAvatar} from './text-avatar';

interface AccountCardProps {
  accountDto: AccountDto;
  borderColor?: string;
  class?: string;
  balance?: number;
  onPress?: () => void;
}

export const AccountCard = (props: AccountCardProps) => {
  const {colors} = useAppTheme();

  return (
    <View
      onTouchEnd={props.onPress}
      className={cn(
        'flex flex-row items-center border-2 px-5 py-2',
        props.class,
      )}
      style={{borderColor: props.borderColor ?? colors.backdrop}}>
      <TextAvatar label={props.accountDto.name.slice(0, 2).toUpperCase()} />
      <List.Item
        className="flex-1"
        title={props.accountDto.name}
        description={props.accountDto.description}
      />
      <Text>
        {new Intl.NumberFormat('en-us', {
          style: 'currency',
          currency: 'USD',
        }).format(props.balance ?? 0)}
      </Text>
    </View>
  );
};
