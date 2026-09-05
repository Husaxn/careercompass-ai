import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type StatePanelProps = {
  loading?: boolean;
  empty?: boolean;
  emptyText?: string;
};

/**
 * Shared loading / empty-state panel for data-driven screens so no screen
 * ever renders blank while fetching or when there is no data yet.
 */
export function StatePanel({ loading, empty, emptyText = 'Nothing here yet.' }: StatePanelProps) {
  return (
    <View style={styles.panel}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#3c87f7" />
          <ThemedText type="small" themeColor="textSecondary">
            Loading…
          </ThemedText>
        </>
      ) : empty ? (
        <ThemedText type="small" themeColor="textSecondary">
          {emptyText}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.six,
  },
});