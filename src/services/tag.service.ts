import {DataSource} from 'typeorm';

import {Tag} from '../entities/tag';
import {Account} from '../entities/account';
import {Transaction} from '../entities/transaction';

export const findAllTags = async (dataSource: DataSource) =>
  await dataSource.manager.find(Tag);

export const deleteTagById =
  (tagId: Tag['id']) => async (dataSource: DataSource) => {
    const foundTag = await dataSource.manager.findOneBy(Tag, {id: tagId});
    if (!foundTag) {
      return;
    }

    return await dataSource.manager.remove(foundTag);
  };

export const findTagById =
  (tagId: Tag['id']) => async (dataSource: DataSource) =>
    await dataSource.manager.findOneBy(Tag, {id: tagId});

export const findTransactionsByAccountAndTagIds =
  (accountId: Account['id'], tagId: Tag['id']) => async (ds: DataSource) =>
    await ds
      .getRepository(Transaction)
      .createQueryBuilder('transaction')
      .innerJoin('transaction.tags', 'tag')
      .where('transaction.accountId = :accountId', {accountId})
      .andWhere('tag.id = tagId', {tagId})
      .orderBy('transaction.id', 'DESC')
      .getMany();

export const createTag = (tag: Tag) => async (dataSource: DataSource) =>
  await dataSource.manager.save(tag);

export const createTags = (tags: Tag[]) => async (dataSource: DataSource) => {
  const createdTags: Tag[] = [];

  for (const tag of tags) {
    createdTags.push(await createTag(tag)(dataSource));
  }

  return createdTags;
};
