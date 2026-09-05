import { useRouter } from 'expo-router';

import { GoalSelect } from '@/features/onboarding/screens';

export default function OnboardingCareerPathScreen() {
  const router = useRouter();

  return (
    <GoalSelect onContinue={() => router.replace('/roadmap')} onBack={() => router.replace('/skills')} />
  );
}