import { useLocalSearchParams } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { JobDetail } from '@/features/recommendations/screens';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <BackBar title="Job" />
      <JobDetail id={id ?? ''} />
    </>
  );
}