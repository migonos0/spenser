import {App} from '@/App';
import {Slot} from 'expo-router';

export default function Layout() {
  return (
    <App>
      <Slot />
    </App>
  );
}
