import {Transaction} from '../entities/transaction';
import {Account} from '../entities/account';
import {dataSource} from '../utilities/data-source';
import {Tag} from '../entities/tag';

export const createTransaction = async (transaction: Transaction) => {
  if (transaction.account) {
    transaction.account.updatedAt = new Date();
    await dataSource.getRepository(Account).save(transaction.account);
  }
  return await dataSource.manager.save(new Transaction(transaction));
};
export const deleteTransactionById = async (
  transactionId: Transaction['id'],
) => {
  const foundTransaction = await dataSource.manager.findOne(Transaction, {
    relations: {tags: true, account: true},
    where: {id: transactionId},
  });

  if (!foundTransaction) {
    return;
  }

  const deletedTransaction = await dataSource.manager.remove(foundTransaction);

  if (foundTransaction.account) {
    foundTransaction.account.updatedAt = new Date();
    await dataSource.getRepository(Account).save(foundTransaction.account);
  }

  return {...deletedTransaction, id: transactionId};
};

export const findAllTransactionsByAccount = async (account: Account) =>
  await dataSource.manager.find(Transaction, {
    where: {account: account},
    order: {id: 'DESC'},
    relations: {tags: true, account: true},
  });

export const findTransactionsByAccountAndTagIds = async (
  accountId: Account['id'],
  tagId: Tag['id'],
) =>
  await dataSource
    .getRepository(Transaction)
    .createQueryBuilder('transaction')
    .innerJoin('transaction.tags', 'tag')
    .where('transaction.accountId = :accountId', {accountId})
    .andWhere('tag.id = tagId', {tagId})
    .orderBy('transaction.id', 'DESC')
    .getMany();
