import 'reflect-metadata';
import {DataSource} from 'typeorm';

import {typeORMDriver} from 'react-native-quick-sqlite';
import {DB_NAME} from '../constants/db';
import {Tag} from '../entities/tag';
import {Transaction} from '../entities/transaction';
import {Account} from '../entities/account';
import {Group} from '../entities/group';

export const dataSource = new DataSource({
  type: 'react-native',
  database: DB_NAME,
  driver: typeORMDriver,
  entities: [Tag, Transaction, Account, Group],
  synchronize: true,
  location: 'default',
});
