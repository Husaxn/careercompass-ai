import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
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
  const [showPassword, setShowPassword] = useState(false);

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
          <View style={[styles.inputContainer, { borderColor: theme.backgroundElement }]}>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="••••••••"
              placeholderTextColor={theme.textSecondary}
            />
            <Pressable
              onPress={() => setShowPassword((visible) => !visible)}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              style={styles.visibilityButton}>
              <SymbolView
                name={showPassword ? 'eye.slash' : 'eye'}
                size={20}
                tintColor={theme.textSecondary}
              />
            </Pressable>
          </View>
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
    padding: Spacing.three,
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
  },
  visibilityButton: {
    padding: Spacing.three,
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