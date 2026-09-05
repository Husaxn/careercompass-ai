import { useRouter } from 'expo-router';

import { InterestSelect } from '@/features/onboarding/screens';

export default function OnboardingSkillsScreen() {
  const router = useRouter();

  return (
    <InterestSelect
      onContinue={() => router.replace('/career-path')}
      onBack={() => router.replace('/personal-info')}
    />
  );
}