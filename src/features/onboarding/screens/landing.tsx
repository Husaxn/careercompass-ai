import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authStore } from '@/store';

const slides = [
  {
    id: 'roadmap',
    title: 'A clear career roadmap',
    body: 'Turn a vague ambition into a step-by-step plan with milestones that fit your life.',
  },
  {
    id: 'skills',
    title: 'Know your skill gaps',
    body: 'AI-powered analysis shows exactly what to learn next to reach your target role.',
  },
  {
    id: 'matches',
    title: 'Matched to opportunities',
    body: 'Discover careers, courses, and jobs tailored to your interests and strengths.',
  },
];

/** First-launch welcome carousel. Standalone: navigates via expo-router. */
export default function Landing() {
  const theme = useTheme();
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const handleGetStarted = () => {
    authStore.finishLaunch();
    router.replace('/signup');
  };

  const handleSignIn = () => {
    authStore.finishLaunch();
    router.replace('/login');
  };

  return (
    <ScreenContainer contentContainerStyle={styles.wrapper} scroll={false}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <ThemedText
            type="title"
            themeColor="brand"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}>
            CareerCompass
          </ThemedText>
        </View>

        <ThemedView type="backgroundElement" style={styles.card}>
          <ThemedText type="subheading">{slides[index].title}</ThemedText>
          <ThemedText themeColor="textSecondary">{slides[index].body}</ThemedText>
        </ThemedView>

        <View style={styles.dots}>
          {slides.map((slide, i) => (
            <Pressable
              key={slide.id}
              onPress={() => setIndex(i)}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${i + 1}`}
              style={[
                styles.dot,
                { backgroundColor: theme.backgroundSelected },
                i === index && { backgroundColor: theme.brand },
              ]}
            />
          ))}
        </View>

        <Pressable
          onPress={handleGetStarted}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <ThemedText type="smallBold" themeColor="onBrand">
            Get Started
          </ThemedText>
        </Pressable>

        <Pressable onPress={handleSignIn} style={styles.link}>
          <ThemedText type="linkPrimary">Already have an account? Sign in</ThemedText>
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
  brand: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.two,
    minHeight: 160,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: Spacing.three,
    height: Spacing.one,
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
  link: {
    alignItems: 'center',
  },
});
