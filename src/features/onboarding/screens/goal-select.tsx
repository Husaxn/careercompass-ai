import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { userStore } from '@/store';

type GoalSelectProps = {
  onContinue?: () => void;
  onBack?: () => void;
};

const goals = [
  {
    id: 'explore',
    title: 'Explore careers',
    description: 'Find out which paths match your strengths.',
  },
  {
    id: 'switch',
    title: 'Switch careers',
    description: 'Move into a new field with a clear plan.',
  },
  {
    id: 'grow',
    title: 'Grow in my role',
    description: 'Level up skills and advance your current career.',
  },
  {
    id: 'land',
    title: 'Land a job',
    description: 'Get hired with matched opportunities.',
  },
];

export default function GoalSelect({ onContinue, onBack }: GoalSelectProps) {
  const theme = useTheme();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected == null) return;
    const goal = goals.find((g) => g.id === selected);
    userStore.update({ goal: goal?.title ?? '' });
    onContinue?.();
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">What&apos;s your main goal?</ThemedText>
        <ThemedText themeColor="textSecondary">We&apos;ll shape your roadmap around it.</ThemedText>

        <View style={styles.list}>
          {goals.map((goal) => {
            const isActive = selected === goal.id;
            return (
              <Pressable
                key={goal.id}
                onPress={() => setSelected(goal.id)}
                style={({ pressed }) => [
                  styles.card,
                  { borderColor: theme.backgroundSelected },
                  isActive && { borderColor: '#3c87f7', backgroundColor: theme.backgroundSelected },
                  pressed && styles.pressed,
                ]}>
                <ThemedText type="smallBold">{goal.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {goal.description}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            selected == null && { opacity: 0.5 },
          ]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Continue
          </ThemedText>
        </Pressable>

        <Pressable onPress={onBack} style={styles.link}>
          <ThemedText type="linkPrimary">Back</ThemedText>
        </Pressable>
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
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
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
  link: {
    alignItems: 'center',
  },
});