import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { getRoadmapProgress, roadmapStore, useMilestones, type Milestone } from '@/store';

const statusLabel = (status: Milestone['status']) =>
  status === 'completed' ? 'Done' : status === 'current' ? 'In progress' : 'Upcoming';

type RoadmapOverviewProps = {
  onOpen: (id: string) => void;
};

export default function RoadmapOverview({ onOpen }: RoadmapOverviewProps) {
  const milestones = useMilestones();
  const { total, completed, percent, nextMilestone } = getRoadmapProgress(milestones);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="heading">Your roadmap</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          {completed} of {total} milestones completed · Frontend Engineer path
        </ThemedText>

        <View style={styles.progressRow}>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${percent}%` }]} />
          </View>
          <ThemedText type="smallBold">{percent}%</ThemedText>
        </View>

        {milestones.length === 0 ? (
          <StatePanel empty emptyText="Your roadmap is empty. Take an assessment to build one." />
        ) : (
          <View style={styles.list}>
            {milestones.map((item) => (
              <View key={item.id} style={styles.milestoneWrap}>
                <Collapsible title={`${item.title} · ${statusLabel(item.status)}`}>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.description}
                  </ThemedText>

                  <View style={styles.tasks}>
                    {item.tasks.map((task) => (
                      <Pressable
                        key={task.id}
                        onPress={() => roadmapStore.toggleTask(item.id, task.id)}
                        style={({ pressed }) => [styles.task, pressed && styles.pressed]}>
                        <View style={[styles.check, task.done && styles.checkDone]} />
                        <ThemedText type="small" themeColor={task.done ? 'textSecondary' : 'text'}>
                          {task.title}
                        </ThemedText>
                      </Pressable>
                    ))}
                  </View>

                  {item.id === nextMilestone?.id && (
                    <Pressable onPress={() => onOpen(item.id)} style={styles.open}>
                      <ThemedText type="linkPrimary">Open milestone →</ThemedText>
                    </Pressable>
                  )}
                </Collapsible>
              </View>
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
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  track: {
    flex: 1,
    height: Spacing.two,
    borderRadius: Spacing.one,
    backgroundColor: '#3c87f7',
    opacity: 0.3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Spacing.one,
    backgroundColor: '#3c87f7',
    opacity: 1,
  },
  list: {
    gap: Spacing.three,
  },
  milestoneWrap: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  tasks: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.one,
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
  open: {
    marginTop: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});