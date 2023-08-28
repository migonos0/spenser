import {DataSource} from 'typeorm';
import {Tracker} from '../entities/tracker';
import {Message} from '../entities/message';
import {number, safeParse} from 'valibot';
import {TrackerDto} from '../dtos/tracker.dto';

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

export const findAllTrackers = async (dataSource: DataSource) =>
  await dataSource.manager.find(Tracker, {order: {updatedAt: 'DESC'}});

export const findAllTrackerDtos = async (dataSource: DataSource) =>
  Promise.all(
    (await findAllTrackers(dataSource)).map(tracker =>
      TrackerDto.build(tracker)(dataSource),
    ),
  );

export const findTrackerById =
  (trackerId: Tracker['id']) => async (ds: DataSource) =>
    await ds.manager.findOneBy(Tracker, {id: trackerId});
