import 'reflect-metadata';
import {DataSource} from 'typeorm';

import {typeORMDriver} from 'react-native-quick-sqlite';
import {DB_NAME} from '../constants/db';
import {Tag} from '../entities/tag';
import {Message} from '../entities/message';
import {Tracker} from '../entities/tracker';

export const dataSource = new DataSource({
  type: 'react-native',
  database: DB_NAME,
  driver: typeORMDriver,
  entities: [Tag, Message, Tracker],
  synchronize: true,
  location: 'default',
});
