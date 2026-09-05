import { useRouter } from 'expo-router';

import { Intro } from '@/features/assessment/screens';
import { QUESTIONS } from '@/features/assessment/questions';

export default function AssessmentIntroScreen() {
  const router = useRouter();

  return (
    <Intro
      count={QUESTIONS.length}
      onStart={() => router.replace('/assessment/question')}
      onBack={() => (router.canGoBack() ? router.back() : router.replace('/home'))}
    />
  );
}