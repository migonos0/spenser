import {openDatabase} from 'react-native-sqlite-storage';

export const getSQLiteDatabase = (dbName: string) =>
  openDatabase({name: dbName, location: 'default'});
