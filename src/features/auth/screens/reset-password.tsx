import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authStore } from '@/store';

export default function ResetPassword() {
  const theme = useTheme();
  const router = useRouter();
  const { updatePassword, isLoading } = authStore;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSavePassword = async () => {
    if (!password || !confirm) {
      Alert.alert('Missing password', 'Please enter and confirm your new password.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Passwords do not match', 'Please make sure both passwords are identical.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password too short', 'Password must be at least 6 characters.');
      return;
    }
    if (isLoading) return;

    const result = await updatePassword(password);
    if (result.success) {
      Alert.alert('Password updated', 'Your password has been changed successfully.');
      router.replace('/login');
    } else {
      Alert.alert('Failed to update password', result.error || 'Please try again.');
    }
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="subtitle">Reset password</ThemedText>
        <ThemedText themeColor="textSecondary">Choose a new password for your account.</ThemedText>

        {[
          { label: 'New password', value: password, onChange: setPassword, visible: showPassword, toggle: setShowPassword },
          { label: 'Confirm password', value: confirm, onChange: setConfirm, visible: showConfirm, toggle: setShowConfirm },
        ].map((field) => (
          <View key={field.label} style={styles.fieldGroup}>
            <ThemedText type="smallBold">{field.label}</ThemedText>
            <View style={[styles.inputContainer, { borderColor: theme.backgroundElement }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry={!field.visible}
                placeholder="••••••••"
                placeholderTextColor={theme.textSecondary}
              />
              <Pressable
                onPress={() => field.toggle((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={field.visible ? `Hide ${field.label.toLowerCase()}` : `Show ${field.label.toLowerCase()}`}
                style={styles.visibilityButton}>
                <SymbolView
                  name={field.visible ? 'eye.slash' : 'eye'}
                  size={20}
                  tintColor={theme.textSecondary}
                />
              </Pressable>
            </View>
          </View>
        ))}

        <Pressable
          onPress={handleSavePassword}
          disabled={isLoading}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, isLoading && styles.disabled]}>
          <ThemedText type="smallBold" themeColor="onBrand">
            {isLoading ? 'Saving...' : 'Save password'}
          </ThemedText>
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
});