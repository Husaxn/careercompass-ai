import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_BAR_HEIGHT } from '@/components/layout/tab-bar';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AIAssistantChat } from '@/features/assistant/screens';
import { assistantStore, useAssistant } from '@/store';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

const isWeb = Platform.OS === 'web';

/**
 * Global floating AI Assistant launcher. Rendered once from the root layout so
 * it appears on every screen. On tap it opens a right-docked panel on web and a
 * full-screen sheet on mobile, both wrapping the shared chat interface.
 */
export function AIAssistantButton() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { open } = useAssistant();

  const close = () => assistantStore.closePanel();
  const openPanel = () => assistantStore.openPanel();

  const bottom = isWeb ? Spacing.four : insets.bottom + TAB_BAR_HEIGHT + Spacing.three;

  return (
    <>
      <Pressable
        onPress={openPanel}
        accessibilityLabel="Open AI assistant"
        style={({ pressed }) => [
          styles.fab,
          { bottom, backgroundColor: theme.brand, shadowColor: theme.text },
          pressed && styles.fabPressed,
        ]}>
        <SymbolView
          name={{ ios: 'bubble.left.and.bubble.right.fill', android: 'chat', web: 'chat' } as SymbolName}
          size={24}
          weight="bold"
          tintColor={theme.onBrand}
        />
      </Pressable>

      <Modal
        transparent
        visible={open}
        animationType={isWeb ? 'fade' : 'slide'}
        onRequestClose={close}
        statusBarTranslucent>
        <View style={styles.overlay}>
          {!isWeb && <Pressable style={StyleSheet.absoluteFill} onPress={close} />}
          <ThemedView style={[styles.panel, isWeb ? styles.panelWeb : styles.panelMobile]}>
            <AIAssistantChat onClose={close} />
          </ThemedView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: Spacing.four,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
    zIndex: 50,
  },
  fabPressed: {
    opacity: 0.85,
  },
  overlay: {
    flex: 1,
  },
  panel: {
    flex: 1,
  },
  panelMobile: {
    flex: 1,
  },
  panelWeb: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 420,
    maxWidth: MaxContentWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#88888855',
  },
});
