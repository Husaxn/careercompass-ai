import { createStore } from './create-store';

export interface AnalysisHistoryEntry {
  id: string;
  title: string;
  date: string;
  score: number;
}

const store = createStore<AnalysisHistoryEntry[]>([]);

export const analysisStore = {
  ...store,
  add(entry: Omit<AnalysisHistoryEntry, 'date'>) {
    const date = new Date().toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    store.setState([{ ...entry, date }, ...store.getSnapshot()]);
  },
};

export function useAnalysisHistory(): AnalysisHistoryEntry[] {
  return store.useStore();
}