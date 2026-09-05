import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

import { useAnalyzer } from '@/hooks/use-analyzer';
import { AnalysisSource } from '@/services/analyzer-service';

interface AnalyzerContextValue {
  state: 'idle' | 'loading' | 'success' | 'error';
  loading: boolean;
  result: ReturnType<typeof useAnalyzer>['result'];
  error: string | null;
  /** Start analyzing a source; remembers it so it can be retried. */
  start: (source: AnalysisSource) => void;
  /** Re-run the last started source after a failure. */
  retry: () => void;
  reset: () => void;
}

const AnalyzerContext = createContext<AnalyzerContextValue | null>(null);

/**
 * Provides the analyzer flow state to the SourceUpload -> AnalyzingLoader ->
 * AnalysisResult screens so the source and its result are shared across the
 * stack regardless of which route is active.
 */
export function AnalyzerProvider({ children }: PropsWithChildren) {
  const { state, loading, result, error, analyze, reset } = useAnalyzer();
  const [pendingSource, setPendingSource] = useState<AnalysisSource | null>(null);

  const start = useCallback(
    (source: AnalysisSource) => {
      setPendingSource(source);
      void analyze(source);
    },
    [analyze],
  );

  const retry = useCallback(() => {
    if (pendingSource) {
      void analyze(pendingSource);
    }
  }, [pendingSource, analyze]);

  const value = useMemo(
    () => ({ state, loading, result, error, start, retry, reset }),
    [state, loading, result, error, start, retry, reset],
  );

  return <AnalyzerContext.Provider value={value}>{children}</AnalyzerContext.Provider>;
}

export function useAnalyzerContext(): AnalyzerContextValue {
  const ctx = useContext(AnalyzerContext);
  if (!ctx) {
    throw new Error('useAnalyzerContext must be used within an <AnalyzerProvider>');
  }
  return ctx;
}