import { SymbolView } from 'expo-symbols';
import { Link, usePathname } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

type NavItem = {
  href:
    | '/home'
    | '/recommendations'
    | '/roadmap'
    | '/community'
    | '/profile';
  label: string;
  icon: SymbolName;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/home', label: 'Home', icon: { ios: 'house.fill', android: 'home', web: 'home' } },
  { href: '/recommendations', label: 'Recommendations', icon: { ios: 'star.fill', android: 'star', web: 'star' } },
  { href: '/roadmap', label: 'Roadmap', icon: { ios: 'map.fill', android: 'map', web: 'map' } },
  { href: '/community', label: 'Community', icon: { ios: 'person.2.fill', android: 'group', web: 'group' } },
  { href: '/profile', label: 'Profile', icon: { ios: 'person.crop.circle.fill', android: 'person', web: 'person' } },
];

export const TAB_BAR_HEIGHT = 64;

/**
 * Persistent bottom navigation bar for mobile. Rendered only on native by
 * the tabs layout; web uses `Sidebar` instead. Includes safe-area bottom
 * padding, a fixed height, and an icon above each label with clear
 * active/inactive states.
 */
export function TabBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <ThemedView type="backgroundElement" style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={styles.inner}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={styles.link} asChild>
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
                <SymbolView
                  name={item.icon}
                  size={22}
                  weight={active ? 'bold' : 'regular'}
                  tintColor={active ? colors.brand : colors.textSecondary}
                />
                <ThemedText
                  type={active ? 'captionBold' : 'caption'}
                  themeColor={active ? 'brand' : 'textSecondary'}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                  style={styles.label}>
                  {item.label}
                </ThemedText>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#88888855',
  },
  inner: {
    height: TAB_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.two,
    gap: Spacing.one,
  },
  link: {
    flexShrink: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.half,
    paddingVertical: Spacing.one,
    minHeight: 48,
  },
  label: {
    maxWidth: '100%',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});