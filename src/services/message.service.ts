import {DataSource} from 'typeorm';

import {Message} from '../entities/message';
import {Tracker} from '../entities/tracker';

export const createMessage =
  (message: Message) => async (dataSource: DataSource) =>
    await dataSource.manager.save(message);

export const deleteMessageById =
  (messageId: Message['id']) => async (dataSource: DataSource) => {
    const foundMessage = await dataSource.manager.findOne(Message, {
      relations: {tags: true},
      where: {id: messageId},
    });

    if (!foundMessage) {
      return;
    }

    return {...(await dataSource.manager.remove(foundMessage)), id: messageId};
  };

export const findMessageById =
  (messageId: Message['id']) => async (dataSource: DataSource) =>
    await dataSource.manager.findOneBy(Message, {id: messageId});

export const findAllMessagesByTracker =
  (tracker: Tracker) => async (ds: DataSource) =>
    await ds.manager.find(Message, {
      where: {tracker},
      order: {id: 'DESC'},
      relations: {tags: true},
    });
