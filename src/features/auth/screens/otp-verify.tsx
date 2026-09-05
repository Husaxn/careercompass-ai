import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authStore } from '@/store';

const RESEND_SECONDS = 30;

export default function OTPVerify() {
  const theme = useTheme();
  const router = useRouter();
  const { resendEmailVerification, verifyOtp, isLoading } = authStore;
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [resent, setResent] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleResend = async () => {
    if (isLoading) return;
    const result = await resendEmailVerification();
    if (result.success) {
      setSeconds(RESEND_SECONDS);
      setResent(true);
    } else {
      Alert.alert('Failed to resend', result.error || 'Please try again.');
    }
  };

  const handleVerify = async () => {
    if (code.length !== 6) {
      Alert.alert('Invalid code', 'Please enter the 6-digit code sent to your email.');
      return;
    }
    const result = await verifyOtp(code);
    if (result.success) {
      router.replace('/personal-info');
    } else {
      Alert.alert('Verification failed', result.error || 'Please check the code and try again.');
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">Verify your email</ThemedText>
        <ThemedText themeColor="textSecondary">
          We&apos;ve sent a 6-digit code to your email. Enter it below to continue.
        </ThemedText>

        <TextInput
          value={code}
          onChangeText={(text) => setCode(text.replace(/[^0-9]/g, '').slice(0, 6))}
          placeholder="Enter 6-digit code"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
        />

        <Pressable
          onPress={handleVerify}
          disabled={isLoading || code.length !== 6}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            (isLoading || code.length !== 6) && styles.disabled,
          ]}>
          <ThemedText type="smallBold" themeColor="onBrand">
            {isLoading ? 'Verifying...' : 'Verify'}
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={handleResend}
          disabled={seconds > 0 || isLoading}
          style={({ pressed }) => [styles.resend, pressed && styles.pressed, (seconds > 0 || isLoading) && styles.resendDisabled]}>
          <ThemedText type="linkPrimary">
            {seconds > 0 ? `Resend code in ${seconds}s` : 'Resend code'}
          </ThemedText>
        </Pressable>

        {resent && (
          <ThemedText type="small" themeColor="textSecondary">
            A new code has been sent — check your inbox.
          </ThemedText>
        )}

        <Pressable onPress={() => router.replace('/login')} style={styles.resend}>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    fontSize: 20,
    letterSpacing: 8,
    textAlign: 'center',
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
  resend: {
    alignItems: 'center',
  },
  resendDisabled: {
    opacity: 0.5,
  },
});