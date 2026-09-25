import { DefaultTheme, DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AIAssistantButton } from '@/components/layout/assistant-button';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { authStore, useHydration } from '@/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hydrated = useHydration();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize Supabase auth listener
    authStore.init();
  }, []);

  useEffect(() => {
    if (hydrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [hydrated]);

  const onLayoutRootView = useCallback(() => {
    if (hydrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [hydrated]);

  if (!hydrated) {
    return (
      <SafeAreaProvider>
        <View style={styles.root} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.root}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="analyzer" />
            <Stack.Screen name="assessment" />
          </Stack>
          <AIAssistantButton />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});