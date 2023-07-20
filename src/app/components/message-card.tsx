import classNames from 'classnames';
import {StyleProp, TextStyle, View} from 'react-native';
import {Card, Dialog, List, Portal, Text} from 'react-native-paper';
import {trigger} from 'react-native-haptic-feedback';
import {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MessageCardProps {
  cardTitle?: string;
  body?: string;
  twClass?: string;
  isNotSentByTheUser?: boolean;
  backgroundColor?: string;
  longPressDialogItems?: {
    title: string;
    iconName?: string;
    onPress: () => void;
  }[];
}

export const MessageCard = (props: MessageCardProps) => {
  const [
    isMessageCardLongPressDialogVisible,
    setIsMessageCardLongPressDialogVisible,
  ] = useState(false);

  const localOnLongPress = useCallback(() => {
    if (!props.longPressDialogItems) {
      return;
    }
    trigger('impactLight');
    setIsMessageCardLongPressDialogVisible(true);
  }, [props.longPressDialogItems]);
  const onMessageCardLongPressDialogDismiss = useCallback(() => {
    setIsMessageCardLongPressDialogVisible(false);
  }, []);

  const longPressMessageIconItemRenderer = (
    props2: {
      color: string;
      style: StyleProp<TextStyle>;
    },
    iconName?: string,
  ) => iconName && <Icon size={24} name={iconName} {...props2} />;

  return (
    <>
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
      {props.longPressDialogItems && (
        <Portal>
          <Dialog
            onDismiss={onMessageCardLongPressDialogDismiss}
            visible={isMessageCardLongPressDialogVisible}>
            <Dialog.Content>
              {props.longPressDialogItems.map((item, index) => (
                <List.Item
                  key={index}
                  onPress={item.onPress}
                  title={item.title}
                  left={props2 =>
                    longPressMessageIconItemRenderer(props2, item.iconName)
                  }
                />
              ))}
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
    </>
  );
};
