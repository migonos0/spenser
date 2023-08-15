import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';

export const useLooseRoute = useRoute<
  RouteProp<ParamListBase> & {
    params: Record<string, string | number | undefined> | undefined;
  }
>;
