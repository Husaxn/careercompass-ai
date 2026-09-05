import { Stack } from 'expo-router';

export default function AssessmentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="intro" />
      <Stack.Screen name="question" />
      <Stack.Screen name="result" />
    </Stack>
  );
}