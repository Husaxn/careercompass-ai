import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { Splash } from '@/features/auth/screens';
import { useAuth, useHydration } from '@/store';

const SPLASH_MS = 1200;

/**
 * App entry point. Shows the Splash briefly, then redirects based on auth
 * state. Routing is decided here (never hardcoded to the dashboard):
 *  - first launch            -> Landing carousel
 *  - not authenticated       -> Login
 *  - authenticated, new user -> Onboarding
 *  - authenticated, returning-> Home (tabs)
 *
 * The redirect only fires once persisted state has hydrated, so a returning
 * logged-in + onboarded user is routed straight to Home instead of re-showing
 * Landing/onboarding, and no default/empty UI flashes before real data loads.
 */
export default function Entry() {
  const router = useRouter();
  const hydrated = useHydration();
  const { isAuthenticated, isOnboarded, isFirstLaunch } = useAuth();

  useEffect(() => {
    if (!hydrated) return;
    const timer = setTimeout(() => {
      if (!isAuthenticated && isFirstLaunch) {
        router.replace('/landing');
      } else if (!isAuthenticated) {
        router.replace('/login');
      } else if (!isOnboarded) {
        router.replace('/personal-info');
      } else {
        router.replace('/home');
      }
    }, SPLASH_MS);

    return () => clearTimeout(timer);
    // Resolve the redirect target whenever auth or hydration state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, isAuthenticated, isOnboarded, isFirstLaunch]);

  return <Splash />;
}