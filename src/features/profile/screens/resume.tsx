import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAssessmentResults, useUser } from '@/store';

export default function Resume() {
  const user = useUser();
  const results = useAssessmentResults();
  const latest = results[0];

  const experience = [
    { id: 1, role: user.title, company: 'Acme Inc', years: '2023 — present' },
    { id: 2, role: 'Web Developer', company: 'Startup Co', years: '2021 — 2023' },
  ];

  const education = [
    { id: 1, degree: 'B.Sc. Computer Science', school: 'State University', years: '2017 — 2021' },
  ];

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">My resume</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Preview with sample experience and education — edit your profile to replace them.
        </ThemedText>

        <View style={styles.section}>
          <ThemedText type="smallBold">Profile</ThemedText>
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="smallBold">{user.name}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">{user.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">{user.location} · {user.email}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">{user.bio}</ThemedText>
          </ThemedView>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold">Skills</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">{user.skills.join(' · ')}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold">Experience (sample)</ThemedText>
          {experience.map((job) => (
            <ThemedView key={job.id} type="backgroundElement" style={styles.card}>
              <ThemedText type="smallBold">{job.role}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {job.company} · {job.years}
              </ThemedText>
            </ThemedView>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold">Education (sample)</ThemedText>
          {education.map((item) => (
            <ThemedView key={item.id} type="backgroundElement" style={styles.card}>
              <ThemedText type="smallBold">{item.degree}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {item.school} · {item.years}
              </ThemedText>
            </ThemedView>
          ))}
        </View>

        {latest ? (
          <View style={styles.section}>
            <ThemedText type="smallBold">Assessment highlights</ThemedText>
            <ThemedView type="backgroundElement" style={styles.card}>
              {latest.topCareers.slice(0, 3).map((career) => (
                <ThemedText key={career.title} type="small" themeColor="textSecondary">
                  {career.title} · {career.score}% match
                </ThemedText>
              ))}
            </ThemedView>
          </View>
        ) : null}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  card: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.one,
  },
});