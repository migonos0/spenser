import {Transaction} from '../entities/transaction';
import {Account} from '../entities/account';
import {dataSource} from '../utilities/data-source';
import {Tag} from '../entities/tag';

export const createTransaction = async (transaction: Transaction) =>
  await dataSource.manager.save(new Transaction(transaction));

export const deleteTransaction = async (transaction: Transaction) => {
  const updatedTransaction = await dataSource.manager.save(
    new Transaction({...transaction, tags: []}),
  );
  return {
    ...(await dataSource.manager.remove(updatedTransaction)),
    id: transaction.id,
  };
};

export const deleteTransactionById = async (
  transactionId: Transaction['id'],
) => {
  const foundTransaction = await dataSource.manager.findOne(Transaction, {
    where: {id: transactionId},
  });
  if (!foundTransaction) {
    throw new Error('The given Transaction Id does not exist.');
  }
  return await deleteTransaction(foundTransaction);
};

export const findAllTransactionsByAccount = async (account: Account) =>
  await dataSource.manager.find(Transaction, {
    where: {account},
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
