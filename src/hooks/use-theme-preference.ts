import { useSettings } from '@/store/settings';

/** Reactively returns the theme preference chosen in Settings. */
export function useThemePreference() {
  return useSettings().theme;
}