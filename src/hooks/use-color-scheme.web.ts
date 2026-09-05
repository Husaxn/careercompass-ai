import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { useThemePreference } from '@/hooks/use-theme-preference';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * Also consults the user's Settings theme preference so the toggle works on web.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Required for static rendering: recalculate the scheme on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHydrated(true);
  }, []);

  const preference = useThemePreference();
  const colorScheme = useRNColorScheme();

  if (preference === 'light') return 'light';
  if (preference === 'dark') return 'dark';

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}