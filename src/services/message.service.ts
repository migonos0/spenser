import {number} from 'zod';
import {DataSource} from 'typeorm';
import {Message} from '../entities/message';

export const findAllMessages =
  ({ascendant}: {ascendant?: boolean}) =>
  async (dataSource: DataSource) =>
    await dataSource.manager.find(Message, {
      order: {id: ascendant ? 'ASC' : 'DESC'},
      relations: {tags: true},
    });

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

    return await dataSource.manager.remove(foundMessage);
  };

export const findMessageAmountSummatory = async (dataSource: DataSource) => {
  const {sum} = await dataSource
    .getRepository(Message)
    .createQueryBuilder('message')
    .select('SUM(message.amount)', 'sum')
    .getRawOne();

  const parsedMessageAmountSummatory = number().safeParse(sum);

  if (!parsedMessageAmountSummatory.success) {
    return;
  }

  return parsedMessageAmountSummatory.data;
};

export const findMessageById =
  (messageId: Message['id']) => async (dataSource: DataSource) =>
    await dataSource.manager.findOneBy(Message, {id: messageId});
