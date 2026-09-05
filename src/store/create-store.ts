import { useSyncExternalStore } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Listener = () => void;

export interface Store<T extends object> {
  getSnapshot: () => T;
  subscribe: (listener: Listener) => () => void;
  setState: (patch: Partial<T>) => void;
  useStore: () => T;
}

export interface StoreOptions {
  /**
   * When provided, the store is persisted to this storage key. State is
   * debounced-write on every change and hydrated from storage on creation.
   */
  persist?: string;
  /**
   * Optional cap for array-shaped stores so unbounded data (e.g. chat
   * history) is trimmed to the last `persistLimit` items before writing.
   */
  persistLimit?: number;
}

/*
 * Global hydration tracking. Persisted stores register work via
 * `beginHydration`/`endHydration`; routing (app/index.tsx) waits until every
 * persisted store has hydrated so the UI never flashes default/empty content
 * before real data loads in.
 */
let pendingCount = 0;
const hydrationListeners = new Set<Listener>();
let hydrationResolvers: (() => void)[] = [];

function subscribeHydration(listener: Listener) {
  hydrationListeners.add(listener);
  return () => {
    hydrationListeners.delete(listener);
  };
}

function isHydrated(): boolean {
  return pendingCount === 0;
}

function emitHydration() {
  hydrationListeners.forEach((listener) => listener());
  hydrationListeners.clear();
}

function beginHydration() {
  pendingCount += 1;
}

function endHydration() {
  pendingCount = Math.max(0, pendingCount - 1);
  if (pendingCount === 0) {
    hydrationResolvers.forEach((resolve) => resolve());
    hydrationResolvers = [];
    emitHydration();
  }
}

/** Reactive flag that turns true once all persisted stores have hydrated. */
export function useHydration(): boolean {
  return useSyncExternalStore(subscribeHydration, isHydrated);
}

/** Promise that resolves once all persisted stores have hydrated. */
export function waitForHydration(): Promise<void> {
  if (pendingCount === 0) return Promise.resolve();
  return new Promise((resolve) => {
    hydrationResolvers.push(resolve);
  });
}

async function hydrateValue(key: string): Promise<unknown> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return null;
    return JSON.parse(raw);
  } catch {
    // Missing or corrupted stored JSON — callers fall back to defaults.
    return null;
  }
}

async function persistValue(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage write failure is non-fatal; state still works in-memory.
  }
}

/** Remove a single persisted key (used on logout). Safe to call for any key. */
export async function removePersistedKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Ignore removal failures.
  }
}

/**
 * Minimal dependency-free store factory backed by `useSyncExternalStore`,
 * matching the pattern already used across the app. Each domain store is a
 * single source of truth so the Dashboard, tabs, and detail screens all read
 * the same values and stay in sync.
 *
 * Pass `options.persist` to opt into persistence: the store hydrates from
 * storage on creation (merging onto defaults for object shapes, replacing for
 * array shapes) and debounce-writes every subsequent change.
 */
export function createStore<T extends object>(
  initial: T,
  options: StoreOptions = {},
): Store<T> {
  let state = initial;
  const listeners = new Set<Listener>();
  const isArrayShape = Array.isArray(initial);
  const persistKey = options.persist;
  const persistLimit = options.persistLimit;

  if (persistKey) {
    beginHydration();
    void hydrateValue(persistKey)
      .then((saved) => {
        if (saved == null) return;
        if (isArrayShape && Array.isArray(saved)) {
          state = trimArray(saved, persistLimit) as unknown as T;
        } else if (!isArrayShape && typeof saved === 'object') {
          state = { ...initial, ...saved } as T;
        }
      })
      .catch(() => {
        // Corrupted storage — keep defaults.
      })
      .finally(() => {
        emitChange();
        endHydration();
      });
  }

  let writeTimer: ReturnType<typeof setTimeout> | null = null;
  function schedulePersist() {
    if (!persistKey) return;
    if (writeTimer) clearTimeout(writeTimer);
    writeTimer = setTimeout(() => {
      writeTimer = null;
      void persistValue(persistKey, state);
    }, 250);
  }

  function emitChange() {
    listeners.forEach((listener) => listener());
  }

  const getSnapshot = () => state;

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const setState = (patch: Partial<T>) => {
    // Object-shaped stores merge a partial patch. Array-shaped stores always
    // set the full array, which must be replaced as-is — spreading an array
    // would corrupt it into a plain object.
    state = (isArrayShape ? (patch as unknown) : { ...state, ...patch }) as T;
    emitChange();
    schedulePersist();
  };

  const useStore = (): T => useSyncExternalStore(subscribe, getSnapshot);

  return { getSnapshot, subscribe, setState, useStore };
}

function trimArray<T>(value: T[], limit?: number): T[] {
  if (limit == null || limit <= 0) return value;
  return value.slice(0, limit);
}
