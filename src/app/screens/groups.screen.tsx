import {FlatList, View} from 'react-native';
import {useCreateGroup, useGroupDtos} from '../../state/group.state';
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
import {Group} from '../../entities/group';
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
    setValue,
  } = useForm<CreateGroupData>({
    resolver: valibotResolver(CreateGroupSchema),
    defaultValues: {accounts: []},
  });
  const {createGroupTrigger} = useCreateGroup();
  const {accountDtos} = useAccountDtos();
  const {
    field: {value: selectedGroupAccounts},
  } = useController({control: control, name: 'accounts'});

  const onNewGroupDialogDismiss = () => setIsNewGroupDialogVisible(false);
  const onGroupAccountsDialogDismiss = () =>
    setIsGroupAccountsDialogVisible(false);

  const newGroupSubmitHandler: SubmitHandler<CreateGroupData> = input =>
    createGroupTrigger(
      new Group(input.name, input.description, input.accounts),
      {
        onSuccess: () => {
          onNewGroupDialogDismiss();
          onGroupAccountsDialogDismiss();
        },
      },
    );

  /**
   * This will only work when an AccountDto or any objects that has
   * all the attributes of the Account Entity. Due to difficulties with
   * typings, the 'accounts' field of the create-group schema has been
   * altered, though the type of this field does not accurately describes
   * what the field is able to support.
   * @param accountDto
   * @returns
   */
  const renderGroupAccountCheckbox = (accountDto: AccountDto) => {
    const isChecked = !!selectedGroupAccounts?.find(
      accounts => accounts.id === accountDto.id,
    );
    return (
      <Checkbox.Android
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() =>
          setValue(
            'accounts',
            isChecked
              ? selectedGroupAccounts?.filter(
                  account => account.id !== accountDto.id,
                )
              : [...(selectedGroupAccounts ?? []), accountDto],
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
