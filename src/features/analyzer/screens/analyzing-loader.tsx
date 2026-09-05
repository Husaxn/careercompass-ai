import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { ResponsiveContainer } from '@/components/layout/responsive-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type AnalyzingLoaderProps = {
  error?: string | null;
  onRetry?: () => void;
  pending?: boolean;
};

export default function AnalyzingLoader({ error, onRetry, pending }: AnalyzingLoaderProps) {
  return (
    <ResponsiveContainer contentContainerStyle={styles.wrapper} scroll={false}>
      <View style={styles.content}>
        {error ? (
          <>
            <ThemedText type="subtitle">Analysis failed</ThemedText>
            <ThemedText themeColor="textSecondary">{error}</ThemedText>
            {onRetry ? (
              <Pressable
                onPress={onRetry}
                disabled={pending}
                style={({ pressed }) => [styles.retry, pressed && styles.pressed, pending && { opacity: 0.5 }]}>
                <ThemedText type="smallBold" themeColor="textSecondary">Try again</ThemedText>
              </Pressable>
            ) : null}
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#3c87f7" />
            <ThemedText type="subtitle">Analyzing your profile</ThemedText>
            <ThemedText themeColor="textSecondary">
              Mapping your skills, gaps, and career matches...
            </ThemedText>
          </>
        )}
      </View>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  retry: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.8,
  },
});