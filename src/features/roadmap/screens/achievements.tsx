import { useState } from 'react';
import { StyleSheet, View, Pressable, ScrollView } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getRoadmapProgress, useMilestones } from '@/store';

export default function Achievements() {
  const milestones = useMilestones();
  const { completed, percent } = getRoadmapProgress(milestones);

  const badges = [
    {
      id: 'first',
      title: 'First milestone',
      note: 'Completed your first step',
    },
    {
      id: 'quarter',
      title: 'Quarter milestone',
      note: `Completed ${Math.max(0, Math.floor(completed / 3)) * 3} milestones`,
    },
    {
      id: 'halfway',
      title: 'Halfway there',
      note: 'Completed 50% of your roadmap',
    },
    {
      id: 'roadmap',
      title: 'Roadmap complete',
      note: 'Finished every milestone',
    },
  ];

  const unlockedMap: Record<string, boolean> = {
    first: completed >= 1,
    quarter: completed >= 3,
    halfway: percent >= 50,
    roadmap: percent >= 100,
  };

  const lockedInfo: Record<string, { needed: string; current: string }> = {
    first: {
      needed: 'Complete 1 milestone',
      current: `${completed} of ${milestones.length} milestones completed`,
    },
    quarter: {
      needed: 'Complete 3 milestones',
      current: `${completed} of ${milestones.length} milestones completed`,
    },
    halfway: {
      needed: '50% roadmap progress',
      current: `${percent}% complete`,
    },
    roadmap: {
      needed: '100% roadmap progress',
      current: `${percent}% complete`,
    },
  };

  const [showDetail, setShowDetail] = useState<'first' | 'quarter' | 'halfway' | 'roadmap' | null>(null);
  const [earnedAt, setEarnedAt] = useState<Record<string, string>>({});

  const getEarnedAt = (badgeId: string) => {
    if (badgeId === 'first') return completed >= 1 ? new Date().toDateString() : undefined;
    if (badgeId === 'quarter') return completed >= 3 ? new Date().toDateString() : undefined;
    if (badgeId === 'halfway') return percent >= 50 ? new Date().toDateString() : undefined;
    if (badgeId === 'roadmap') return percent >= 100 ? new Date().toDateString() : undefined;
    return undefined;
  };

  const handleCardPress = (badgeId: string) => {
    if (badgeId === 'first' && completed >= 1) {
      setEarnedAt(prev => ({ ...prev, [badgeId]: getEarnedAt(badgeId) || new Date().toDateString() }));
      setShowDetail('first');
    } else if (badgeId === 'quarter' && completed >= 3) {
      setEarnedAt(prev => ({ ...prev, [badgeId]: getEarnedAt(badgeId) || new Date().toDateString() }));
      setShowDetail('quarter');
    } else if (badgeId === 'halfway' && percent >= 50) {
      setShowDetail('halfway');
    } else if (badgeId === 'roadmap' && percent >= 100) {
      setShowDetail('roadmap');
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ gap: Spacing.four, padding: Spacing.four }}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Achievements</ThemedText>
          <ThemedText themeColor="textSecondary">Celebrate your progress along the way.</ThemedText>
        </View>

        <View style={styles.list}>
          {badges.map((badge) => {
    const earned = unlockedMap[badge.id];
    const info = lockedInfo[badge.id];

    return (
      <Pressable
        key={badge.id}
        style={[
          styles.card,
          earned && { opacity: 1 },
          !earned && { opacity: 0.5, pointerEvents: 'none' },
        ]}
        onPress={earned ? () => handleCardPress(badge.id) : undefined}
        accessibilityLabel={earned
          ? `View ${badge.title} details`
          : ` ${badge.title} is locked. ${info.needed}. You are at ${info.current}.`}
      >
        <ThemedView type="backgroundElement" style={styles.cardInner}>
          <ThemedText type="smallBold">
            {earned ? badge.title : `${badge.title} (locked)`}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {earned ? badge.note : info?.needed ?? ''}
          </ThemedText>
        </ThemedView>
      </Pressable>
    );
  })}
        </View>

        {showDetail && (
          <AchievementDetailModal
            badgeTitle={showDetail}
            earnedAt={earnedAt[showDetail] || undefined}
            onClose={() => setShowDetail(null)}
          />
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

function AchievementDetailModal({ badgeTitle, earnedAt, onClose }: { badgeTitle: string; earnedAt?: string; onClose: () => void }) {
  const descriptions: Record<string, string> = {
    first: 'Earned by completing your first milestone. This marks the beginning of your roadmap journey.',
    quarter: 'Earned when you complete 3 milestones, representing significant progress through your roadmap.',
    halfway: 'Earned when you reach the halfway point of your roadmap. Keep going!',
    roadmap: 'Earned when you complete all milestones in your roadmap. Congratulations on completing your roadmap!',
  };

  return (
    <View style={styles.modalBackground}>
      <Pressable onPress={e => e.stopPropagation()} style={styles.modalOverlay} />
      <View style={styles.modalContainer}>
        <ThemedText type="heading" style={styles.modalTitle}>
          {badgeTitle} achieved!
        </ThemedText>
        <ThemedText type="body" style={styles.modalDescription}>
          {descriptions[badgeTitle]}
        </ThemedText>
        {earnedAt && (
          <View style={styles.earnedAt}>
            <ThemedText type="small" themeColor="textSecondary">
              Earned {earnedAt}
            </ThemedText>
          </View>
        )}
        <Pressable style={styles.modalButton} onPress={onClose}>
          <ThemedText type="smallBold" themeColor="textSecondary">Close</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  list: {
    gap: Spacing.three,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
    backgroundColor: 'white',
  },
  cardInner: {
    borderRadius: Spacing.two,
    padding: Spacing.two,
    gap: Spacing.two,
    backgroundColor: 'white',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFill,
  },
  modalContainer: {
    marginTop: Spacing.eight,
    backgroundColor: 'white',
    borderRadius: Spacing.three,
    padding: Spacing.four,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: Spacing.three,
  },
  earnedAt: {
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  modalButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
    marginTop: Spacing.two,
  },
});