import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useLatestAssessmentScores, useUser } from '@/store';

export default function SkillTracker() {
  const user = useUser();
  const scores = useLatestAssessmentScores();

  const rows = [
    ...user.skills.map((skill) => ({ name: skill, level: 70 })),
    ...Object.entries(scores).map(([name, level]) => ({ name, level })),
  ];

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Skill tracker</ThemedText>
        <ThemedText themeColor="textSecondary">
          Track progress toward your target role from your profile and assessment results.
        </ThemedText>

        {rows.length === 0 ? (
          <ThemedText themeColor="textSecondary">Take an assessment to see your skill breakdown.</ThemedText>
        ) : (
          <View style={styles.list}>
            {rows.map((skill) => (
              <ThemedView key={skill.name} type="backgroundElement" style={styles.card}>
                <View style={styles.header}>
                  <ThemedText type="smallBold">{skill.name}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">{skill.level}%</ThemedText>
                </View>
                <View style={styles.track}>
                  <View style={[styles.fill, { width: `${skill.level}%` }]} />
                </View>
              </ThemedView>
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
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
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
});