import { createStore } from './create-store';

export const ASSESSMENT_STORAGE_KEY = 'careercompass.assessment';

export interface AssessmentResult {
  id: string;
  type: string;
  completedAt: string;
  topCareers: { title: string; score: number }[];
  scores: Record<string, number>;
}

interface AssessmentState {
  results: AssessmentResult[];
  /** Most recently computed scores, shared with Profile/Resume. */
  latestScores: Record<string, number>;
}

const initialState: AssessmentState = {
  results: [],
  latestScores: {},
};

const store = createStore<AssessmentState>(initialState, { persist: ASSESSMENT_STORAGE_KEY });

export const assessmentStore = {
  ...store,
  addResult(result: AssessmentResult) {
    const results = [result, ...store.getSnapshot().results];
    store.setState({ results, latestScores: result.scores });
  },
  /** Clear all assessment results (logout). */
  reset() {
    store.setState({ results: [], latestScores: {} });
  },
};

export function useAssessmentResults(): AssessmentResult[] {
  return store.useStore().results;
}

export function useLatestAssessmentScores(): Record<string, number> {
  return store.useStore().latestScores;
}