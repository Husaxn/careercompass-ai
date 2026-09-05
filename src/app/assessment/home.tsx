import { useRouter } from 'expo-router';

import { AssessmentHome } from '@/features/assessment/screens';

export default function AssessmentHomeScreen() {
  const router = useRouter();

  return (
    <AssessmentHome
      onSelect={(id: string) => {
        if (id === 'interests') {
          router.push('/assessment/intro');
        }
      }}
    />
  );
}