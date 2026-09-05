import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { AnalyzingLoader, useAnalyzerContext } from '@/features/analyzer';

export default function AnalyzerAnalyzingScreen() {
  const router = useRouter();
  const { state, loading, error, retry } = useAnalyzerContext();

  useEffect(() => {
    if (state === 'success') {
      router.replace('/analyzer/result');
    }
  }, [state, router]);

  // No source was started (e.g. a deep link to this screen): go back.
  useEffect(() => {
    if (state === 'idle' && !loading) {
      router.replace('/analyzer/source-upload');
    }
  }, [state, loading, router]);

  return <AnalyzingLoader error={error} onRetry={retry} />;
}