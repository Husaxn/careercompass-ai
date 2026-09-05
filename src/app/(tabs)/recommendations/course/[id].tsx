import { useLocalSearchParams } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { CourseDetail } from '@/features/recommendations/screens';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <BackBar title="Course" />
      <CourseDetail id={id ?? ''} />
    </>
  );
}