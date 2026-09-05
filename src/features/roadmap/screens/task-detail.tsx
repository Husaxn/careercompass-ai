import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { roadmapStore, useMilestones, type ChecklistStep } from '@/store';

type TaskDetailProps = {
  milestoneId: string;
  taskId: string;
};

export default function TaskDetail({ milestoneId, taskId }: TaskDetailProps) {
  const milestones = useMilestones();
  const task = milestones.find((m) => m.id === milestoneId)?.tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <ScreenContainer>
        <StatePanel empty emptyText="Task not found." />
      </ScreenContainer>
    );
  }

  const type = task.meta?.taskType;
  const markComplete = () => roadmapStore.setTaskDone(milestoneId, taskId, true);

  const toggleStep = (step: ChecklistStep) => {
    const steps = (task.meta?.steps ?? []).map((s) =>
      s.id === step.id ? { ...s, done: !s.done } : s,
    );
    roadmapStore.updateTaskMeta(milestoneId, taskId, { steps });
  };

  const renderLearning = (
    <>
      <ThemedText type="small" themeColor="textSecondary">
        Review these core concepts to build the foundation you need.
      </ThemedText>
      <View style={styles.list}>
        {(task.meta?.content ?? []).map((item) => (
          <ThemedView key={item} type="backgroundElement" style={styles.card}>
            <ThemedText type="small">{item}</ThemedText>
          </ThemedView>
        ))}
      </View>
      <ActionButton label={task.done ? 'Completed' : 'Mark as complete'} disabled={task.done} onPress={markComplete} />
    </>
  );

  const renderSetup = () => {
    const steps = task.meta?.steps ?? [];
    const allDone = steps.length > 0 && steps.every((s) => s.done);
    return (
      <>
        <ThemedText type="small" themeColor="textSecondary">
          Tick each step as you finish it. The task completes once every step is checked.
        </ThemedText>
        <View style={styles.list}>
          {steps.map((step) => (
            <Pressable
              key={step.id}
              onPress={() => toggleStep(step)}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
              <ThemedView type="backgroundElement" style={[styles.card, styles.stepCard]}>
                <View style={[styles.check, step.done && styles.checkDone]} />
                <ThemedText type="small" themeColor={step.done ? 'textSecondary' : 'text'}>
                  {step.label}
                </ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </View>
        {!allDone && (
          <ThemedText type="small" themeColor="textSecondary">
            Check all steps to enable completion.
          </ThemedText>
        )}
        <ActionButton label={task.done ? 'Completed' : 'Mark as complete'} disabled={!allDone || task.done} onPress={markComplete} />
      </>
    );
  };

  const renderTutorial = (
    <>
      <ThemedText type="small" themeColor="textSecondary">
        Follow the guided tutorial, then confirm you finished.
      </ThemedText>
      <View style={styles.list}>
        {(task.meta?.content ?? []).map((item) => (
          <ThemedView key={item} type="backgroundElement" style={styles.card}>
            <ThemedText type="small">{item}</ThemedText>
          </ThemedView>
        ))}
      </View>
      {task.meta?.resourceLink ? (
        <ThemedText type="linkPrimary">{task.meta.resourceLink}</ThemedText>
      ) : null}
      <ActionButton label={task.done ? 'Completed' : 'Mark as complete'} disabled={task.done} onPress={markComplete} />
    </>
  );

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">{task.title}</ThemedText>
        {type === 'setup' ? renderSetup() : type === 'tutorial' ? renderTutorial : renderLearning}
      </View>
    </ScreenContainer>
  );
}

type ActionButtonProps = {
  label: string;
  disabled?: boolean;
  onPress: () => void;
};

function ActionButton({ label, disabled, onPress }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.buttonDone]}>
      <ThemedText type="smallBold" themeColor="textSecondary">
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.two,
  },
  card: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  row: {
    borderRadius: Spacing.two,
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
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  buttonDone: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});