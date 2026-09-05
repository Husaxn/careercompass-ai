import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { fetchJobById, type JobMatch } from '@/services/recommendation-service';

type JobDetailProps = {
  id: string;
  onApply?: () => void;
};

export default function JobDetail({ id, onApply }: JobDetailProps) {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<JobMatch | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    let active = true;
    fetchJobById(id)
      .then((data) => {
        if (active) setJob(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading || !job) {
    return (
      <ScreenContainer>
        <StatePanel loading={loading} empty={!job} emptyText="Job not found." />
      </ScreenContainer>
    );
  }

  const handleApply = () => {
    setApplied(true);
    onApply?.();
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">{job.title}</ThemedText>
        <ThemedText themeColor="textSecondary">
          {job.company} · {job.location} · {job.salary}
        </ThemedText>

        <BookmarkButton kind="job" refId={job.id} title={job.title} />

        <ThemedText type="default">{job.description}</ThemedText>

        <View style={styles.section}>
          <ThemedText type="smallBold">Requirements</ThemedText>
          {job.requirements.map((req) => (
            <ThemedText key={req} type="small" themeColor="textSecondary">
              {req}
            </ThemedText>
          ))}
        </View>

        {applied ? (
          <ThemedView type="backgroundElement" style={styles.appliedCard}>
            <ThemedText type="smallBold">Application submitted (demo)</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              The hiring team will review your profile. This is a demo confirmation — no real application was sent.
            </ThemedText>
          </ThemedView>
        ) : (
          <Pressable onPress={handleApply} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              Apply
            </ThemedText>
          </Pressable>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.one,
  },
  appliedCard: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.one,
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