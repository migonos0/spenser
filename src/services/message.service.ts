import {DataSource} from 'typeorm';

import {Message} from '../entities/message';
import {Tracker} from '../entities/tracker';

export const createMessage =
  (message: Message) => async (dataSource: DataSource) => {
    if (message.tracker) {
      message.tracker.updatedAt = new Date();
      await dataSource.getRepository(Tracker).save(message.tracker);
    }

    return await dataSource.manager.save(message);
  };
export const deleteMessageById =
  (messageId: Message['id']) => async (dataSource: DataSource) => {
    const foundMessage = await dataSource.manager.findOne(Message, {
      relations: {tags: true, tracker: true},
      where: {id: messageId},
    });

    if (!foundMessage) {
      return;
    }

    const deletedMessage = await dataSource.manager.remove(foundMessage);

    if (foundMessage.tracker) {
      foundMessage.tracker.updatedAt = new Date();
      await dataSource.getRepository(Tracker).save(foundMessage.tracker);
    }

    return {...deletedMessage, id: messageId};
  };

export const findAllMessagesByTracker =
  (tracker: Tracker) => async (ds: DataSource) =>
    await ds.manager.find(Message, {
      where: {tracker},
      order: {id: 'DESC'},
      relations: {tags: true, tracker: true},
    });
