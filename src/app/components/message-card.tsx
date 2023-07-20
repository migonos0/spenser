import classNames from 'classnames';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {trigger} from 'react-native-haptic-feedback';
import {useCallback} from 'react';

interface MessageCardProps {
  cardTitle?: string;
  body?: string;
  twClass?: string;
  isNotSentByTheUser?: boolean;
  backgroundColor?: string;
  onLongPress?: () => void;
}

export const MessageCard = (props: MessageCardProps) => {
  const {onLongPress} = props;

  const localOnLongPress = useCallback(() => {
    if (!onLongPress) {
      return;
    }
    trigger('impactLight');
    onLongPress();
  }, [onLongPress]);

  return (
    <View
      className={classNames(
        {'pr-8': props.isNotSentByTheUser, 'pl-8': !props.isNotSentByTheUser},
        props.twClass,
      )}>
      <Card
        onLongPress={localOnLongPress}
        style={{backgroundColor: props.backgroundColor}}>
        {props.cardTitle && (
          <Card.Content className={classNames({'mb-4': !props.body})}>
            <Text variant="titleMedium">{props.cardTitle}</Text>
          </Card.Content>
        )}
        {props.body && (
          <Card.Content>
            <Text variant="bodyMedium">{props.body}</Text>
          </Card.Content>
        )}
      </Card>
    </View>
  );
};
