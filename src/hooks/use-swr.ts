import swrImmutableHook from 'swr/immutable';
import swrHook, {BareFetcher, Key, SWRConfiguration, useSWRConfig} from 'swr';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {useAreTablesCreated, useSQLiteDatabase} from '../state/sqlite.state';
import swrMutationHook, {
  MutationFetcher,
  SWRMutationConfiguration,
} from 'swr/mutation';
import {useEffect} from 'react';

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
  fetcher: MutationFetcher<Data, Key, ExtraArg>,
  options?: SWRMutationConfiguration<Data, Error, Key, ExtraArg>,
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
  const {mutate} = useSWRConfig();

  const key2 = areTablesCreated ? key : undefined;
  const fetcher2 = async (_: unknown, {arg}: {arg: T}) => {
    if (!sqliteDatabase) {
      return;
    }
    return await fetcher(arg)(sqliteDatabase);
  };

  const result = useSWRMutation(key2, fetcher2, {
    revalidate: false,
  });

  useEffect(() => {
    if (!result.data || result.error || result.isMutating) {
      return;
    }
    mutate(
      key,
      currentData => {
        return populateCache
          ? populateCache(result.data, currentData)
          : currentData;
      },
      {revalidate: false},
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data, result.error, result.isMutating]);

  return result;
};
