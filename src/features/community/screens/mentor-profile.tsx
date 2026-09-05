import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { communityStore, useMentorRequested, useMentors } from '@/store';

type MentorProfileProps = {
  id: string;
  onMessage: () => void;
};

export default function MentorProfile({ id, onMessage }: MentorProfileProps) {
  const mentors = useMentors();
  const mentor = mentors.find((m) => m.id === id) ?? null;
  const requested = useMentorRequested(id);

  if (!mentor) {
    return (
      <ScreenContainer>
        <StatePanel empty emptyText="Mentor not found." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedView type="backgroundElement" style={styles.headerCard}>
          <ThemedText type="subtitle">{mentor.name}</ThemedText>
          <ThemedText themeColor="textSecondary">{mentor.role}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {mentor.years} · {mentor.mentees} mentees mentored
          </ThemedText>
        </ThemedView>

        <View style={styles.section}>
          <ThemedText type="smallBold">About</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">{mentor.bio}</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold">Specialties</ThemedText>
          {mentor.specialties.map((item) => (
            <ThemedText key={item} type="small" themeColor="textSecondary">{item}</ThemedText>
          ))}
        </View>

        <Pressable
          onPress={() => communityStore.requestMentor(mentor.id)}
          disabled={requested}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, requested && styles.requested]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            {requested ? 'Booking requested' : 'Book a session'}
          </ThemedText>
        </Pressable>
        {requested && (
          <ThemedText type="small" themeColor="textSecondary">
            Your session request was sent (demo). {mentor.name.split(' ')[0]} will confirm a time shortly.
          </ThemedText>
        )}

        <Pressable onPress={onMessage} style={styles.secondary}>
          <ThemedText type="smallBold">Message {mentor.name.split(' ')[0]}</ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  headerCard: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  section: {
    gap: Spacing.one,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  requested: {
    opacity: 0.6,
  },
  secondary: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.8,
  },
});