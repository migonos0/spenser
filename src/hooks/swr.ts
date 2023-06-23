import swrImmutableHook from 'swr/immutable';
import swrHook, {Key} from 'swr';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {useAreTablesCreated, useSQLiteDatabase} from '../state/sqlite.state';

export const useSWRImmutable = swrImmutableHook;
export const useSWR = swrHook;
export const useSWRSQLite = <Data>(
  key: Key,
  fetcher: (sqliteDatabase: SQLiteDatabase) => Data | Promise<Data>,
) => {
  const sqliteDatabase = useSQLiteDatabase();
  const areTablesCreated = useAreTablesCreated();

  const key2 = areTablesCreated ? key : undefined;
  const fetcher2 = () => sqliteDatabase && fetcher(sqliteDatabase);

  return useSWRImmutable(key2, fetcher2);
};
