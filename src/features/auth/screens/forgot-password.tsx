import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authStore } from '@/store';

export default function ForgotPassword() {
  const theme = useTheme();
  const router = useRouter();
  const { resetPassword, isLoading } = authStore;
  const [email, setEmail] = useState('');

  const handleSendReset = async () => {
    if (!email.trim()) {
      Alert.alert('Missing email', 'Enter your email to receive a reset link.');
      return;
    }
    if (isLoading) return;

    const result = await resetPassword(email.trim());
    if (result.success) {
      Alert.alert('Reset link sent', 'Check your email for the password reset link.');
      router.replace('/login');
    } else {
      Alert.alert('Failed to send reset link', result.error || 'Please try again.');
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">Forgot password?</ThemedText>
        <ThemedText themeColor="textSecondary">
          Enter your email and we&apos;ll send you a reset link.
        </ThemedText>

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
          onPress={handleSendReset}
          disabled={isLoading}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, isLoading && styles.disabled]}>
          <ThemedText type="smallBold" themeColor="onBrand">
            {isLoading ? 'Sending...' : 'Send reset link'}
          </ThemedText>
        </Pressable>

        <Pressable onPress={() => router.replace('/login')} style={styles.link}>
          <ThemedText type="linkPrimary">Back to sign in</ThemedText>
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
  disabled: {
    opacity: 0.6,
  },
  link: {
    alignItems: 'center',
  },
});