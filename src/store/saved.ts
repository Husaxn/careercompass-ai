import { createStore } from './create-store';

export const SAVED_STORAGE_KEY = 'careercompass.saved';

export type SavedKind = 'career' | 'course' | 'job';

export interface SavedItem {
  key: string;
  kind: SavedKind;
  refId: string;
  title: string;
}

const store = createStore<SavedItem[]>([], { persist: SAVED_STORAGE_KEY });

function keyFor(kind: SavedKind, refId: string) {
  return `${kind}:${refId}`;
}

export const savedStore = {
  ...store,
  isSaved(kind: SavedKind, refId: string): boolean {
    return store.getSnapshot().some((item) => item.key === keyFor(kind, refId));
  },
  toggleSave(item: Omit<SavedItem, 'key'>) {
    const key = keyFor(item.kind, item.refId);
    const current = store.getSnapshot();
    if (current.some((s) => s.key === key)) {
      store.setState(current.filter((s) => s.key !== key));
    } else {
      store.setState([{ ...item, key }, ...current]);
    }
  },
  remove(key: string) {
    store.setState(store.getSnapshot().filter((s) => s.key !== key));
  },
  /** Clear all saved items (logout). */
  reset() {
    store.setState([]);
  },
};

export function useSavedItems(): SavedItem[] {
  return store.useStore();
}

export function useIsSaved(kind: SavedKind, refId: string): boolean {
  const items = store.useStore();
  return items.some((item) => item.key === keyFor(kind, refId));
}