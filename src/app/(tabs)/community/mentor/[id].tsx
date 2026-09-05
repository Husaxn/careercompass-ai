import { useLocalSearchParams, useRouter } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { MentorProfile } from '@/features/community/screens';

export default function MentorProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <>
      <BackBar title="Mentor" />
      <MentorProfile id={id ?? ''} onMessage={() => router.push(`/community/chat/${id}`)} />
    </>
  );
}