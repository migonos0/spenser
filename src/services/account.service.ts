import {Account, AccountInput} from '../entities/account';
import {number, safeParse} from 'valibot';
import {AccountDto} from '../dtos/account.dto';
import {dataSource} from '../utilities/data-source';

export const createAccount = async (account: AccountInput) =>
  await dataSource.manager.save(new Account(account));

export const findBalanceByAccountId = async (accountId: Account['id']) => {
  const {balance} = await dataSource
    .createQueryBuilder()
    .from(Account, 'account')
    .innerJoin('account.transactions', 'transaction')
    .where('transaction.accountId = :accountId', {accountId})
    .select('SUM(transaction.amount)', 'balance')
    .getRawOne();

  const parsedBalance = safeParse(number(), balance);

  if (!parsedBalance.success) {
    return;
  }

  return parsedBalance.output;
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

export const updateAccountModificationDate = (account: Account, date?: Date) =>
  dataSource.manager.save(
    new Account({...account, updatedAt: date ?? new Date()}),
  );
