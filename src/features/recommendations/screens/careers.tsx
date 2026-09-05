import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { fetchCareerRecommendations, type CareerMatch } from '@/services/recommendation-service';

type CareersProps = {
  onOpen: (id: string) => void;
};

export default function Careers({ onOpen }: CareersProps) {
  const [loading, setLoading] = useState(true);
  const [careers, setCareers] = useState<CareerMatch[]>([]);

  useEffect(() => {
    let active = true;
    fetchCareerRecommendations()
      .then((data) => {
        if (active) setCareers(data);
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
        <ThemedText type="subtitle">Careers</ThemedText>
        <ThemedText themeColor="textSecondary">Career paths matched to your profile.</ThemedText>

        {loading || careers.length === 0 ? (
          <StatePanel loading={loading} empty={careers.length === 0} emptyText="No career matches yet." />
        ) : (
          <View style={styles.list}>
            {careers.map((career) => (
              <Pressable
                key={career.id}
                onPress={() => onOpen(career.id)}
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
                <ThemedView type="backgroundElement" style={styles.itemInner}>
                  <View style={styles.header}>
                    <ThemedText type="smallBold">{career.title}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">{career.score}% match</ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textSecondary">
                    {career.salary} · {career.outlook}
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
  itemInner: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});