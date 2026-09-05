import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Spacing } from '@/constants/theme';
import { getRoadmapProgress, useMilestones, useUser } from '@/store';

const quickActions = [
  { id: 'resume', label: 'Analyze resume', hint: 'Upload a CV' },
  { id: 'assessment', label: 'Take assessment', hint: '5 min' },
  { id: 'roadmap', label: 'View roadmap', hint: 'Your plan' },
];

export default function Dashboard() {
  const router = useRouter();
  const user = useUser();
  const milestones = useMilestones();
  const { completed, total, nextMilestone } = getRoadmapProgress(milestones);

  const firstName = user.name.split(' ')[0] || 'there';

  const openAction = (id: string) => {
    if (id === 'resume') router.push('/analyzer/source-upload');
    else if (id === 'assessment') router.push('/assessment/home');
    else if (id === 'roadmap') router.push('/roadmap');
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <ThemedText type="caption" themeColor="textSecondary">
              Good {getGreeting()}, {firstName}
            </ThemedText>
            <ThemedText type="heading">Dashboard</ThemedText>
          </View>
          <UserAvatar size={44} editable={false} onPress={() => router.push('/profile')} />
        </View>

        <View style={styles.actions}>
          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              onPress={() => openAction(action.id)}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
              <ThemedText type="captionBold">{action.label}</ThemedText>
              <ThemedText type="caption" themeColor="textSecondary">
                {action.hint}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={() => nextMilestone && router.push(`/roadmap/milestone/${nextMilestone.id}`)}
          disabled={!nextMilestone}
          style={({ pressed }) => [styles.summaryCardWrap, pressed && styles.pressed]}>
          <ThemedView type="backgroundElement" style={styles.summaryCard}>
            <ThemedText type="caption" themeColor="textSecondary">
              Next milestone
            </ThemedText>
            <ThemedText type="captionBold">{nextMilestone?.title ?? 'All milestones complete!'}</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">
              {completed} of {total} completed
            </ThemedText>
          </ThemedView>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
  },
  content: {
    gap: Spacing.four,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  action: {
    flexBasis: '45%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#3c87f7',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  summaryCardWrap: {
    borderRadius: Spacing.three,
  },
  summaryCard: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.8,
  },
});