import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import {
  fetchCareerRecommendations,
  fetchCourseRecommendations,
  fetchJobRecommendations,
} from '@/services/recommendation-service';

type Section = {
  id: 'careers' | 'courses' | 'jobs' | 'saved';
  title: string;
  hint: string;
};

const sections: Section[] = [
  { id: 'careers', title: 'Careers', hint: 'Matches for your profile' },
  { id: 'courses', title: 'Courses', hint: 'Recommended to grow' },
  { id: 'jobs', title: 'Jobs', hint: 'Matched openings' },
  { id: 'saved', title: 'Saved', hint: 'Your bookmarks' },
];

type OverviewProps = {
  onOpen: (id: Section['id']) => void;
};

export default function Overview({ onOpen }: OverviewProps) {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Record<string, number>>({ careers: 0, courses: 0, jobs: 0 });

  useEffect(() => {
    let active = true;
    Promise.all([fetchCareerRecommendations(), fetchCourseRecommendations(), fetchJobRecommendations()])
      .then(([careers, courses, jobs]) => {
        if (!active) return;
        setCounts({ careers: careers.length, courses: courses.length, jobs: jobs.length });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="heading">Recommendations</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          Tailored to your skills, interests, and goals.
        </ThemedText>

        <View style={styles.grid}>
          {sections.map((item) => {
            const count = item.id === 'saved' ? null : counts[item.id];
            const hint = item.id === 'saved' ? item.hint : loading ? 'Loading…' : `${count} available`;
            return (
              <Pressable
                key={item.id}
                onPress={() => onOpen(item.id)}
                style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                <ThemedView type="backgroundElement" style={styles.cardInner}>
                  <ThemedText type="captionBold">{item.title}</ThemedText>
                  <ThemedText type="caption" themeColor="textSecondary">
                    {hint}
                  </ThemedText>
                </ThemedView>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  card: {
    flexBasis: '45%',
    flexGrow: 1,
    borderRadius: Spacing.three,
  },
  cardInner: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.8,
  },
});