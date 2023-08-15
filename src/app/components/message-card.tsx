import {impactAsync} from 'expo-haptics';
import {useCallback, useState} from 'react';
import {StyleProp, TextStyle, View} from 'react-native';
import {Card, Chip, Dialog, List, Portal, Text} from 'react-native-paper';
import {cn} from '../../utilities/cn';

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
  tags?: {label: string; onPress?: () => void}[];
}

export const MessageCard = ({twClass, ...props}: MessageCardProps) => {
  const [
    isMessageCardLongPressDialogVisible,
    setIsMessageCardLongPressDialogVisible,
  ] = useState(false);

  const localOnLongPress = useCallback(() => {
    if (!props.longPressDialogItems) {
      return;
    }
    impactAsync();
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
  ) => iconName && <List.Icon {...props2} icon={iconName} />;

  return (
    <>
      <View
        className={cn(
          {'pr-8': props.isNotSentByTheUser, 'pl-8': !props.isNotSentByTheUser},
          twClass,
        )}>
        <Card
          onLongPress={localOnLongPress}
          style={{backgroundColor: props.backgroundColor}}>
          <View className="py-4">
            {props.cardTitle && (
              <Card.Content>
                <Text variant="titleMedium">{props.cardTitle}</Text>
              </Card.Content>
            )}
            {props.body && (
              <Card.Content>
                <Text variant="bodyMedium">{props.body}</Text>
              </Card.Content>
            )}
            {props.tags && (
              <Card.Content className="flex flex-row flow flex-wrap gap-1 mt-1">
                {props.tags.map((tag, index) => (
                  <Chip icon="pound" key={index} onPress={tag.onPress}>
                    {tag.label}
                  </Chip>
                ))}
              </Card.Content>
            )}
          </View>
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
                  onPress={() => {
                    item.onPress();
                    onMessageCardLongPressDialogDismiss();
                  }}
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
