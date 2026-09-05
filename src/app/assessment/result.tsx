import { useRouter } from 'expo-router';

import { Result } from '@/features/assessment/screens';
import { useAssessmentResults } from '@/store';

export default function AssessmentResultScreen() {
  const router = useRouter();
  const results = useAssessmentResults();
  const latest = results[0];

  return (
    <Result
      topCareers={latest?.topCareers ?? []}
      scores={latest?.scores ?? {}}
      onViewRecommendations={() => router.replace('/recommendations')}
      onRetake={() => router.replace('/assessment/home')}
    />
  );
}