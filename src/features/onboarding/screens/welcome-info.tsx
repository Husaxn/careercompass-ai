import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const highlights = [
  'Personalized career roadmap',
  'Skills gap analysis',
  'AI-powered job matches',
  'Community of mentors',
];

export default function WelcomeInfo() {
  const theme = useTheme();
  const router = useRouter();

  const getStarted = () => {
    router.push('/personal-info');
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper}>
      <View style={styles.content}>
        <ThemedText type="title">Welcome</ThemedText>
        <ThemedText themeColor="textSecondary">
          Career Compass helps you discover the right path, build the right skills, and reach the
          right opportunities.
        </ThemedText>

        <View style={styles.highlights}>
          {highlights.map((item) => (
            <View key={item} style={styles.highlightRow}>
              <View style={[styles.bullet, { backgroundColor: theme.text }]} />
              <ThemedText type="small">{item}</ThemedText>
            </View>
          ))}
        </View>

        <Pressable onPress={getStarted} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Get started
          </ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  content: {
    gap: Spacing.four,
  },
  highlights: {
    gap: Spacing.three,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  bullet: {
    width: Spacing.two,
    height: Spacing.two,
    borderRadius: Spacing.one,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.8,
  },
});