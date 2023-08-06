import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {User} from '../entities/User';
import {typeORMDriver} from 'react-native-quick-sqlite';

export const AppDataSource = new DataSource({
  type: 'react-native',
  database: 'typeormdb',
  location: '.',
  driver: typeORMDriver,
  entities: [User],
  synchronize: true,
});
