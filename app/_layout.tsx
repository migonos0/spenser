import {App} from '@/App';
import {Slot} from 'expo-router';
import {createContext, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Appbar, Surface} from 'react-native-paper';

export const AppBarContext = createContext<{
  title: string;
  setTitle: (handler: string | ((oldTitle: string) => string)) => void;
} | null>(null);

export default function RootLayout() {
  const [appBarTitle, setAppBarTitle] = useState('Spencer');

  return (
    <App>
      <AppBarContext.Provider
        value={{title: appBarTitle, setTitle: setAppBarTitle}}>
        <KeyboardAvoidingView className="flex flex-col bg-red-400 w-full h-full">
          <Appbar.Header>
            <Appbar.Content title={appBarTitle} />
          </Appbar.Header>

          <Surface className="flex-1">
            <Slot />
          </Surface>
        </KeyboardAvoidingView>
      </AppBarContext.Provider>
    </App>
  );
}
