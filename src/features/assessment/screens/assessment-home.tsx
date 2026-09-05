import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const assessments = [
  { id: 'interests', title: 'Interest assessment', hint: '5 min · 10 questions', comingSoon: false },
  { id: 'skills', title: 'Skills assessment', hint: '10 min · 40 questions', comingSoon: true },
  { id: 'personality', title: 'Personality fit', hint: '8 min · 36 questions', comingSoon: true },
];

type AssessmentHomeProps = {
  onSelect?: (id: string) => void;
};

export default function AssessmentHome({ onSelect }: AssessmentHomeProps) {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Assessments</ThemedText>
        <ThemedText themeColor="textSecondary">
          Discover your strengths and the careers best suited to you.
        </ThemedText>

        <View style={styles.list}>
          {assessments.map((item) => {
            const enabled = !item.comingSoon;
            return (
              <Pressable
                key={item.id}
                disabled={!enabled}
                onPress={() => onSelect?.(item.id)}
                style={({ pressed }) => [styles.item, pressed && styles.pressed, !enabled && styles.disabled]}>
                <ThemedView type="backgroundElement" style={styles.card}>
                  <ThemedText type="smallBold">{item.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.hint}
                  </ThemedText>
                  {item.comingSoon && (
                    <ThemedText type="small" themeColor="textSecondary" style={styles.comingSoon}>
                      Coming soon
                    </ThemedText>
                  )}
                </ThemedView>
              </Pressable>
            );
          })}
        </View>
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
  item: {
    borderRadius: Spacing.three,
  },
  disabled: {
    opacity: 0.5,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  comingSoon: {
    marginTop: Spacing.one,
  },
  pressed: {
    opacity: 0.8,
  },
});