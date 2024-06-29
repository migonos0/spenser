import { useMemo, useRef } from "react";
import { useDepsContext } from "./use-deps-context";

export const useDependency = <T = unknown>(
  dependencyName: string
): T | undefined => {
  const { depsContainer, version: containerVersion } = useDepsContext();
  const dependencyVersion = useRef<number>();
  const cachedDependency = useRef<T>();

  const dependency = useMemo(() => {
    if (dependencyVersion.current === undefined) {
      const freshDependency = depsContainer.resolve(dependencyName);
      dependencyVersion.current = 0;
      cachedDependency.current = freshDependency;
      return freshDependency;
    }

    if (dependencyVersion.current === containerVersion) {
      return cachedDependency.current;
    }

    const freshDependency = depsContainer.resolve(dependencyName);
    dependencyVersion.current = dependencyVersion.current + 1;
    cachedDependency.current = freshDependency;
    return freshDependency;
  }, [depsContainer, dependencyName, containerVersion]);

  return dependency;
};
