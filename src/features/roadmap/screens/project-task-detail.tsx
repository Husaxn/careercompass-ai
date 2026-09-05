import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { roadmapStore, useMilestones } from '@/store';

type ProjectTaskDetailProps = {
  milestoneId: string;
  taskId: string;
};

export default function ProjectTaskDetail({ milestoneId, taskId }: ProjectTaskDetailProps) {
  const theme = useTheme();
  const milestones = useMilestones();
  const task = milestones.find((m) => m.id === milestoneId)?.tasks.find((t) => t.id === taskId);

  const existing = task?.meta?.submission;
  const [link, setLink] = useState(existing?.link ?? '');
  const [file, setFile] = useState(existing?.file ?? '');

  if (!task) {
    return (
      <ScreenContainer>
        <StatePanel empty emptyText="Task not found." />
      </ScreenContainer>
    );
  }

  const hasSubmission = link.trim().length > 0 || file.trim().length > 0;

  const attachFile = () => setFile('sample-project.zip');

  const markComplete = () => {
    if (!hasSubmission) return;
    roadmapStore.updateTaskMeta(milestoneId, taskId, { submission: { link: link.trim(), file } });
    roadmapStore.setTaskDone(milestoneId, taskId, true);
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">{task.title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {task.meta?.projectBrief}
        </ThemedText>

        <View style={styles.field}>
          <ThemedText type="smallBold">Project link</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={link}
            onChangeText={setLink}
            placeholder="https://your-project.example.com"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.field}>
          <ThemedText type="smallBold">Or attach a file</ThemedText>
          {file ? (
            <ThemedView type="backgroundElement" style={styles.fileCard}>
              <ThemedText type="small">{file}</ThemedText>
            </ThemedView>
          ) : (
            <ThemedText type="small" themeColor="textSecondary">
              No file attached yet.
            </ThemedText>
          )}
          <Pressable
            onPress={attachFile}
            disabled={Boolean(file)}
            style={({ pressed }) => [
              styles.outlineButton,
              pressed && styles.pressed,
              file && styles.buttonDone,
            ]}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              {file ? 'File attached' : 'Attach file'}
            </ThemedText>
          </Pressable>
        </View>

        {!hasSubmission && (
          <ThemedText type="small" themeColor="textSecondary">
            Add a link or file above before you can mark this complete.
          </ThemedText>
        )}

        <Pressable
          onPress={markComplete}
          disabled={!hasSubmission || task.done}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            (!hasSubmission || task.done) && styles.buttonDone,
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
  field: {
    gap: Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    fontSize: 16,
  },
  fileCard: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
  },
  outlineButton: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#3c87f7',
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