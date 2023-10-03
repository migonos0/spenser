import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Account} from '../entities/account';
import {
  useSWRDataSourceMutation,
  useSWRImmutableDataSource,
} from '../hooks/use-swr';
import {
  createAccount,
  findAllAccountDtos,
  findAccountById,
} from '../services/account.service';
import {useMemo} from 'react';

export const useAccountDtos = () => {
  const {data} = useSWRImmutableDataSource(
    swrKeyGetters.getUseAccountDtosKey(),
    findAllAccountDtos,
  );

  return {accountDtos: data};
};

export const useCreateAccount = () => {
  const {trigger} = useSWRDataSourceMutation(
    swrKeyGetters.getUseAccountDtosKey(),
    createAccount,
    (createdAccount, currentData: Account[] | undefined) => {
      if (!createdAccount) {
        return currentData;
      }
      return [createdAccount, ...(currentData ?? [])];
    },
  );

  return {createAccountTrigger: trigger};
};

export const useAccountById = (accountId?: Account['id']) => {
  const key = accountId
    ? swrKeyGetters.getUseAccountByIdKey(accountId)
    : undefined;
  const fetcher = findAccountById(accountId);

  const {data} = useSWRImmutableDataSource(key, fetcher);

  return {account: data};
};

export const useAccountDtoById = (accountId?: Account['id']) => {
  const {accountDtos} = useAccountDtos();

  const data = useMemo(
    () => accountDtos?.find(accountDto => accountDto.id === accountId),
    [accountDtos, accountId],
  );

  return {accountDto: data};
};
