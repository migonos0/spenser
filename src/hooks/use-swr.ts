import swrHook, {BareFetcher, Key} from 'swr';
import swrImmutableHook from 'swr/immutable';
import swrMutationHook, {
  MutationFetcher,
  SWRMutationConfiguration,
} from 'swr/mutation';

import {useIsDataSourceInitialized} from '../state/data-source.state';
import {SWRConfiguration} from 'swr/_internal';

export const useSWRImmutable = <OutputData>(
  key: Key,
  fetcher: BareFetcher<OutputData>,
  config?: SWRConfiguration<OutputData, Error, BareFetcher<OutputData>>,
) => {
  const result = swrImmutableHook(key, fetcher, config);
  result.error && console.error(result.error);
  return result;
};

export const useSWR = <OutputData>(
  key: Key,
  fetcher: BareFetcher<OutputData>,
  config?: SWRConfiguration<OutputData, Error, BareFetcher<OutputData>>,
) => {
  const result = swrHook(key, fetcher, config);
  result.error && console.error(result.error);
  return result;
};

export const useSWRMutation = <InputData, OutputData>(
  key: Key,
  fetcher: MutationFetcher<InputData, Key, OutputData>,
  options?: SWRMutationConfiguration<InputData, Error, Key, OutputData>,
) => {
  const result = swrMutationHook(key, fetcher, options);
  result.error && console.error(result.error);
  return result;
};

export const useSWROnInitializedDS = <OutputData>(
  key: Key,
  fetcher: () => OutputData | Promise<OutputData>,
  config?: SWRConfiguration<OutputData, Error, BareFetcher<OutputData>>,
) => {
  const isDataSourceInitialized = useIsDataSourceInitialized();

  const key2 = isDataSourceInitialized ? key : undefined;

  return useSWR(key2, fetcher, config);
};

export const useSWRImmutableOnInitializedDS = <OutputData>(
  key: Key,
  fetcher: () => OutputData | Promise<OutputData>,
  config?: SWRConfiguration<OutputData, Error, BareFetcher<OutputData>>,
) => {
  const dataSource = useIsDataSourceInitialized();

  const key2 = dataSource ? key : undefined;

  return useSWRImmutable(key2, fetcher, config);
};

export const useSWRMutationOnInitializedDS = <InputData, OutputData>(
  key: Key,
  fetcher: (input: InputData) => OutputData | Promise<OutputData>,
  options?: Omit<
    SWRMutationConfiguration<OutputData | undefined, Error, Key, InputData>,
    'revalidate'
  >,
) => {
  const isDataSourceInitialized = useIsDataSourceInitialized();

  const key2 = isDataSourceInitialized ? key : undefined;
  const fetcher2 = async (_: unknown, {arg}: {arg: InputData}) => {
    if (!isDataSourceInitialized) {
      return;
    }
    return await fetcher(arg);
  };

  const result = useSWRMutation(key2, fetcher2, {
    revalidate: false,
    ...options,
  });

  return result;
};
