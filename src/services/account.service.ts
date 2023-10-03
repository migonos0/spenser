import {DataSource} from 'typeorm';
import {Account} from '../entities/account';
import {Transaction} from '../entities/transaction';
import {number, safeParse} from 'valibot';
import {AccountDto} from '../dtos/account.dto';

export const createAccount =
  (account: Account) => async (dataSource: DataSource) =>
    await dataSource.manager.save(account);

export const findBalanceByAccountId =
  (accountId: Account['id']) => async (dataSource: DataSource) => {
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

export const findAllAccounts = async (dataSource: DataSource) =>
  await dataSource.manager.find(Account, {order: {updatedAt: 'DESC'}});

export const findAllAccountDtos = async (dataSource: DataSource) =>
  Promise.all(
    (await findAllAccounts(dataSource)).map(account =>
      AccountDto.build(account)(dataSource),
    ),
  );

export const findAccountById =
  (accountId: Account['id']) => async (ds: DataSource) =>
    await ds.manager.findOneBy(Account, {id: accountId});
