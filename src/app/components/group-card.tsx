import {View} from 'react-native';
import {GroupDto} from '../../dtos/group.dto';
import {List, Text} from 'react-native-paper';
import {cn} from '../../utilities/cn';
import {useAppTheme} from '../../hooks/use-app-theme';
import {TextAvatar} from './text-avatar';

interface GroupCardProps {
  groupDto: GroupDto;
  borderColor?: string;
}

export const GroupCard = (props: GroupCardProps) => {
  const {colors} = useAppTheme();

  return (
    <View
      className={cn('border-b-2 px-5 py-2 flex flex-row items-center')}
      style={{borderColor: props.borderColor ?? colors.backdrop}}>
      <TextAvatar label={props.groupDto.name.slice(0, 2).toUpperCase()} />
      <List.Item
        className="flex-1"
        title={props.groupDto.name}
        description={props.groupDto.description}
      />
      <Text>
        {new Intl.NumberFormat('en-us', {
          style: 'currency',
          currency: 'USD',
        }).format(props.groupDto.balance ?? 0)}
      </Text>
    </View>
  );
};
