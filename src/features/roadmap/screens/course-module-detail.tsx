import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { fetchCourseById, type CourseRecommendation } from '@/services/recommendation-service';
import { roadmapStore, useMilestones } from '@/store';

type CourseModuleDetailProps = {
  milestoneId: string;
  taskId: string;
};

export default function CourseModuleDetail({ milestoneId, taskId }: CourseModuleDetailProps) {
  const milestones = useMilestones();
  const milestone = milestones.find((m) => m.id === milestoneId);
  const task = milestone?.tasks.find((t) => t.id === taskId);

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseRecommendation | null>(null);

  const courseId = task?.meta?.courseId;

  useEffect(() => {
    if (!courseId) return;
    let active = true;
    fetchCourseById(courseId)
      .then((data) => {
        if (active) setCourse(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [courseId]);

  if (!task) {
    return (
      <ScreenContainer>
        <StatePanel empty emptyText="Task not found." />
      </ScreenContainer>
    );
  }

  const markComplete = () => roadmapStore.setTaskDone(milestoneId, taskId, true);

  if (loading) {
    return (
      <ScreenContainer>
        <StatePanel loading />
      </ScreenContainer>
    );
  }

  if (!courseId || !course) {
    return (
      <ScreenContainer>
        <View style={styles.content}>
          <StatePanel empty emptyText="Course content for this task is coming soon." />
          <ThemedText type="small" themeColor="textSecondary">
            This task is part of your roadmap, but the linked course module has not been published yet. Check back
            later to unlock it.
          </ThemedText>
          <Pressable
            onPress={markComplete}
            disabled
            style={({ pressed }) => [styles.button, styles.buttonDisabled, pressed && styles.pressed]}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              Mark as complete
            </ThemedText>
          </Pressable>
        </View>
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

        <ThemedView type="backgroundElement" style={styles.card}>
          <ThemedText type="smallBold">What you&apos;ll learn</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {course.description}
          </ThemedText>
        </ThemedView>

        <Pressable
          onPress={markComplete}
          disabled={task.done}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            task.done && styles.buttonDone,
          ]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            {task.done ? 'Completed' : 'Mark as complete'}
          </ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  buttonDone: {
    opacity: 0.6,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.8,
  },
});