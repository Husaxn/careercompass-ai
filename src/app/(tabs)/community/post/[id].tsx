import { useLocalSearchParams } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { PostDetail } from '@/features/community/screens';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <BackBar title="Post" />
      <PostDetail id={id ?? ''} />
    </>
  );
}