import {useEffect} from 'react';
import swrHook, {BareFetcher, Key, SWRConfiguration, useSWRConfig} from 'swr';
import swrImmutableHook from 'swr/immutable';
import swrMutationHook, {
  MutationFetcher,
  SWRMutationConfiguration,
} from 'swr/mutation';

import {useIsDataSourceInitialized} from '../state/data-source.state';

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

export const useSWROnInitializedDS = <Data>(
  key: Key,
  fetcher: () => Data | Promise<Data>,
) => {
  const isDataSourceInitialized = useIsDataSourceInitialized();

  const key2 = isDataSourceInitialized ? key : undefined;

  return useSWR(key2, fetcher);
};

export const useSWRImmutableOnInitializedDS = <Data>(
  key: Key,
  fetcher: () => Data | Promise<Data>,
) => {
  const dataSource = useIsDataSourceInitialized();

  const key2 = dataSource ? key : undefined;

  return useSWRImmutable(key2, fetcher);
};

export const useSWRMutationOnInitializedDS = <T, U, V = any>(
  key: Key,
  fetcher: (input: T) => U | Promise<U>,
  populateCache?: (result: U | undefined, currentData: V) => V,
) => {
  const isDataSourceInitialized = useIsDataSourceInitialized();
  const {mutate} = useSWRConfig();

  const key2 = isDataSourceInitialized ? key : undefined;
  const fetcher2 = async (_: unknown, {arg}: {arg: T}) => {
    if (!isDataSourceInitialized) {
      return;
    }
    return await fetcher(arg);
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
