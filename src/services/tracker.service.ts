import {DataSource} from 'typeorm';
import {Tracker} from '../entities/tracker';
import {Message} from '../entities/message';
import {number, safeParse} from 'valibot';

export const createTracker =
  (tracker: Tracker) => async (dataSource: DataSource) =>
    await dataSource.manager.save(tracker);

export const findBalanceByTrackerId =
  (trackerId: Tracker['id']) => async (dataSource: DataSource) => {
    const {balance} = await dataSource
      .createQueryBuilder()
      .from(Message, 'message')
      .select('SUM(message.amount)', 'balance')
      .where('message.trackerId = :trackerId', {trackerId})
      .getRawOne();

    const parsedBalance = safeParse(number(), balance);

    if (!parsedBalance.success) {
      return;
    }

    return parsedBalance.data;
  };

export const findAllTrackers = async (dataSource: DataSource) => {
  const trackers = await dataSource.manager.find(Tracker, {
    order: {updatedAt: {direction: 'DESC'}},
  });
  for (const tracker of trackers) {
    tracker.balance = await findBalanceByTrackerId(tracker.id)(dataSource);
  }
  return trackers;
};
