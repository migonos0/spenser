import {FlatList} from 'react-native';

import {LOCALE} from '../../../constants/locale';
import {ACCOUNTS_NAVIGATOR_SCREEN_NAMES} from '../../../constants/screen-names';
import {Transaction} from '../../../entities/transaction';
import {Tag} from '../../../entities/tag';
import {useAppTheme} from '../../../hooks/use-app-theme';
import {useLooseNavigation} from '../../../hooks/use-loose-navigation';
import {
  useCreateTransactionByAccount,
  useDeleteTransactionByAccount,
  useTransactionsByAccount,
} from '../../../state/transaction.state';
import {useCreateTags, useTags} from '../../../state/tag.state';
import {
  findTags,
  getCreatableTransactionFromString,
} from '../../../utilities/transaction-pattern-finders';
import {ChatBox} from '../../components/chat-box';
import {TransactionCard} from '../../components/transaction-card';
import {ScreenLayout} from '../../layouts/screen.layout';
import {useLooseRoute} from '../../../hooks/use-loose-route';
import {useAccountById, useAccountDtoById} from '../../../state/account.state';
import {useEffect} from 'react';
import {appbarActions} from '../../../stores/appbar-store';
import {TextAvatar} from '../../components/text-avatar';
import {Text} from 'react-native-paper';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  CreateTransactionData,
  CreateTransactionSchema,
} from '../../../schemas/create-message.schema';
import {valibotResolver} from '@hookform/resolvers/valibot';

export const TransactionsByAccountScreen = () => {
  const {colors} = useAppTheme();
  const {tags} = useTags();
  const {params} = useLooseRoute();
  const {account} = useAccountById(
    params?.accountId ? +params.accountId : undefined,
  );
  const {accountDto: accountDto} = useAccountDtoById(
    params?.accountId ? +params.accountId : undefined,
  );
  const {createTransactionTrigger} = useCreateTransactionByAccount(
    account ?? undefined,
  );
  const {deleteTransactionTrigger} = useDeleteTransactionByAccount(
    account ?? undefined,
  );
  const {navigate} = useLooseNavigation();
  const {createTagsTrigger} = useCreateTags();
  const {transactions} = useTransactionsByAccount(account ?? undefined);
  const {control, handleSubmit, reset} = useForm<CreateTransactionData>({
    resolver: valibotResolver(CreateTransactionSchema),
  });

  useEffect(() => {
    appbarActions.setLeftComponent(
      <TextAvatar
        class="mr-2"
        label={account?.name.slice(0, 2).toUpperCase()}
      />,
    );
    appbarActions.setTitle(account?.name);
  }, [account?.name]);
  useEffect(() => {
    appbarActions.setMiddleComponent(
      <Text style={{color: colors.onPrimary}} variant="titleMedium">
        {new Intl.NumberFormat('en-us', {
          style: 'currency',
          currency: 'USD',
        }).format(accountDto?.balance ?? 0)}
      </Text>,
    );
  }, [accountDto?.balance, colors.onPrimary]);

  const createTransactionSubmitHandler: SubmitHandler<
    CreateTransactionData
  > = ({transaction}) => {
    if (!account) {
      return;
    }
    const tagNames = findTags(transaction);
    const alreadyCreatedTags = tags?.filter(tag =>
      tagNames?.includes(tag.name),
    );
    const creatableTags = tagNames
      ?.filter(tagName => !tags?.map(tag => tag.name).includes(tagName))
      .map(tagName => new Tag(tagName));
    createTagsTrigger(creatableTags ?? [], {
      onSuccess(createdTags) {
        const creatableTransaction = getCreatableTransactionFromString(
          transaction,
          tagNames,
        );
        createTransactionTrigger(
          new Transaction(
            creatableTransaction.isExpense,
            creatableTransaction.amount,
            creatableTransaction.description,
            account,
            [...(alreadyCreatedTags ?? []), ...(createdTags ?? [])],
          ),
          {onSuccess: reset as () => void},
        );
      },
    });
  };

  const getOnDeletePressHandler = (transaction: Transaction) => () =>
    deleteTransactionTrigger(transaction.id);

  return (
    <ScreenLayout
      footer={
        <Controller
          control={control}
          name="transaction"
          render={({field: {onChange, value, onBlur}}) => (
            <ChatBox
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              onSendButtonPress={handleSubmit(createTransactionSubmitHandler)}
            />
          )}
        />
      }>
      <FlatList
        inverted
        className="px-4"
        data={transactions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item: transaction}) => (
          <TransactionCard
            longPressDialogItems={[
              {
                title: LOCALE.common.delete,
                iconName: 'delete',
                onPress: getOnDeletePressHandler(transaction),
              },
            ]}
            class="m-2"
            backgroundColor={
              transaction.isExpense
                ? colors.tertiaryContainer
                : colors.surfaceVariant
            }
            title={
              (!transaction.isExpense ? '+' : '') +
              transaction.amount.toString()
            }
            body={transaction.description}
            tags={transaction.tags?.map(tag => ({
              label: tag.name,
              onPress: () => {
                navigate(
                  ACCOUNTS_NAVIGATOR_SCREEN_NAMES.TRANSACTIONS_BY_TAG_ID,
                  {
                    tagId: tag.id ?? -1,
                    transactionId: transaction.account?.id,
                  },
                );
              },
            }))}
          />
        )}
      />
    </ScreenLayout>
  );
};
