import classNames from 'classnames';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';

interface MessageCardProps {
  cardTitle?: string;
  body?: string;
  twClass?: string;
  isNotSentByTheUser?: boolean;
  backgroundColor?: string;
}

export const MessageCard = (props: MessageCardProps) => {
  return (
    <View
      className={classNames(
        {'pr-8': props.isNotSentByTheUser, 'pl-8': !props.isNotSentByTheUser},
        props.twClass,
      )}>
      <Card style={{backgroundColor: props.backgroundColor}}>
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
