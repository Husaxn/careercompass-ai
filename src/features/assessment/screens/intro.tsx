import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type IntroProps = {
  count?: number;
  onStart?: () => void;
  onBack?: () => void;
};

export default function Intro({ count = 10, onStart, onBack }: IntroProps) {
  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">Let&apos;s begin</ThemedText>
        <ThemedText themeColor="textSecondary">
          Answer honestly. There are no right or wrong answers — this helps us understand what
          energizes you.
        </ThemedText>

        <ThemedText type="small" themeColor="textSecondary">
          {count} questions · about 5 minutes · take your time
        </ThemedText>

        <Pressable onPress={onStart} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Start assessment
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
  wrapper: {
    justifyContent: 'center',
  },
  content: {
    gap: Spacing.four,
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