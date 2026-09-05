import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import {
  getRoadmapProgress,
  isTaskReadyToComplete,
  roadmapStore,
  useMilestones,
  type MilestoneTask,
} from '@/store';

type MilestoneDetailProps = {
  id: string;
};

export default function MilestoneDetail({ id }: MilestoneDetailProps) {
  const router = useRouter();
  const milestones = useMilestones();
  const { total, completed } = getRoadmapProgress(milestones);
  const milestone = milestones.find((m) => m.id === id) ?? null;

  if (!milestone) {
    return (
      <ScreenContainer>
        <StatePanel empty emptyText="Milestone not found." />
      </ScreenContainer>
    );
  }

  const doneCount = milestone.tasks.filter((t) => t.done).length;

  const openTask = (task: MilestoneTask) => {
    const type = task.meta?.taskType ?? 'course';
    router.push({
      pathname: '/roadmap/task/[type]',
      params: { type, milestoneId: milestone.id, taskId: task.id },
    });
  };

  const toggleTask = (task: MilestoneTask) => {
    if (!task.done && !isTaskReadyToComplete(task)) {
      openTask(task);
      return;
    }
    roadmapStore.toggleTask(milestone.id, task.id);
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">{milestone.title}</ThemedText>
        <ThemedText themeColor="textSecondary">{milestone.description}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Milestone progress · {doneCount} of {milestone.tasks.length} tasks
        </ThemedText>

        <View style={styles.list}>
          {milestone.tasks.map((task) => (
            <View key={task.id} style={styles.task}>
              <ThemedView type="backgroundElement" style={styles.card}>
                <Pressable
                  onPress={() => toggleTask(task)}
                  hitSlop={10}
                  style={({ pressed }) => [styles.checkWrap, pressed && styles.pressed]}>
                  <View style={[styles.check, task.done && styles.checkDone]} />
                </Pressable>
                <Pressable
                  onPress={() => openTask(task)}
                  style={({ pressed }) => [styles.titlePress, pressed && styles.pressed]}>
                  <ThemedText
                    type="small"
                    themeColor={task.done ? 'textSecondary' : 'text'}
                    style={task.done && styles.doneText}>
                    {task.title}
                  </ThemedText>
                  {!isTaskReadyToComplete(task) && (
                    <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
                      Tap to complete details first
                    </ThemedText>
                  )}
                </Pressable>
              </ThemedView>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => roadmapStore.markMilestoneComplete(milestone.id)}
          disabled={milestone.tasks.length === 0}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            milestone.tasks.length === 0 && { opacity: 0.5 },
          ]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Mark as complete
          </ThemedText>
        </Pressable>

        <ThemedText type="small" themeColor="textSecondary">
          Overall roadmap: {completed} of {total} milestones completed
        </ThemedText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.two,
  },
  task: {
    borderRadius: Spacing.two,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Spacing.two,
    padding: Spacing.three,
  },
  checkWrap: {
    paddingVertical: Spacing.one,
  },
  titlePress: {
    flex: 1,
    gap: Spacing.half,
  },
  check: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#3c87f7',
  },
  checkDone: {
    backgroundColor: '#3c87f7',
  },
  doneText: {
    textDecorationLine: 'line-through',
  },
  hint: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.8,
  },
});