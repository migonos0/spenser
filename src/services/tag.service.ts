import {Tag} from '../entities/tag';
import {Account} from '../entities/account';
import {Transaction} from '../entities/transaction';
import {dataSource} from '../utilities/data-source';

export const findAllTags = async () => await dataSource.manager.find(Tag);

export const deleteTagById = async (tagId: Tag['id']) => {
  const foundTag = await dataSource.manager.findOneBy(Tag, {id: tagId});
  if (!foundTag) {
    return;
  }

  return await dataSource.manager.remove(foundTag);
};

export const findTagById = async (tagId: Tag['id']) =>
  await dataSource.manager.findOneBy(Tag, {id: tagId});

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

export const createTags = async (tags: Tag[]) => {
  const createdTags: Tag[] = [];

  for (const tag of tags) {
    createdTags.push(await createTag(tag));
  }

  return createdTags;
};
