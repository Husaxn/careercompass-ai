import { useColorScheme as useRNColorScheme } from 'react-native';

import { useThemePreference } from '@/hooks/use-theme-preference';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * Also consults the user's Settings theme preference so the toggle works on web.
 */
export function useColorScheme() {
  const preference = useThemePreference();
  const colorScheme = useRNColorScheme();

  if (preference === 'light') return 'light';
  if (preference === 'dark') return 'dark';

  return colorScheme ?? 'light';
}