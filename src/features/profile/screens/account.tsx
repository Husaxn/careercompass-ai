import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { authStore, clearUserData, useUser } from '@/store';

export default function Account() {
  const router = useRouter();
  const user = useUser();

  const details = [
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone },
    { label: 'Location', value: user.location },
  ];

  const signOut = () => {
    // Mirror Profile logout: clear in-memory + persisted user data, then the
    // auth session, then reset navigation so back can't re-enter the app.
    clearUserData().finally(() => {
      authStore.logOut();
      router.replace('/login');
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Account</ThemedText>

        <View style={styles.list}>
          {details.map((item) => (
            <ThemedView key={item.label} type="backgroundElement" style={styles.row}>
              <ThemedText type="small" themeColor="textSecondary">{item.label}</ThemedText>
              <ThemedText type="small">{item.value}</ThemedText>
            </ThemedView>
          ))}
        </View>

        <Pressable onPress={signOut} style={({ pressed }) => [styles.danger, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="textSecondary">Sign out</ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  danger: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#d9534f',
  },
  pressed: {
    opacity: 0.8,
  },
});