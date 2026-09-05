import { useLocalSearchParams } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { CareerDetail } from '@/features/recommendations/screens';

export default function CareerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <BackBar title="Career" />
      <CareerDetail id={id ?? ''} />
    </>
  );
}