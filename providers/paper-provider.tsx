import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { FC, ReactNode } from "react";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider as Provider,
} from "react-native-paper";

type PaperProviderProps = {
  children?: ReactNode;
};
export const PaperProvider: FC<PaperProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({ fallbackSourceColor: "#3E8260" });
  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  return <Provider theme={paperTheme}>{children}</Provider>;
};
