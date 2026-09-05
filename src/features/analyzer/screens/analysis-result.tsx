import { Pressable, StyleSheet, View } from 'react-native';

import { ResponsiveContainer } from '@/components/layout/responsive-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AnalysisResult as AnalysisResultData } from '@/services/analyzer-service';
import { Spacing } from '@/constants/theme';

type AnalysisResultProps = {
  /** Finished analysis data to render. */
  result: AnalysisResultData;
  /** Called when the user wants the full roadmap. */
  onViewRoadmap?: () => void;
};

export default function AnalysisResult({ result, onViewRoadmap }: AnalysisResultProps) {
  return (
    <ResponsiveContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Your analysis</ThemedText>

        <ThemedView type="backgroundElement" style={styles.match}>
          <ThemedText type="small" themeColor="textSecondary">
            Top match
          </ThemedText>
          <ThemedText type="smallBold">{result.topMatch}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {result.matchScore}% match
          </ThemedText>
        </ThemedView>

        <View style={styles.section}>
          <ThemedText type="smallBold">Strengths</ThemedText>
          {result.strengths.map((item) => (
            <ThemedText key={item} type="small" themeColor="textSecondary">
              {item}
            </ThemedText>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold">Gaps to close</ThemedText>
          {result.gaps.map((item) => (
            <ThemedText key={item} type="small" themeColor="textSecondary">
              {item}
            </ThemedText>
          ))}
        </View>

        {onViewRoadmap ? (
          <Pressable
            onPress={onViewRoadmap}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              View full roadmap
            </ThemedText>
          </Pressable>
        ) : null}
      </View>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  match: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  section: {
    gap: Spacing.one,
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