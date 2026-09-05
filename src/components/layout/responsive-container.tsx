import { PropsWithChildren } from 'react';
import { Platform, StyleSheet, ViewStyle } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { Sidebar } from '@/components/layout/sidebar';
import { TabBar } from '@/components/layout/tab-bar';
import { ThemedView } from '@/components/themed-view';

type ResponsiveContainerProps = PropsWithChildren<{
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scroll?: boolean;
  padded?: boolean;
}>;

/**
 * Shared app-wide layout. Renders a persistent `Sidebar` on web and a
 * `TabBar` on mobile around the common `ScreenContainer`, so feature screens
 * get consistent navigation/layout without any per-screen layout code.
 */
export function ResponsiveContainer({
  children,
  style,
  contentContainerStyle,
  scroll,
  padded,
}: ResponsiveContainerProps) {
  const isWeb = Platform.OS === 'web';

  return (
    <ThemedView style={[styles.root, isWeb && styles.rootWeb, style]}>
      {isWeb && <Sidebar />}

      <ScreenContainer
        style={styles.content}
        contentContainerStyle={contentContainerStyle}
        scroll={scroll}
        padded={padded}>
        {children}
      </ScreenContainer>

      {!isWeb && <TabBar />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rootWeb: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});