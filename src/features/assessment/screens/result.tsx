import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type ResultProps = {
  topCareers: { title: string; score: number }[];
  scores?: Record<string, number>;
  onViewRecommendations?: () => void;
  onRetake?: () => void;
};

export default function Result({ topCareers, scores = {}, onViewRecommendations, onRetake }: ResultProps) {
  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="title">Your results</ThemedText>
        <ThemedText themeColor="textSecondary">
          Based on your answers, here are careers that fit your profile.
        </ThemedText>

        {topCareers.length === 0 ? (
          <ThemedText themeColor="textSecondary">Complete the assessment to see your matches.</ThemedText>
        ) : (
          <>
            <View style={styles.list}>
              {topCareers.map((career, index) => (
                <ThemedView key={career.title} type="backgroundElement" style={styles.card}>
                  <ThemedText type="small" themeColor="textSecondary">
                    #{index + 1}
                  </ThemedText>
                  <View style={styles.careerLine}>
                    <ThemedText type="smallBold">{career.title}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">{career.score}%</ThemedText>
                  </View>
                </ThemedView>
              ))}
            </View>

            {Object.keys(scores).length > 0 && (
              <View style={styles.scores}>
                {Object.entries(scores).map(([label, value]) => (
                  <ThemedView key={label} type="backgroundElement" style={styles.scoreCard}>
                    <View style={styles.careerLine}>
                      <ThemedText type="small">{label}</ThemedText>
                      <ThemedText type="smallBold">{value}%</ThemedText>
                    </View>
                    <View style={styles.track}>
                      <View style={[styles.fill, { width: `${value}%` }]} />
                    </View>
                  </ThemedView>
                ))}
              </View>
            )}
          </>
        )}

        <Pressable
          onPress={onViewRecommendations}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            View recommendations
          </ThemedText>
        </Pressable>

        {onRetake && (
          <Pressable onPress={onRetake} style={styles.link}>
            <ThemedText type="linkPrimary">Retake assessment</ThemedText>
          </Pressable>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  content: {
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.three,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  careerLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scores: {
    gap: Spacing.two,
  },
  scoreCard: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.two,
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
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.8,
  },
  link: {
    alignItems: 'center',
  },
});