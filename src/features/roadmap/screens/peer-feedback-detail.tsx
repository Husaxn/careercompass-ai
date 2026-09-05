import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { roadmapStore, useMilestones } from '@/store';

type PeerFeedbackDetailProps = {
  milestoneId: string;
  taskId: string;
};

const statusLabel = (status?: string) =>
  status === 'received' ? 'Feedback received' : status === 'skipped' ? 'Skipped' : 'Waiting for feedback';

export default function PeerFeedbackDetail({ milestoneId, taskId }: PeerFeedbackDetailProps) {
  const router = useRouter();
  const milestones = useMilestones();
  const task = milestones.find((m) => m.id === milestoneId)?.tasks.find((t) => t.id === taskId);

  const [confirmingSkip, setConfirmingSkip] = useState(false);

  if (!task) {
    return (
      <ScreenContainer>
        <StatePanel empty emptyText="Task not found." />
      </ScreenContainer>
    );
  }

  const status = task.meta?.feedbackStatus ?? 'pending';
  const ready = status === 'received' || status === 'skipped';

  const requestFeedback = () => router.push('/community/mentors');
  const markReceived = () =>
    roadmapStore.updateTaskMeta(milestoneId, taskId, {
      feedbackStatus: 'received',
      feedbackNote: 'Feedback received from your community.',
    });
  const confirmSkip = () => {
    if (!confirmingSkip) {
      setConfirmingSkip(true);
      return;
    }
    roadmapStore.updateTaskMeta(milestoneId, taskId, { feedbackStatus: 'skipped' });
    setConfirmingSkip(false);
  };
  const markComplete = () => roadmapStore.setTaskDone(milestoneId, taskId, true);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">{task.title}</ThemedText>

        <ThemedView type="backgroundElement" style={styles.statusCard}>
          <ThemedText type="smallBold">{statusLabel(status)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {status === 'received'
              ? task.meta?.feedbackNote
              : status === 'skipped'
                ? 'You chose to skip peer feedback for this milestone.'
                : 'Share your project with the community or a mentor to get feedback.'}
          </ThemedText>
        </ThemedView>

        <Pressable
          onPress={requestFeedback}
          style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Request feedback (Community / Mentors)
          </ThemedText>
        </Pressable>

        {status === 'pending' && (
          <>
            <Pressable
              onPress={markReceived}
              style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                Mark feedback as received
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={confirmSkip}
              style={({ pressed }) => [styles.skipButton, pressed && styles.pressed]}>
              <ThemedText type="small" themeColor="textSecondary">
                {confirmingSkip ? 'Tap again to confirm skip' : "I'll skip this task"}
              </ThemedText>
            </Pressable>
          </>
        )}

        {!ready && (
          <ThemedText type="small" themeColor="textSecondary">
            Complete the task once feedback is received, or skip it.
          </ThemedText>
        )}

        <Pressable
          onPress={markComplete}
          disabled={!ready || task.done}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            (!ready || task.done) && styles.buttonDone,
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
  statusCard: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  outlineButton: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#3c87f7',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
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