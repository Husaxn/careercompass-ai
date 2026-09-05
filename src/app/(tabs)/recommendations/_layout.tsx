import { Stack } from 'expo-router';

export default function RecommendationsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="careers" />
      <Stack.Screen name="career/[id]" />
      <Stack.Screen name="courses" />
      <Stack.Screen name="course/[id]" />
      <Stack.Screen name="jobs" />
      <Stack.Screen name="job/[id]" />
      <Stack.Screen name="saved" />
    </Stack>
  );
}