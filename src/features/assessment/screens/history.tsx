import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const history = [
  { id: 1, title: 'Interest assessment', date: 'Aug 10, 2026', note: 'Completed' },
  { id: 2, title: 'Skills assessment', date: 'Jul 22, 2026', note: 'Completed' },
];

export default function History() {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Assessment history</ThemedText>

        <View style={styles.list}>
          {history.map((item) => (
            <Pressable key={item.id} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
              <ThemedView type="backgroundElement" style={styles.card}>
                <ThemedText type="smallBold">{item.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {item.date} · {item.note}
                </ThemedText>
              </ThemedView>
            </Pressable>
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