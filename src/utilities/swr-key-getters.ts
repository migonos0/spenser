import {SWR_KEY_COMPONENTS} from '../constants/swr-key-components';
import {Tag} from '../entities/tag';
import {Account} from '../entities/account';

export const swrKeyGetters = {
  getUseMessagesKey: () => SWR_KEY_COMPONENTS.TRANSACTIONS,
  getUseTagsKey: () => SWR_KEY_COMPONENTS.TAGS,
  getUseAccountDtosKey: () => [
    SWR_KEY_COMPONENTS.ACCOUNTS,
    SWR_KEY_COMPONENTS.DTOS,
  ],
  getUseTransactionsByAccountKey: (account: Account) => [
    SWR_KEY_COMPONENTS.TRANSACTIONS,
    SWR_KEY_COMPONENTS.ACCOUNT,
    account,
  ],
  getUseAccountByIdKey: (accountId: Account['id']) => [
    SWR_KEY_COMPONENTS.ACCOUNT,
    accountId,
  ],
  getUseTransactionsByAccountAndTagIdsKey: (
    accountId: Account['id'],
    tagId: Tag['id'],
  ) => [
    SWR_KEY_COMPONENTS.TRANSACTIONS,
    SWR_KEY_COMPONENTS.ACCOUNT,
    accountId,
    SWR_KEY_COMPONENTS.TAG,
    tagId,
  ],
  getUseGroupDtosKey: () => [
    SWR_KEY_COMPONENTS.GROUPS,
    SWR_KEY_COMPONENTS.DTOS,
  ],
  getUseGroupsByAccountIdKey: (accountId: Account['id']) => [
    SWR_KEY_COMPONENTS.ACCOUNT,
    accountId,
    SWR_KEY_COMPONENTS.GROUPS,
  ],
};
