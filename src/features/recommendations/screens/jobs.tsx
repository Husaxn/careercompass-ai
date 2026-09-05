import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { fetchJobRecommendations, type JobMatch } from '@/services/recommendation-service';

type JobsProps = {
  onOpen: (id: string) => void;
};

export default function Jobs({ onOpen }: JobsProps) {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JobMatch[]>([]);

  useEffect(() => {
    let active = true;
    fetchJobRecommendations()
      .then((data) => {
        if (active) setJobs(data);
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
        <ThemedText type="subtitle">Matched jobs</ThemedText>
        <ThemedText themeColor="textSecondary">Openings matched to your profile.</ThemedText>

        {loading || jobs.length === 0 ? (
          <StatePanel loading={loading} empty={jobs.length === 0} emptyText="No matched jobs yet." />
        ) : (
          <View style={styles.list}>
            {jobs.map((job) => (
              <Pressable
                key={job.id}
                onPress={() => onOpen(job.id)}
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
                <ThemedView type="backgroundElement" style={styles.card}>
                  <ThemedText type="smallBold">{job.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {job.company} · {job.location} · {job.salary}
                  </ThemedText>
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