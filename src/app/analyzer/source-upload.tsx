import { useRouter } from 'expo-router';

import { SourceUpload, useAnalyzerContext } from '@/features/analyzer';
import type { AnalysisSource } from '@/services/analyzer-service';

export default function AnalyzerSourceUploadScreen() {
  const router = useRouter();
  const { start } = useAnalyzerContext();

  const handleStart = (source: AnalysisSource) => {
    start(source);
    router.push('/analyzer/analyzing');
  };

  return <SourceUpload sourceKind="resume" onStart={handleStart} />;
}