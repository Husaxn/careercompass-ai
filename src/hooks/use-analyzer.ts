import { useCallback, useMemo, useState } from 'react';

import { analyzeSource, AnalysisResult, AnalysisSource } from '@/services/analyzer-service';

export type AnalyzerState = 'idle' | 'loading' | 'success' | 'error';

export interface UseAnalyzer {
  /** Current flow stage. */
  state: AnalyzerState;
  /** True while a source is being submitted / analyzed. */
  loading: boolean;
  /** The finished result when `state === 'success'`. */
  result: AnalysisResult | null;
  /** Human-readable error message when `state === 'error'`. */
  error: string | null;
  /** Submit a source and drive the whole loading -> result lifecycle. */
  analyze: (source: AnalysisSource) => Promise<void>;
  /** Clear result/error and return to `idle`. */
  reset: () => void;
}

/**
 * Wraps the analyzer service with loading/error/result state.
 * Works the same regardless of source kind (resume, screenshot, session...).
 */
export function useAnalyzer(): UseAnalyzer {
  const [state, setState] = useState<AnalyzerState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (source: AnalysisSource) => {
    setState('loading');
    setError(null);
    setResult(null);

    try {
      const res = await analyzeSource(source);
      setResult(res);
      setState('success');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong during analysis.';
      setError(message);
      setState('error');
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setResult(null);
    setError(null);
  }, []);

  return useMemo(
    () => ({ state, loading: state === 'loading', result, error, analyze, reset }),
    [state, result, error, analyze, reset],
  );
}