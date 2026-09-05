import { useRouter } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { Mentors } from '@/features/community/screens';

export default function MentorsScreen() {
  const router = useRouter();

  return (
    <>
      <BackBar title="Mentors" />
      <Mentors onOpen={(id) => router.push(`/community/mentor/${id}`)} />
    </>
  );
}