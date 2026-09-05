import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { OPTION_LABELS } from '@/features/assessment/questions';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QuestionProps = {
  total: number;
  index: number;
  question: { id: string; text: string };
  selected: number | null;
  onSelect: (optionIndex: number) => void;
  onNext: () => void;
  onBack?: () => void;
};

export default function Question({ total, index, question, selected, onSelect, onNext, onBack }: QuestionProps) {
  const theme = useTheme();
  const progress = Math.round(((index + 1) / total) * 100);
  const isLast = index === total - 1;

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="small" themeColor="textSecondary">
          Question {index + 1} of {total}
        </ThemedText>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress}%` }]} />
        </View>

        <ThemedText type="subtitle">{question.text}</ThemedText>

        <View style={styles.options}>
          {OPTION_LABELS.map((option, optionIndex) => {
            const isActive = selected === optionIndex;
            return (
              <Pressable
                key={option}
                onPress={() => onSelect(optionIndex)}
                style={({ pressed }) => [
                  styles.option,
                  { borderColor: theme.backgroundSelected },
                  isActive && { backgroundColor: theme.backgroundSelected, borderColor: '#3c87f7' },
                  pressed && styles.pressed,
                ]}>
                <ThemedText type="smallBold" themeColor={isActive ? 'text' : 'textSecondary'}>
                  {option}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          disabled={selected == null}
          onPress={onNext}
          style={({ pressed }) => [
            styles.next,
            pressed && styles.pressed,
            selected == null && { opacity: 0.5 },
          ]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            {isLast ? 'See results' : 'Next'}
          </ThemedText>
        </Pressable>

        {onBack && (
          <Pressable onPress={onBack} style={styles.link}>
            <ThemedText type="linkPrimary">Back</ThemedText>
          </Pressable>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
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
  options: {
    gap: Spacing.two,
  },
  option: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
  },
  next: {
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