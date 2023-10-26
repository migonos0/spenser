import {FlatList, View} from 'react-native';
import {useCreateAccount, useAccountDtos} from '../../state/account.state';
import {ScreenLayout} from '../layouts/screen.layout';
import {Button, Dialog, FAB, Portal, TextInput} from 'react-native-paper';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  CreateAccountData,
  CreateAccountSchema,
} from '../../schemas/create-tracker.schema';
import {valibotResolver} from '@hookform/resolvers/valibot';
import {Account} from '../../entities/account';
import {AccountCard} from '../components/account-card';
import {ErrorText} from '../components/error-text';
import {LOCALE} from '../../constants/locale';
import {useLooseNavigation} from '../../hooks/use-loose-navigation';
import {ACCOUNTS_NAVIGATOR_SCREEN_NAMES} from '../../constants/navigation';
import {appbarActions} from '../../stores/appbar-store';
import {displayName} from '../../../app.json';
import {useFocusEffect} from '@react-navigation/native';

export const AccountsScreen = () => {
  const {accountDtos} = useAccountDtos();
  const [isNewAccountDialogVisible, setIsNewAccountDialogVisible] =
    useState(false);
  const {createAccountTrigger} = useCreateAccount();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<CreateAccountData>({
    resolver: valibotResolver(CreateAccountSchema),
  });
  const {navigate} = useLooseNavigation();

  useFocusEffect(() => {
    appbarActions.setTitle(displayName);
    appbarActions.setLeftComponent(undefined);
    appbarActions.setMiddleComponent(undefined);
  });

  const onNewAccountDialogDismiss = () => {
    setIsNewAccountDialogVisible(false);
    reset();
  };
  const newAccountSubmitHandler: SubmitHandler<CreateAccountData> = input =>
    createAccountTrigger(new Account(input.name, input.description), {
      onSuccess: onNewAccountDialogDismiss,
    });

  return (
    <>
      <ScreenLayout>
        <FlatList
          data={accountDtos}
          renderItem={({item: accountDto}) => (
            <AccountCard
              accountDto={accountDto}
              class="border-0 border-b-2"
              balance={accountDto.balance}
              onPress={() =>
                navigate(ACCOUNTS_NAVIGATOR_SCREEN_NAMES.TRANSACTIONS, {
                  accountId: accountDto.id,
                })
              }
            />
          )}
          keyExtractor={({id}, index) =>
            id ? id.toString() : index.toString()
          }
        />
      </ScreenLayout>

      <View className="absolute bottom-0 right-0 p-5">
        <FAB icon={'plus'} onPress={() => setIsNewAccountDialogVisible(true)} />
      </View>

      <Portal>
        <Dialog
          visible={isNewAccountDialogVisible}
          onDismiss={onNewAccountDialogDismiss}>
          <Dialog.Title>
            {LOCALE.screens.accounts.dialogs.createAccount.title}
          </Dialog.Title>
          <Dialog.Content>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, ...rest}}) => (
                <TextInput
                  {...rest}
                  onChangeText={onChange}
                  label={
                    LOCALE.screens.accounts.dialogs.createAccount.inputs.name
                  }
                />
              )}
            />
            <ErrorText error={errors.name?.message} />

            <Controller
              control={control}
              name="description"
              render={({field: {onChange, ...rest}}) => (
                <TextInput
                  {...rest}
                  onChangeText={onChange}
                  label={
                    LOCALE.screens.accounts.dialogs.createAccount.inputs
                      .description
                  }
                />
              )}
            />
            <ErrorText error={errors.description?.message} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onNewAccountDialogDismiss}>
              {LOCALE.common.dismiss}
            </Button>
            <Button onPress={handleSubmit(newAccountSubmitHandler)}>
              {LOCALE.common.create}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
