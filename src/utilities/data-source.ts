import 'reflect-metadata';
import {DataSource} from 'typeorm';

import {typeORMDriver} from 'react-native-quick-sqlite';

export const datasource = new DataSource({
  type: 'react-native',
  database: 'typeormdb',
  location: '.',
  driver: typeORMDriver,
  entities: [],
  synchronize: true,
});
