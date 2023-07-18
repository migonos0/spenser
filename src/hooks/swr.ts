import swrImmutableHook from 'swr/immutable';
import swrHook, {BareFetcher, Key, SWRConfiguration} from 'swr';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {useAreTablesCreated, useSQLiteDatabase} from '../state/sqlite.state';
import swrMutationHook, {
  MutationFetcher,
  SWRMutationConfiguration,
} from 'swr/mutation';

export const useSWRImmutable = <Data>(
  key: Key,
  fetcher: BareFetcher<Data>,
  config?: SWRConfiguration<Data, Error, BareFetcher<Data>>,
) => {
  const result = swrImmutableHook(key, fetcher, config);
  result.error && console.error(result.error);
  return result;
};
export const useSWR = <Data>(
  key: Key,
  fetcher: BareFetcher<Data>,
  config?: SWRConfiguration<Data, Error, BareFetcher<Data>>,
) => {
  const result = swrHook(key, fetcher, config);
  result.error && console.error(result.error);
  return result;
};
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
export const useSWRMutation = <Data, ExtraArg = never>(
  key: Key,
  fetcher: MutationFetcher<Data, ExtraArg, Key>,
  options: SWRMutationConfiguration<Data, Error, ExtraArg, Key>,
) => {
  const result = swrMutationHook(key, fetcher, options);
  result.error && console.error(result.error);
  return result;
};
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
