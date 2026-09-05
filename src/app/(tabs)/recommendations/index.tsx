import { useRouter } from 'expo-router';

import { Overview } from '@/features/recommendations/screens';

export default function RecommendationsOverviewScreen() {
  const router = useRouter();

  return (
    <Overview
      onOpen={(id) => {
        if (id === 'careers') router.push('/recommendations/careers');
        else if (id === 'courses') router.push('/recommendations/courses');
        else if (id === 'jobs') router.push('/recommendations/jobs');
        else if (id === 'saved') router.push('/recommendations/saved');
      }}
    />
  );
}