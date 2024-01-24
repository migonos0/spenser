import {Account, AccountInput} from '../entities/account';
import {Transaction} from '../entities/transaction';
import {number, safeParse} from 'valibot';
import {AccountDto} from '../dtos/account.dto';
import {dataSource} from '../utilities/data-source';

export const createAccount = async (account: AccountInput) =>
  await dataSource.manager.save(new Account(account));

export const findBalanceByAccountId = async (accountId: Account['id']) => {
  const {balance} = await dataSource
    .createQueryBuilder()
    .from(Transaction, 'transaction')
    .select('SUM(transaction.amount)', 'balance')
    .where('transaction.accountId = :accountId', {accountId})
    .getRawOne();

  const parsedBalance = safeParse(number(), balance);

  if (!parsedBalance.success) {
    return;
  }

  return parsedBalance.data;
};

export const findAllAccounts = async () =>
  await dataSource.manager.find(Account, {
    order: {updatedAt: 'DESC'},
  });

export const findAllAccountDtos = async () =>
  Promise.all(
    (await findAllAccounts()).map(account => AccountDto.build(account)),
  );

export const findAccountById = async (accountId: Account['id']) =>
  (
    await dataSource.manager.find(Account, {
      where: {id: accountId},
      relations: {groups: true},
    })
  ).at(0);
