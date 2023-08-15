import {
  CommonActions,
  StackActionType,
  useNavigation,
} from '@react-navigation/native';

export type LooseNavigation = {
  navigate: (
    screenName?: string,
    params?: Record<string, string | number>,
  ) => void;
  addListener: (
    event: 'beforeRemove',
    callback: (event: {preventDefault: () => void}) => void,
  ) => () => void;
  dispatch: (param: StackActionType | CommonActions.Action) => void;
};
export const useLooseNavigation = useNavigation<LooseNavigation>;
