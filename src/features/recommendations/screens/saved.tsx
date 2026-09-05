import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { savedStore, useSavedItems } from '@/store';

export default function Saved() {
  const saved = useSavedItems();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Saved</ThemedText>
        <ThemedText themeColor="textSecondary">Your bookmarked careers, courses, and jobs.</ThemedText>

        {saved.length === 0 ? (
          <StatePanel empty emptyText="You haven't saved anything yet. Tap Save on any recommendation." />
        ) : (
          <View style={styles.list}>
            {saved.map((item) => (
              <ThemedView key={item.key} type="backgroundElement" style={styles.card}>
                <View style={styles.info}>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.kind[0].toUpperCase() + item.kind.slice(1)}
                  </ThemedText>
                  <ThemedText type="smallBold">{item.title}</ThemedText>
                </View>
                <Pressable onPress={() => savedStore.remove(item.key)} style={styles.remove}>
                  <ThemedText type="linkPrimary">Remove</ThemedText>
                </Pressable>
              </ThemedView>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  info: {
    flex: 1,
    gap: Spacing.one,
  },
  remove: {
    paddingVertical: Spacing.one,
  },
});