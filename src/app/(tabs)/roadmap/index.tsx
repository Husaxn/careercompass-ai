import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { RoadmapOverview } from '@/features/roadmap/screens';

export default function RoadmapScreen() {
  const router = useRouter();

  return (
    <>
      <RoadmapOverview
        onOpen={(id) => router.push(`/roadmap/milestone/${id}`)}
      />

      <View style={styles.links}>
        <Pressable onPress={() => router.push('/roadmap/achievements')} style={styles.link}>
          <ThemedView type="backgroundElement" style={styles.linkInner}>
            <ThemedText type="captionBold">Achievements</ThemedText>
          </ThemedView>
        </Pressable>
        <Pressable onPress={() => router.push('/roadmap/skills')} style={styles.link}>
          <ThemedView type="backgroundElement" style={styles.linkInner}>
            <ThemedText type="captionBold">Skill tracker</ThemedText>
          </ThemedView>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  link: {
    flexBasis: '45%',
    flexGrow: 1,
    borderRadius: Spacing.three,
  },
  linkInner: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
  },
});