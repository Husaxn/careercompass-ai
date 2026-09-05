import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authStore } from '@/store';

/** Standalone login screen: email/phone + password only. */
export default function Login() {
  const theme = useTheme();
  const router = useRouter();
  const { signInWithPassword, isLoading } = authStore;
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    if (!identifier.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email/phone and password to log in.');
      return;
    }
    if (isLoading) return;

    const result = await signInWithPassword(identifier.trim(), password);
    if (result.success) {
      router.replace('/home');
    } else {
      Alert.alert('Login failed', result.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">Welcome back</ThemedText>
        <ThemedText themeColor="textSecondary">Log in to continue your journey.</ThemedText>

        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold">Email or phone</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold">Password</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <Pressable
          onPress={handleLogIn}
          disabled={isLoading}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, isLoading && styles.disabled]}>
          <ThemedText type="smallBold" themeColor="onBrand">
            {isLoading ? 'Signing in...' : 'Log In'}
          </ThemedText>
        </Pressable>

        <Pressable onPress={() => router.replace('/forgot-password')} style={styles.link}>
          <ThemedText type="linkPrimary">Forgot password?</ThemedText>
        </Pressable>

        <Pressable onPress={() => router.replace('/signup')} style={styles.link}>
          <ThemedText type="linkPrimary">Don&apos;t have an account? Sign up</ThemedText>
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