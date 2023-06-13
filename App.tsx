import {SafeAreaView} from 'react-native';
import {useIsDarkMode} from './src/stores/theme.store';
import {DARK_COLORS, LIGHT_COLORS} from './src/constants/colors';

function App(): JSX.Element {
  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? DARK_COLORS.surface : LIGHT_COLORS.surface,
  };

  return <SafeAreaView style={backgroundStyle} />;
}

export default App;
