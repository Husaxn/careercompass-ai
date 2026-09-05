import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SplashProps = {
  /** Optional tagline shown under the brand. */
  tagline?: string;
};

/** Full-screen brand splash shown at launch while routing is decided. */
export default function Splash({ tagline = 'Your career, mapped.' }: SplashProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.root}>
      <View style={styles.brand}>
        <ThemedText type="title" themeColor="brand">
          CareerCompass
        </ThemedText>
        <ThemedText themeColor="textSecondary">{tagline}</ThemedText>
      </View>

      <View style={[styles.spinner, { borderColor: theme.backgroundSelected }]}>
        <View style={[styles.spinnerFill, { backgroundColor: theme.brand }]} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.six,
    padding: Spacing.four,
  },
  brand: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  spinner: {
    width: Spacing.five,
    height: Spacing.five,
    borderRadius: Spacing.three,
    overflow: 'hidden',
    transform: [{ rotate: '45deg' }],
  },
  spinnerFill: {
    flex: 1,
  },
});
