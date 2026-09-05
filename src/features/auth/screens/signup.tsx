import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authStore, userStore } from '@/store';

/** Standalone create-account screen: saves profile data, then OTP verification. */
export default function Signup() {
  const theme = useTheme();
  const router = useRouter();
  const { signUp, isLoading } = authStore;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const canCreateAccount =
    agreedToTerms && name.trim().length > 0 && email.trim().length > 0 && password.length > 0;

  const handleCreateAccount = async () => {
    if (isLoading) return;

    const result = await signUp(email.trim(), password, {
      full_name: name.trim(),
    });

    if (result.success) {
      // Store user profile info locally
      userStore.update({ name: name.trim(), email: email.trim() });

      // Navigate to OTP verification or home depending on email confirmation status
      if (result.data?.session) {
        // Email confirmed or auto-confirmed - go to onboarding
        router.replace('/personal-info');
      } else {
        // Email needs verification - go to OTP screen
        router.replace('/otp-verify');
      }
    } else {
      Alert.alert('Sign up failed', result.error || 'Could not create account. Please try again.');
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">Create account</ThemedText>
        <ThemedText themeColor="textSecondary">Let&apos;s build your career compass.</ThemedText>

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
          onPress={() => setAgreedToTerms((v) => !v)}
          style={({ pressed }) => [styles.termsRow, pressed && styles.pressed]}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreedToTerms }}
          accessibilityLabel="I agree to the Terms of Service and Privacy Policy">
          <View
            style={[
              styles.checkbox,
              { borderColor: theme.backgroundElement },
              agreedToTerms && { backgroundColor: '#3c87f7', borderColor: '#3c87f7' },
            ]}>
            {agreedToTerms && (
              <SymbolView name="checkmark" size={14} weight="bold" tintColor="#ffffff" />
            )}
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            I agree to the Terms of Service and Privacy Policy
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={handleCreateAccount}
          disabled={!canCreateAccount || isLoading}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            !canCreateAccount && styles.disabled,
            isLoading && styles.disabled,
          ]}>
          <ThemedText type="smallBold" themeColor="onBrand">
            {isLoading ? 'Creating account...' : 'Create Account'}
          </ThemedText>
        </Pressable>

        <Pressable onPress={() => router.replace('/login')} style={styles.link}>
          <ThemedText type="linkPrimary">Already have an account? Sign in</ThemedText>
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
    opacity: 0.5,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  checkbox: {
    width: Spacing.three,
    height: Spacing.three,
    borderWidth: 1.5,
    borderRadius: Spacing.one,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    alignItems: 'center',
  },
});