import {Tag} from '../entities/tag';
import {dataSource} from '../utilities/data-source';
import {FindOptionsRelations} from 'typeorm';

export const findAllTags = async () => await dataSource.manager.find(Tag);

export const findTagById = async (
  tagId: Tag['id'],
  relations?: FindOptionsRelations<Tag>,
) => {
  (await dataSource.manager.find(Tag, {where: {id: tagId}, relations})).at(0);
};

export const createTag = async (tag: Tag) =>
  await dataSource.manager.save(new Tag(tag));

export const createTags = async (tags: Tag[]) =>
  Promise.all(tags.map(tag => createTag(tag)));
