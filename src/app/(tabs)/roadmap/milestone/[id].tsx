import { useLocalSearchParams } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { MilestoneDetail } from '@/features/roadmap/screens';

export default function MilestoneDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <BackBar title="Milestone" />
      <MilestoneDetail id={id ?? ''} />
    </>
  );
}