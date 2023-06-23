import swrImmutableHook from 'swr/immutable';
import swrHook, {Key} from 'swr';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {useAreTablesCreated, useSQLiteDatabase} from '../state/sqlite.state';
import swrMutationHook from 'swr/mutation';

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
export const useSWRMutation = swrMutationHook;
export const useSWRSQLiteMutation = <T, U, V = any>(
  key: Key,
  fetcher: (input: T) => (sqliteDatabase: SQLiteDatabase) => U | Promise<U>,
  populateCache?: (result: U | undefined, currentData: V) => V,
) => {
  const sqliteDatabase = useSQLiteDatabase();
  const areTablesCreated = useAreTablesCreated();

  const key2 = areTablesCreated ? key : undefined;
  const fetcher2 = async (_: unknown, {arg}: {arg: T}) => {
    if (!sqliteDatabase) {
      return;
    }
    return await fetcher(arg)(sqliteDatabase);
  };

  return useSWRMutation(key2, fetcher2, {
    revalidate: false,
    populateCache: populateCache,
  });
};
