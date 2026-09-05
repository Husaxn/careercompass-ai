import { useRouter } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { Jobs } from '@/features/recommendations/screens';

export default function JobsScreen() {
  const router = useRouter();

  return (
    <>
      <BackBar title="Jobs" />
      <Jobs onOpen={(id) => router.push(`/recommendations/job/${id}`)} />
    </>
  );
}