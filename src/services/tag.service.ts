import {Tag} from '../entities/tag';
import {Account} from '../entities/account';
import {Transaction} from '../entities/transaction';
import {dataSource} from '../utilities/data-source';
import {FindOptionsRelations} from 'typeorm';

export const findAllTags = async () => await dataSource.manager.find(Tag);

export const deleteTag = async (tag: Tag) => {
  const updatedTag = dataSource.manager.save(
    new Tag({...tag, transactions: []}),
  );
  return await dataSource.manager.remove(updatedTag);
};

export const deleteTagById = async (tagId: Tag['id']) => {
  const foundTag = await dataSource.manager.findOneBy(Tag, {id: tagId});
  if (!foundTag) {
    return;
  }
  return await deleteTag(foundTag);
};

export const findTagById = async (
  tagId: Tag['id'],
  relations?: FindOptionsRelations<Tag>,
) => {
  (await dataSource.manager.find(Tag, {where: {id: tagId}, relations})).at(0);
};

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

export const createTag = async (tag: Tag) =>
  await dataSource.manager.save(new Tag(tag));

export const createTags = async (tags: Tag[]) =>
  Promise.all(tags.map(tag => createTag(tag)));
