import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenContainerProps = PropsWithChildren<{
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scroll?: boolean;
  padded?: boolean;
}>;

export function ScreenContainer({
  children,
  style,
  contentContainerStyle,
  scroll = true,
  padded = true,
}: ScreenContainerProps) {
  const inner = (
    <View style={[styles.inner, padded && styles.padded, contentContainerStyle]}>{children}</View>
  );

  if (!scroll) {
    return (
      <ThemedView style={[styles.root, styles.center, style]}>{inner}</ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.root, style]}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {inner}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flex: 1,
  },
  padded: {
    padding: Spacing.four,
  },
});
