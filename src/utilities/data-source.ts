import 'reflect-metadata';
import {DataSource} from 'typeorm';

import {typeORMDriver} from 'react-native-quick-sqlite';
import {DB_NAME} from '../constants/db';

export const dataSource = new DataSource({
  type: 'react-native',
  database: DB_NAME,
  location: '.',
  driver: typeORMDriver,
  entities: [],
  synchronize: true,
});
