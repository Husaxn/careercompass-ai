import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { fetchCourseById, type CourseRecommendation } from '@/services/recommendation-service';

type CourseDetailProps = {
  id: string;
};

export default function CourseDetail({ id }: CourseDetailProps) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseRecommendation | null>(null);

  useEffect(() => {
    let active = true;
    fetchCourseById(id)
      .then((data) => {
        if (active) setCourse(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading || !course) {
    return (
      <ScreenContainer>
        <StatePanel loading={loading} empty={!course} emptyText="Course not found." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">{course.title}</ThemedText>
        <ThemedText themeColor="textSecondary">
          {course.level} · {course.duration} · {course.provider}
        </ThemedText>

        <BookmarkButton kind="course" refId={course.id} title={course.title} />

        <ThemedView type="backgroundElement" style={styles.summary}>
          <ThemedText type="smallBold">What you&apos;ll learn</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">{course.description}</ThemedText>
        </ThemedView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  summary: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
});