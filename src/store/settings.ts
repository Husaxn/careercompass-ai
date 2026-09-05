import { createStore } from './create-store';

export const SETTINGS_STORAGE_KEY = 'careercompass.settings';

export type ThemePreference = 'light' | 'dark' | 'system';

export interface Settings {
  theme: ThemePreference;
  notifications: boolean;
}

const initialState: Settings = {
  theme: 'system',
  notifications: true,
};

const store = createStore<Settings>(initialState, { persist: SETTINGS_STORAGE_KEY });

export const settingsStore = {
  ...store,
  setTheme(theme: ThemePreference) {
    store.setState({ theme });
  },
  setNotifications(notifications: boolean) {
    store.setState({ notifications });
  },
  reset() {
    store.setState(initialState);
  },
};

export function useSettings(): Settings {
  return store.useStore();
}