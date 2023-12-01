import {View} from 'react-native';
import {GroupDto} from '../../dtos/group.dto';
import {Text} from 'react-native-paper';

interface GroupCardProps {
  groupDto: GroupDto;
}

export const GroupCard = (props: GroupCardProps) => {
  return (
    <View>
      <Text>{props.groupDto.name}</Text>
      <Text>{props.groupDto.balance}</Text>
    </View>
  );
};
