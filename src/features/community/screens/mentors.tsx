import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useMentors } from '@/store';

type MentorsProps = {
  onOpen: (id: string) => void;
};

export default function Mentors({ onOpen }: MentorsProps) {
  const mentors = useMentors();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Mentors</ThemedText>
        <ThemedText themeColor="textSecondary">Learn from people who have walked the path.</ThemedText>

        {mentors.length === 0 ? (
          <ThemedText themeColor="textSecondary">No mentors available right now.</ThemedText>
        ) : (
          <View style={styles.list}>
            {mentors.map((mentor) => (
              <Pressable
                key={mentor.id}
                onPress={() => onOpen(mentor.id)}
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
                <ThemedView type="backgroundElement" style={styles.card}>
                  <ThemedText type="smallBold">{mentor.name}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">{mentor.role}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">{mentor.topics}</ThemedText>
                </ThemedView>
              </Pressable>
            ))}
          </View>
        )}
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
  item: {
    borderRadius: Spacing.three,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.8,
  },
});