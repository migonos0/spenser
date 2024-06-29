import { DepsContext } from "@/providers/deps-provider";
import { useContext } from "react";

export const useDepsContext = () => {
  const depsContext = useContext(DepsContext);

  if (!depsContext) {
    throw new Error("Dependencies context must be used within Deps Provider.");
  }

  return depsContext;
};
