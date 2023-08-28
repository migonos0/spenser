import {DataSource} from 'typeorm';

import {Tag} from '../entities/tag';
import {Tracker} from '../entities/tracker';
import {Message} from '../entities/message';

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

export const findMessagesByTrackerAndTagIds =
  (trackerId: Tracker['id'], tagId: Tag['id']) => async (ds: DataSource) =>
    await ds
      .getRepository(Message)
      .createQueryBuilder('message')
      .innerJoin('message.tags', 'tag')
      .where('message.trackerId = :trackerId', {trackerId})
      .andWhere('tag.id = tagId', {tagId})
      .orderBy('message.id', 'DESC')
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
