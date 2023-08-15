import {DependencyList, EffectCallback, useEffect} from 'react';

import {useIsFirstRender} from './use-is-first-render';
/**
 * From https://usehooks-ts.com/react-hook/use-update-effect
 * @param effect Callback
 * @param deps Dependency array
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender();
  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
