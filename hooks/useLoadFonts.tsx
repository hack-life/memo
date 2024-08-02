
import { useFonts } from 'expo-font';

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Serif-Italic': require('@/assets/fonts/DMSerifText-Italic.ttf'),
    'Serif': require('@/assets/fonts/DMSerifText-Regular.ttf'),
  });

  return fontsLoaded;
};
