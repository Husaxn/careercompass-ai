import { Link, usePathname } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
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

/**
 * Persistent web navigation rail. Rendered only on web by the tabs layout;
 * mobile uses `TabBar` instead.
 */
export function Sidebar() {
  const pathname = usePathname();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <ThemedView type="backgroundElement" style={styles.root}>
      <ThemedText type="captionBold" style={styles.brand}>
        CareerCompass
      </ThemedText>

      <View style={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={styles.link} asChild>
              <Pressable
                accessibilityRole="link"
                style={({ pressed }) => [
                  StyleSheet.flatten([
                    styles.linkInner,
                    active && { backgroundColor: colors.backgroundSelected },
                  ]),
                  pressed && styles.pressed,
                ]}>
                <View style={styles.itemContent}>
                  <SymbolView
                    name={item.icon}
                    size={18}
                    weight={active ? 'bold' : 'regular'}
                    tintColor={active ? colors.brand : colors.textSecondary}
                  />
                  <ThemedText
                    type={active ? 'captionBold' : 'caption'}
                    themeColor={active ? 'brand' : 'textSecondary'}>
                    {item.label}
                  </ThemedText>
                </View>
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
    width: 240,
    maxWidth: '100%',
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    gap: Spacing.four,
  },
  brand: {
    marginHorizontal: Spacing.two,
    marginBottom: Spacing.two,
  },
  nav: {
    gap: Spacing.one,
  },
  link: {},
  linkInner: {
    width: '100%',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});