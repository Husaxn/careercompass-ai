import { useRouter } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { Careers } from '@/features/recommendations/screens';

export default function CareersScreen() {
  const router = useRouter();

  return (
    <>
      <BackBar title="Careers" />
      <Careers onOpen={(id) => router.push(`/recommendations/career/${id}`)} />
    </>
  );
}