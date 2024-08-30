import {Slot} from 'expo-router';
import {Text} from 'react-native';

export default function Layout() {
  return (
    <>
      <Text className="bg-red-500">My World!</Text>
      <Slot />
    </>
  );
}
