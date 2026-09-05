import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { SavedKind, savedStore, useIsSaved } from '@/store';

type BookmarkButtonProps = {
  kind: SavedKind;
  refId: string;
  title: string;
};

/** Save/Bookmark toggle that persists to the shared `savedStore`. */
export function BookmarkButton({ kind, refId, title }: BookmarkButtonProps) {
  const theme = useTheme();
  const saved = useIsSaved(kind, refId);

  return (
    <Pressable
      onPress={() => savedStore.toggleSave({ kind, refId, title })}
      style={({ pressed }) => [
        styles.button,
        { borderColor: theme.backgroundSelected },
        saved && styles.saved,
        pressed && styles.pressed,
      ]}>
      <SymbolView
        name={{ ios: saved ? 'bookmark.fill' : 'bookmark', android: saved ? 'bookmark' : 'bookmark_border', web: saved ? 'bookmark' : 'bookmark_border' }}
        size={16}
        weight="bold"
        tintColor={saved ? '#3c87f7' : theme.textSecondary}
      />
      <ThemedText type="small" themeColor={saved ? 'text' : 'textSecondary'}>
        {saved ? 'Saved' : 'Save'}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  saved: {
    borderColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.7,
  },
});