import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { userStore } from '@/store';

type InterestSelectProps = {
  onContinue?: () => void;
  onBack?: () => void;
};

const interests = [
  'Technology',
  'Design',
  'Finance',
  'Marketing',
  'Healthcare',
  'Education',
  'Business',
  'Science',
];

export default function InterestSelect({ onContinue, onBack }: InterestSelectProps) {
  const theme = useTheme();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (interest: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(interest)) {
        next.delete(interest);
      } else {
        next.add(interest);
      }
      return next;
    });
  };

  const handleContinue = () => {
    userStore.update({ interests: [...selected] });
    onContinue?.();
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">What interests you?</ThemedText>
        <ThemedText themeColor="textSecondary">
          Pick as many areas as you like. We&apos;ll tailor your recommendations.
        </ThemedText>

        <View style={styles.grid}>
          {interests.map((interest) => {
            const isActive = selected.has(interest);
            return (
              <Pressable
                key={interest}
                onPress={() => toggle(interest)}
                style={({ pressed }) => [
                  styles.chip,
                  { borderColor: theme.backgroundSelected },
                  isActive && { backgroundColor: theme.backgroundSelected },
                  pressed && styles.pressed,
                ]}>
                <ThemedText type="small" themeColor={isActive ? 'text' : 'textSecondary'}>
                  {interest}
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
            selected.size === 0 && { opacity: 0.5 },
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
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