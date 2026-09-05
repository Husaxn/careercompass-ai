import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="landing" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="skills" />
      <Stack.Screen name="career-path" />
      <Stack.Screen name="roadmap" />
    </Stack>
  );
}