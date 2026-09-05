import { useRouter } from 'expo-router';

import { Feed } from '@/features/community/screens';

export default function CommunityScreen() {
  const router = useRouter();

  return (
    <Feed
      onOpenPost={(id) => router.push(`/community/post/${id}`)}
      onCreatePost={() => router.push('/community/create')}
      onOpenMentors={() => router.push('/community/mentors')}
    />
  );
}