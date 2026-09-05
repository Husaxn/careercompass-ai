import { useRouter } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { CreatePost } from '@/features/community/screens';

export default function CreatePostScreen() {
  const router = useRouter();

  return (
    <>
      <BackBar title="Create post" />
      <CreatePost onSubmit={() => router.replace('/community')} />
    </>
  );
}