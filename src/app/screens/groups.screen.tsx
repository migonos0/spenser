import {FlatList, View} from 'react-native';
import {
  useCreateGroup,
  useDeleteGroup,
  useGroupDtos,
} from '../../state/group.state';
import {ScreenLayout} from '../layouts/screen.layout';
import {GroupCard} from '../components/group-card';
import {
  Button,
  Checkbox,
  Dialog,
  FAB,
  List,
  Portal,
  TextInput,
} from 'react-native-paper';
import {useState} from 'react';
import {
  Controller,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import {
  CreateGroupData,
  CreateGroupSchema,
} from '../../schemas/create-group.schema';
import {valibotResolver} from '@hookform/resolvers/valibot';
import {ErrorText} from '../components/error-text';
import {LOCALE} from '../../constants/locale';
import {useAccountDtos} from '../../state/account.state';
import {AccountDto} from '../../dtos/account.dto';

export const GroupsScreen = () => {
  const {groupDtos} = useGroupDtos();
  const [isNewGroupDialogVisible, setIsNewGroupDialogVisible] = useState(false);
  const [isGroupAccountsDialogVisible, setIsGroupAccountsDialogVisible] =
    useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
    setValue,
  } = useForm<CreateGroupData & {accountDtos: AccountDto[]}>({
    resolver: valibotResolver(CreateGroupSchema),
    defaultValues: {accountDtos: []},
  });
  const {createGroupTrigger} = useCreateGroup();
  const {deleteGroupTrigger} = useDeleteGroup();
  const {accountDtos} = useAccountDtos();
  const {
    field: {value: selectedGroupAccountDtos},
  } = useController({control, name: 'accountDtos'});

  const onNewGroupDialogDismiss = () => setIsNewGroupDialogVisible(false);
  const onGroupAccountsDialogDismiss = () =>
    setIsGroupAccountsDialogVisible(false);

  const newGroupSubmitHandler: SubmitHandler<CreateGroupData> = input => {
    createGroupTrigger(
      {
        description: input.description,
        name: input.name,
        accountDtos: selectedGroupAccountDtos,
      },
      {
        onSuccess: () => {
          onNewGroupDialogDismiss();
          onGroupAccountsDialogDismiss();
          reset();
        },
      },
    );
  };

  const renderGroupAccountCheckbox = (accountDto: AccountDto) => {
    const isChecked = !!selectedGroupAccountDtos.find(
      account => account.id === accountDto.id,
    );
    return (
      <Checkbox.Android
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() =>
          setValue(
            'accountDtos',
            isChecked
              ? selectedGroupAccountDtos.filter(
                  account => account.id !== accountDto.id,
                )
              : [...selectedGroupAccountDtos, accountDto],
          )
        }
      />
    );
  };

  return (
    <>
      <ScreenLayout>
        <FlatList
          data={groupDtos}
          keyExtractor={({id}, index) =>
            id ? id.toString() : index.toString()
          }
          renderItem={({item: groupDto}) => (
            <GroupCard
              longPressDialogItems={[
                {
                  onPress: () =>
                    deleteGroupTrigger({
                      ...groupDto,
                      accounts: groupDto.accountDtos,
                    }),
                  title: 'Delete Group',
                  iconName: 'delete',
                },
              ]}
              groupDto={groupDto}
            />
          )}
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
            <Button onPress={() => setIsGroupAccountsDialogVisible(true)}>
              {LOCALE.common.create}
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={isGroupAccountsDialogVisible}
          onDismiss={onGroupAccountsDialogDismiss}>
          <Dialog.Title>Group Accounts</Dialog.Title>

          <Dialog.Content>
            <FlatList
              data={accountDtos}
              renderItem={({item: accountDto}) => (
                <List.Item
                  title={accountDto.name}
                  description={accountDto.description}
                  left={() => renderGroupAccountCheckbox(accountDto)}
                />
              )}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={onGroupAccountsDialogDismiss}>
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
