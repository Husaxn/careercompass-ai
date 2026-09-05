import { Stack } from 'expo-router';

import { AnalyzerProvider } from '@/features/analyzer';

export default function AnalyzerLayout() {
  return (
    <AnalyzerProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="source-upload" />
        <Stack.Screen name="analyzing" />
        <Stack.Screen name="result" />
        <Stack.Screen name="history" />
      </Stack>
    </AnalyzerProvider>
  );
}