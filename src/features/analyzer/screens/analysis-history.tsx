import { Pressable, StyleSheet, View } from 'react-native';

import { ResponsiveContainer } from '@/components/layout/responsive-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { useAnalysisHistory } from '@/store';

export default function AnalysisHistory() {
  const history = useAnalysisHistory();

  return (
    <ResponsiveContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Analysis history</ThemedText>

        {history.length === 0 ? (
          <StatePanel empty emptyText="No analyses yet. Upload a resume to get started." />
        ) : (
          <View style={styles.list}>
            {history.map((item) => (
              <Pressable key={item.id} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
                <ThemedView type="backgroundElement" style={styles.itemInner}>
                  <ThemedText type="smallBold">{item.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.date} · {item.score}% match
                  </ThemedText>
                </ThemedView>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ResponsiveContainer>
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
  pressed: {
    opacity: 0.8,
  },
});