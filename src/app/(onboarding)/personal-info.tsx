import { useRouter } from 'expo-router';

import { PersonalInfo } from '@/features/onboarding/screens';

export default function OnboardingPersonalInfoScreen() {
  const router = useRouter();

  return <PersonalInfo onContinue={() => router.replace('/skills')} onBack={() => (router.canGoBack() ? router.back() : router.replace('/landing'))} />;
}