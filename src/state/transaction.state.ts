import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Transaction} from '../entities/transaction';
import {
  useSWRMutationOnInitializedDS,
  useSWRImmutableOnInitializedDS,
} from '../hooks/use-swr';
import {
  createTransaction,
  deleteTransactionById,
  findAllTransactionsByAccount,
} from '../services/transaction.service';
import {Account} from '../entities/account';
import {useSWRConfig} from 'swr';
import {AccountDto} from '../dtos/account.dto';

export const useTransactionsByAccount = (account?: Account) => {
  const key = account
    ? swrKeyGetters.getUseTransactionsByAccountKey(account)
    : undefined;
  const fetcher = account
    ? () => findAllTransactionsByAccount(account)
    : () => undefined;

  const {data} = useSWRImmutableOnInitializedDS(key, fetcher);

  return {transactions: data};
};

export const useDeleteTransactionByAccount = (account?: Account) => {
  const key = account
    ? swrKeyGetters.getUseTransactionsByAccountKey(account)
    : undefined;
  const {mutate} = useSWRConfig();

  const {trigger} = useSWRMutationOnInitializedDS(
    key,
    deleteTransactionById,
    (deletedTransaction, currentData: Transaction[] | undefined) => {
      if (!deletedTransaction) {
        return currentData;
      }

      /**
       * Decreasing to the balance of the account, removing and placing it on top.
       */
      mutate(
        swrKeyGetters.getUseAccountDtosKey(),
        (cachedAccountDtos: AccountDto[] | undefined) => {
          if (!cachedAccountDtos) {
            return;
          }
          const cachedAccountDtoIndex = cachedAccountDtos.findIndex(
            accountDto => accountDto.id === account?.id,
          );
          const cachedAccountDto = cachedAccountDtos.at(cachedAccountDtoIndex);
          if (!cachedAccountDto) {
            return cachedAccountDtos;
          }

          const cachedAccountDtosCopy = cachedAccountDtos.slice();
          cachedAccountDtosCopy.splice(cachedAccountDtoIndex, 1);

          return [
            {
              ...cachedAccountDto,
              balance:
                (cachedAccountDto.balance ?? 0) - deletedTransaction.amount,
            },
            ...cachedAccountDtosCopy,
          ];
        },
        {revalidate: false},
      );

      return currentData?.filter(
        transaction => transaction.id !== deletedTransaction.id,
      );
    },
  );

  return {deleteTransactionTrigger: trigger};
};

export const useCreateTransactionByAccount = (account?: Account) => {
  const key = account
    ? swrKeyGetters.getUseTransactionsByAccountKey(account)
    : undefined;
  const {mutate} = useSWRConfig();

  const {trigger} = useSWRMutationOnInitializedDS(
    key,
    createTransaction,
    (createdTransaction, currentData: Transaction[] | undefined) => {
      if (!createdTransaction) {
        return currentData;
      }

      /**
       * Adding to the balance of the tracker, removing and placing it on top.
       */
      mutate(
        swrKeyGetters.getUseAccountDtosKey(),
        (cachedAccountDtos: AccountDto[] | undefined) => {
          if (!cachedAccountDtos) {
            return;
          }
          const cachedAccountDtoIndex = cachedAccountDtos.findIndex(
            accountDto => accountDto.id === account?.id,
          );
          const cachedAccountDto = cachedAccountDtos.at(cachedAccountDtoIndex);
          if (!cachedAccountDto) {
            return cachedAccountDtos;
          }

          const cachedAccountDtosCopy = cachedAccountDtos.slice();
          cachedAccountDtosCopy.splice(cachedAccountDtoIndex, 1);

          return [
            {
              ...cachedAccountDto,
              balance:
                (cachedAccountDto.balance ?? 0) + createdTransaction.amount,
            },
            ...cachedAccountDtosCopy,
          ];
        },
        {revalidate: false},
      );

      return [createdTransaction, ...(currentData ?? [])];
    },
  );

  return {createTransactionTrigger: trigger};
};
