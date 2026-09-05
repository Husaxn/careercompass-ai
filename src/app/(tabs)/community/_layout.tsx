import { Stack } from 'expo-router';

export default function CommunityLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="post/[id]" />
      <Stack.Screen name="mentors" />
      <Stack.Screen name="mentor/[id]" />
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
}