import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

type BackBarProps = {
  title?: string;
  right?: React.ReactNode;
};

/**
 * Lightweight in-content back affordance for pushed detail screens, keeping
 * navigation reversible on both web and mobile without native headers.
 */
export function BackBar({ title, right }: BackBarProps) {
  const router = useRouter();
  const theme = useTheme();

  const handleBack = () => {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/home');
      }
    } catch {
      router.replace('/home');
    }
  };

  return (
    <View style={styles.root}>
      <Pressable
        onPress={handleBack}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <SymbolView
          name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' } as SymbolName}
          size={18}
          weight="bold"
          tintColor={theme.text}
        />
        <ThemedText type="small" themeColor="textSecondary">
          Back
        </ThemedText>
      </Pressable>
      {title ? <ThemedText type="captionBold" numberOfLines={1}>{title}</ThemedText> : null}
      {right ? <View style={styles.right}>{right}</View> : <View style={styles.right} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
  right: {
    minWidth: 64,
  },
});