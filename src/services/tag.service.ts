import {DataSource} from 'typeorm';
import {Tag} from '../entities/tag';

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

export const findMessagesByTagId =
  (tagId: Tag['id']) => async (dataSource: DataSource) =>
    (await dataSource.manager.findOneBy(Tag, {id: tagId}))?.messages;
