import {ResultSet, openDatabase} from 'react-native-sqlite-storage';

export const getSQLiteDatabase = (dbName: string) =>
  openDatabase({name: dbName, location: 'default'});

export const getInsertId = (result: [ResultSet]) => {
  if (result.length < 1) {
    throw new Error('Result set is empty.');
  }
  if (result[0].rowsAffected < 1) {
    throw new Error('No rows were affected.');
  }

  return result[0].insertId;
};
