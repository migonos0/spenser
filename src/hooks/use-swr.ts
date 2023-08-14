import {useEffect} from 'react';
import swrHook, {BareFetcher, Key, SWRConfiguration, useSWRConfig} from 'swr';
import swrImmutableHook from 'swr/immutable';
import swrMutationHook, {
  MutationFetcher,
  SWRMutationConfiguration,
} from 'swr/mutation';
import {DataSource} from 'typeorm';

import {useDataSource} from '../state/data-source.state';

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

export const useSWRMutation = <Data, ExtraArg = never>(
  key: Key,
  fetcher: MutationFetcher<Data, Key, ExtraArg>,
  options?: SWRMutationConfiguration<Data, Error, Key, ExtraArg>,
) => {
  const result = swrMutationHook(key, fetcher, options);
  result.error && console.error(result.error);
  return result;
};

export const useSWRDataSource = <Data>(
  key: Key,
  fetcher: (dataSource: DataSource) => Data | Promise<Data>,
) => {
  const dataSource = useDataSource();

  const key2 = dataSource ? key : undefined;
  const fetcher2 = () => dataSource && fetcher(dataSource);

  return useSWR(key2, fetcher2);
};

export const useSWRImmutableDataSource = <Data>(
  key: Key,
  fetcher: (dataSource: DataSource) => Data | Promise<Data>,
) => {
  const dataSource = useDataSource();

  const key2 = dataSource ? key : undefined;
  const fetcher2 = () => dataSource && fetcher(dataSource);

  return useSWRImmutable(key2, fetcher2);
};

export const useSWRDataSourceMutation = <T, U, V = any>(
  key: Key,
  fetcher: (input: T) => (dataSource: DataSource) => U | Promise<U>,
  populateCache?: (result: U | undefined, currentData: V) => V,
) => {
  const dataSource = useDataSource();
  const {mutate} = useSWRConfig();

  const key2 = dataSource ? key : undefined;
  const fetcher2 = async (_: unknown, {arg}: {arg: T}) => {
    if (!dataSource) {
      return;
    }
    return await fetcher(arg)(dataSource);
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
