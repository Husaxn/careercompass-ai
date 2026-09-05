import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const faqs = [
  { id: 1, title: 'How do I get started?', body: 'Complete your onboarding and take the first assessment to build your roadmap.' },
  { id: 2, title: 'How are recommendations made?', body: 'We combine your interests, skills assessment, and career goals.' },
  { id: 3, title: 'Can I change my goals later?', body: 'Yes — update them anytime from your profile settings.' },
  { id: 4, title: 'How do I reset my progress?', body: 'Sign out from your profile and sign back in to start fresh.' },
];

export default function Help() {
  const contactSupport = () => {
    Linking.openURL('mailto:support@careercompass.app?subject=Career%20Compass%20support').catch(() => {});
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Help center</ThemedText>
        <ThemedText themeColor="textSecondary">Common questions and ways to reach support.</ThemedText>

        <View style={styles.list}>
          {faqs.map((faq) => (
            <ThemedView key={faq.id} type="backgroundElement" style={styles.card}>
              <ThemedText type="smallBold">{faq.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">{faq.body}</ThemedText>
            </ThemedView>
          ))}
        </View>

        <Pressable
          onPress={contactSupport}
          style={({ pressed }) => [styles.contact, pressed && styles.pressed]}>
          <ThemedText type="linkPrimary">Contact support</ThemedText>
        </Pressable>
        <ThemedText type="small" themeColor="textSecondary">
          Opens your email app to send a message to support@careercompass.app.
        </ThemedText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.three,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  contact: {
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});