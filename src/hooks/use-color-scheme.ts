import { useColorScheme as useRNColorScheme } from 'react-native';

import { useThemePreference } from '@/hooks/use-theme-preference';

/**
 * App-wide color scheme. Consults the user's Settings theme preference first
 * and falls back to the OS scheme when set to "system", so the Dark mode
 * toggle in Settings actually changes app behavior.
 */
export function useColorScheme() {
  const preference = useThemePreference();
  const system = useRNColorScheme();

  if (preference === 'light') return 'light';
  if (preference === 'dark') return 'dark';
  return system ?? 'light';
}