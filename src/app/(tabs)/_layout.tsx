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
          <Stack.Screen name="profile" />
          <Stack.Screen name="resume-analyzer" />
          <Stack.Screen name="skill-assessment" />
          <Stack.Screen name="skill-gap" />
          <Stack.Screen name="job-matcher" />
          <Stack.Screen name="roadmap" />
          <Stack.Screen name="projects" />
          <Stack.Screen name="interview-practice" />
          <Stack.Screen name="github-analyzer" />
          <Stack.Screen name="certificates" />
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