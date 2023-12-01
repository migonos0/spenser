import {FlatList, View} from 'react-native';
import {useCreateGroup, useGroupDtos} from '../../state/group.state';
import {ScreenLayout} from '../layouts/screen.layout';
import {GroupCard} from '../components/group-card';
import {Button, Dialog, FAB, Portal, TextInput} from 'react-native-paper';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {CreateGroupData} from '../../schemas/create-group.schema';
import {valibotResolver} from '@hookform/resolvers/valibot';
import {
  CreateAccountData,
  CreateAccountSchema,
} from '../../schemas/create-tracker.schema';
import {ErrorText} from '../components/error-text';
import {LOCALE} from '../../constants/locale';
import {Group} from '../../entities/group';

export const GroupsScreen = () => {
  const {groupDtos} = useGroupDtos();
  const [isNewGroupDialogVisible, setIsNewGroupDialogVisible] = useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<CreateGroupData>({
    resolver: valibotResolver(CreateAccountSchema),
  });
  const {createGroupTrigger} = useCreateGroup();

  const onNewGroupDialogDismiss = () => setIsNewGroupDialogVisible(false);

  const newGroupSubmitHandler: SubmitHandler<CreateAccountData> = input =>
    createGroupTrigger(new Group(input.name, input.description), {
      onSuccess: onNewGroupDialogDismiss,
    });

  return (
    <>
      <ScreenLayout>
        <FlatList
          data={groupDtos}
          keyExtractor={({id}, index) =>
            id ? id.toString() : index.toString()
          }
          renderItem={({item: groupDto}) => <GroupCard groupDto={groupDto} />}
        />
      </ScreenLayout>

      <View className="absolute bottom-0 right-0 p-5">
        <FAB icon={'plus'} onPress={() => setIsNewGroupDialogVisible(true)} />
      </View>

      <Portal>
        <Dialog
          visible={isNewGroupDialogVisible}
          onDismiss={onNewGroupDialogDismiss}>
          <Dialog.Title>New Group</Dialog.Title>
          <Dialog.Content>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, ...rest}}) => (
                <TextInput onChangeText={onChange} {...rest} label={'Name'} />
              )}
            />
            <ErrorText error={errors.name?.message} />

            <Controller
              control={control}
              name="description"
              render={({field: {onChange, ...rest}}) => (
                <TextInput
                  onChangeText={onChange}
                  {...rest}
                  label={'Description'}
                />
              )}
            />
            <ErrorText error={errors.description?.message} />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={onNewGroupDialogDismiss}>
              {LOCALE.common.dismiss}
            </Button>
            <Button onPress={handleSubmit(newGroupSubmitHandler)}>
              {LOCALE.common.create}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
