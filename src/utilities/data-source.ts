import 'reflect-metadata';
import {DataSource} from 'typeorm';

import {typeORMDriver} from 'react-native-quick-sqlite';
import {DB_NAME} from '../constants/db';
import {Tag} from '../entities/tag';
import {Message} from '../entities/message';

export const dataSource = new DataSource({
  type: 'react-native',
  database: DB_NAME,
  location: '.',
  driver: typeORMDriver,
  entities: [Tag, Message],
  synchronize: true,
});
