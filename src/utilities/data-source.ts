import 'reflect-metadata';
import {DataSource} from 'typeorm';

import {DB_NAME} from '../constants/db';
import {Message} from '../entities/message';
import {Tag} from '../entities/tag';

export const dataSource = new DataSource({
  type: 'expo',
  database: DB_NAME,
  entities: [Message, Tag],
  synchronize: true,
  driver: require('expo-sqlite'),
});
