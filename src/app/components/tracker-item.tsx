import {Avatar, List} from 'react-native-paper';
import {Tracker} from '../../entities/tracker';
import {View} from 'react-native';
import {useAppTheme} from '../../hooks/use-app-theme';
import {cn} from '../../utilities/cn';

interface TrackerItemProps {
  tracker: Tracker;
  borderColor?: string;
  class?: string;
}

export const TrackerItem = (props: TrackerItemProps) => {
  const {colors} = useAppTheme();

  return (
    <View
      className={cn(
        'flex flex-row items-center border-2 px-5 py-2',
        props.class,
      )}
      style={{borderColor: props.borderColor ?? colors.backdrop}}>
      <Avatar.Text
        size={48}
        label={props.tracker.name.slice(0, 2).toUpperCase()}
      />
      <List.Item
        className="flex-1"
        title={props.tracker.name}
        description={props.tracker.description}
      />
    </View>
  );
};
