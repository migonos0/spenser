import {StyleProp, TextStyle, TouchableOpacity, View} from 'react-native';
import {GroupDto} from '../../dtos/group.dto';
import {Dialog, List, Portal, Text} from 'react-native-paper';
import {cn} from '../../utilities/cn';
import {useAppTheme} from '../../hooks/use-app-theme';
import {TextAvatar} from './text-avatar';
import {useCallback, useState} from 'react';
import {impactAsync} from 'expo-haptics';

interface GroupCardProps {
  groupDto: GroupDto;
  borderColor?: string;
  longPressDialogItems?: {
    title: string;
    iconName?: string;
    onPress: () => void;
  }[];
}

export const GroupCard = (props: GroupCardProps) => {
  const {colors} = useAppTheme();
  const [isLongPressDialogVisible, setIsLongPressDialogVisible] =
    useState(false);

  const localOnLongPress = useCallback(() => {
    if (!props.longPressDialogItems) {
      return;
    }
    impactAsync();
    setIsLongPressDialogVisible(true);
  }, [props.longPressDialogItems]);
  const onLongPressDialogDismiss = useCallback(() => {
    setIsLongPressDialogVisible(false);
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
      <TouchableOpacity onLongPress={localOnLongPress}>
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
      </TouchableOpacity>

      {props.longPressDialogItems && (
        <Portal>
          <Dialog
            onDismiss={onLongPressDialogDismiss}
            visible={isLongPressDialogVisible}>
            <Dialog.Content>
              {props.longPressDialogItems.map((item, index) => (
                <List.Item
                  key={index}
                  onPress={() => {
                    item.onPress();
                    onLongPressDialogDismiss();
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
