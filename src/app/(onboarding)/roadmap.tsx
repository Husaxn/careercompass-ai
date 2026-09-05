import { useRouter } from 'expo-router';

import { Summary } from '@/features/onboarding/screens';
import { authStore } from '@/store';

export default function OnboardingRoadmapScreen() {
  const router = useRouter();

  return (
    <Summary
      onFinish={() => {
        authStore.completeOnboarding();
        router.replace('/home');
      }}
      onBack={() => router.replace('/career-path')}
    />
  );
}