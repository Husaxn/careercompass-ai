import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/store';

type SummaryProps = {
  onFinish?: () => void;
  onBack?: () => void;
};

export default function Summary({ onFinish, onBack }: SummaryProps) {
  const user = useUser();

  const summaryItems = [
    { label: 'Name', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Interests', value: user.interests.length > 0 ? user.interests.join(', ') : 'Not selected' },
    { label: 'Goal', value: user.goal },
    { label: 'Experience', value: user.experience },
  ];
  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">Your profile</ThemedText>
        <ThemedText themeColor="textSecondary">
          Review your selections. You can always change these later.
        </ThemedText>

        <View style={styles.cards}>
          {summaryItems.map((item) => (
            <ThemedView key={item.label} type="backgroundElement" style={styles.card}>
              <ThemedText type="small" themeColor="textSecondary">
                {item.label}
              </ThemedText>
              <ThemedText type="smallBold">{item.value}</ThemedText>
            </ThemedView>
          ))}
        </View>

        <Pressable onPress={onFinish} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Create account
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
  cards: {
    gap: Spacing.three,
  },
  card: {
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