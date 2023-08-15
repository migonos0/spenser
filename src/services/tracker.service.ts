import {DataSource} from 'typeorm';
import {Tracker} from '../entities/tracker';

export const createTracker =
  (tracker: Tracker) => async (dataSource: DataSource) =>
    await dataSource.manager.save(tracker);

export const findAllTrackers = async (dataSource: DataSource) =>
  await dataSource.manager.find(Tracker);
