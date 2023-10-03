import {DataSource} from 'typeorm';

import {Transaction} from '../entities/transaction';
import {Account} from '../entities/account';

export const createTransaction =
  (transaction: Transaction) => async (dataSource: DataSource) => {
    if (transaction.account) {
      transaction.account.updatedAt = new Date();
      await dataSource.getRepository(Account).save(transaction.account);
    }

    return await dataSource.manager.save(transaction);
  };
export const deleteTransactionById =
  (transactionId: Transaction['id']) => async (dataSource: DataSource) => {
    const foundTransaction = await dataSource.manager.findOne(Transaction, {
      relations: {tags: true, account: true},
      where: {id: transactionId},
    });

    if (!foundTransaction) {
      return;
    }

    const deletedTransaction = await dataSource.manager.remove(
      foundTransaction,
    );

    if (foundTransaction.account) {
      foundTransaction.account.updatedAt = new Date();
      await dataSource.getRepository(Account).save(foundTransaction.account);
    }

    return {...deletedTransaction, id: transactionId};
  };

export const findAllTransactionsByAccount =
  (account: Account) => async (ds: DataSource) =>
    await ds.manager.find(Transaction, {
      where: {account: account},
      order: {id: 'DESC'},
      relations: {tags: true, account: true},
    });
