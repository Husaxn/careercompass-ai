import { removePersistedKey } from './create-store';

import { AUTH_STORAGE_KEY } from './auth';
import { USER_STORAGE_KEY, userStore } from './user';
import { ROADMAP_STORAGE_KEY, roadmapStore } from './roadmap';
import { ASSESSMENT_STORAGE_KEY, assessmentStore } from './assessment';
import { SAVED_STORAGE_KEY, savedStore } from './saved';
import { SETTINGS_STORAGE_KEY, settingsStore } from './settings';
import { assistantStore } from './assistant';
import { communityStore } from './community';

/** Persisted storage keys for user-specific data. */
const USER_DATA_KEYS = [
  AUTH_STORAGE_KEY,
  USER_STORAGE_KEY,
  ROADMAP_STORAGE_KEY,
  ASSESSMENT_STORAGE_KEY,
  SAVED_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
];

/** Clear all in-memory store state back to defaults. */
function resetInMemory() {
  userStore.reset();
  roadmapStore.reset();
  assessmentStore.reset();
  savedStore.reset();
  settingsStore.reset();
  assistantStore.reset();
  communityStore.reset();
}

/**
 * Clear user-specific data on logout — both in-memory state AND the persisted
 * keys — so a fresh login/signup on the same device never rehydrates the
 * previous user's data. Auth state is cleared via `authStore.logOut()` after
 * this returns.
 */
export async function clearUserData(): Promise<void> {
  resetInMemory();
  await Promise.all(USER_DATA_KEYS.map((key) => removePersistedKey(key)));
}
