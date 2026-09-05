import { useRouter } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { Courses } from '@/features/recommendations/screens';

export default function CoursesScreen() {
  const router = useRouter();

  return (
    <>
      <BackBar title="Courses" />
      <Courses onOpen={(id) => router.push(`/recommendations/course/${id}`)} />
    </>
  );
}