import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { userStore } from '@/store';

type PersonalInfoProps = {
  onContinue?: () => void;
  onBack?: () => void;
};

/** Onboarding step 1: capture the user's name and email. */
export default function PersonalInfo({ onContinue, onBack }: PersonalInfoProps) {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const valid = name.trim().length > 0 && email.includes('@');

  const handleContinue = () => {
    if (!valid) return;
    userStore.update({ name: name.trim(), email: email.trim() });
    onContinue?.();
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">Tell us about you</ThemedText>
        <ThemedText themeColor="textSecondary">
          A few details help us tailor your career compass.
        </ThemedText>

        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold">Full name</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholder="Jane Doe"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold">Email</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            !valid && { opacity: 0.5 },
          ]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Continue
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
  fieldGroup: {
    gap: Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    fontSize: 16,
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