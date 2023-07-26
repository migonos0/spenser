import {ResultSet, openDatabase} from 'react-native-sqlite-storage';

export const getSQLiteDatabase = (dbName: string) =>
  openDatabase({name: dbName, location: 'default'});

export const validateRowAffectation = (result: [ResultSet]) => {
  if (result.length < 1) {
    throw new Error('Result set is empty.');
  }
  if (result[0].rowsAffected < 1) {
    throw new Error('No rows were affected.');
  }
};

export const getInsertId = (result: [ResultSet]) => {
  validateRowAffectation(result);

  return result[0].insertId;
};

export const getInsertIds = (results: [ResultSet]) => {
  validateRowAffectation(results);

  return results.map(result => result.insertId);
};
