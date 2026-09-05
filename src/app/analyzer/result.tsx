import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import { AnalysisResult, useAnalyzerContext } from '@/features/analyzer';
import { analysisStore } from '@/store';

export default function AnalyzerResultScreen() {
  const router = useRouter();
  const { state, result } = useAnalyzerContext();

  // No finished result (e.g. a deep link to this screen): go back to upload.
  useEffect(() => {
    if (state !== 'success' || !result) {
      router.replace('/analyzer/source-upload');
    }
  }, [state, result, router]);

  // Persist the finished analysis to shared history once.
  useEffect(() => {
    if (state === 'success' && result) {
      analysisStore.add({
        id: result.id,
        title: result.topMatch,
        score: result.matchScore,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state !== 'success' || !result) {
    return null;
  }

  return <AnalysisResult result={result} onViewRoadmap={() => router.push('/roadmap')} />;
}