import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { fetchCareerById, type CareerMatch } from '@/services/recommendation-service';

type CareerDetailProps = {
  id: string;
};

export default function CareerDetail({ id }: CareerDetailProps) {
  const [loading, setLoading] = useState(true);
  const [career, setCareer] = useState<CareerMatch | null>(null);

  useEffect(() => {
    let active = true;
    fetchCareerById(id)
      .then((data) => {
        if (active) setCareer(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading || !career) {
    return (
      <ScreenContainer>
        <StatePanel loading={loading} empty={!career} emptyText="Career not found." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">{career.title}</ThemedText>
        <ThemedText themeColor="textSecondary">
          {career.score}% match · {career.salary} · {career.outlook}
        </ThemedText>

        <BookmarkButton kind="career" refId={career.id} title={career.title} />

        <ThemedView type="backgroundElement" style={styles.summary}>
          <ThemedText type="smallBold">About this path</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">{career.summary}</ThemedText>
        </ThemedView>

        <View style={styles.section}>
          <ThemedText type="smallBold">Key skills</ThemedText>
          {career.skills.map((skill) => (
            <ThemedText key={skill} type="small" themeColor="textSecondary">
              {skill}
            </ThemedText>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  summary: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  section: {
    gap: Spacing.one,
  },
});