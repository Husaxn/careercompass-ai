import { useLocalSearchParams } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { Chat } from '@/features/community/screens';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <BackBar title="Message" />
      <Chat mentorId={id ?? ''} />
    </>
  );
}