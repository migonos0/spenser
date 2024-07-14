import { Key } from "swr";
import swrMutationHook, { SWRMutationConfiguration } from "swr/mutation";

export const useSWRMutation = <
  CurrentData,
  FetcherInput,
  FetcherOutput,
  K extends Key = any,
  E extends Error = any
>(
  key: K,
  fetcher0: (input: FetcherInput) => FetcherOutput | Promise<FetcherOutput>,
  options?: SWRMutationConfiguration<
    FetcherOutput,
    E,
    K,
    FetcherInput,
    CurrentData
  >
) => {
  const result = swrMutationHook<
    FetcherOutput,
    E,
    K,
    FetcherInput,
    CurrentData
  >(
    key,
    async (_, { arg }: { arg: FetcherInput }): FetcherOutput => {
      return await fetcher0(arg);
    },
    options
  );
  return result;
};
