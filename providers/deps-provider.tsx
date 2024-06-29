import { makeDepsContainer } from "@/infra/deps-container";
import { AwilixContainer } from "awilix";
import { FC, ReactNode, createContext, useMemo, useState } from "react";

type DepsContextActions = {
  disposeCachedDependencies: () => void;
};
export const DepsContext = createContext<{
  depsContainer: AwilixContainer;
  version: number;
  actions: DepsContextActions;
} | null>(null);

type DepsProviderProps = {
  children?: ReactNode;
};
export const DepsProvider: FC<DepsProviderProps> = ({ children }) => {
  const [version, setVersion] = useState(0);
  const depsContainer = useMemo(() => makeDepsContainer(), []);

  const disposeCachedDependencies = () =>
    depsContainer
      .dispose()
      .then(() => setVersion((version) => version && version + 1));

  return (
    <DepsContext.Provider
      value={{ depsContainer, version, actions: { disposeCachedDependencies } }}
    >
      {children}
    </DepsContext.Provider>
  );
};
