import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { fetchCourseRecommendations, type CourseRecommendation } from '@/services/recommendation-service';

type CoursesProps = {
  onOpen: (id: string) => void;
};

export default function Courses({ onOpen }: CoursesProps) {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseRecommendation[]>([]);

  useEffect(() => {
    let active = true;
    fetchCourseRecommendations()
      .then((data) => {
        if (active) setCourses(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Recommended courses</ThemedText>
        <ThemedText themeColor="textSecondary">Hand-picked to close your skill gaps.</ThemedText>

        {loading || courses.length === 0 ? (
          <StatePanel loading={loading} empty={courses.length === 0} emptyText="No courses yet." />
        ) : (
          <View style={styles.list}>
            {courses.map((course) => (
              <Pressable
                key={course.id}
                onPress={() => onOpen(course.id)}
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
                <ThemedView type="backgroundElement" style={styles.card}>
                  <ThemedText type="smallBold">{course.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {course.level} · {course.duration}
                  </ThemedText>
                </ThemedView>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.three,
  },
  item: {
    borderRadius: Spacing.three,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.8,
  },
});