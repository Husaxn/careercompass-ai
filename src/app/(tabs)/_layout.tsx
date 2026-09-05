import { Stack } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

import { Sidebar } from '@/components/layout/sidebar';
import { TabBar } from '@/components/layout/tab-bar';
import { ThemedView } from '@/components/themed-view';

export default function TabsLayout() {
  const isWeb = Platform.OS === 'web';

  return (
    <ThemedView style={[styles.root, isWeb && styles.row]}>
      {isWeb && <Sidebar />}

      <ThemedView style={styles.content}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" />
          <Stack.Screen name="recommendations" />
          <Stack.Screen name="roadmap" />
          <Stack.Screen name="community" />
          <Stack.Screen name="profile" />
        </Stack>
      </ThemedView>

      {!isWeb && <TabBar />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});