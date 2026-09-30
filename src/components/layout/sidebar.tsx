import { Link, usePathname } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { StyleSheet, View, ScrollView, Platform, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

type NavItem = {
  href: string;
  label: string;
  icon: SymbolName;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/home', label: 'Dashboard', icon: 'square.grid.2x2' as SymbolName },
  { href: '/profile', label: 'Profile', icon: 'person' as SymbolName },
  { href: '/resume-analyzer', label: 'Resume Analyzer', icon: 'doc.text.magnifyingglass' as SymbolName },
  { href: '/skill-assessment', label: 'Skill Assessment', icon: 'list.clipboard' as SymbolName },
  { href: '/skill-gap', label: 'Skill Gap', icon: 'chart.bar' as SymbolName },
  { href: '/job-matcher', label: 'Job Matcher', icon: 'briefcase' as SymbolName },
  { href: '/roadmap', label: 'Roadmap', icon: 'map' as SymbolName },
  { href: '/projects', label: 'Projects', icon: 'folder' as SymbolName },
  { href: '/interview-practice', label: 'Interview Practice', icon: 'mic' as SymbolName },
  { href: '/github-analyzer', label: 'GitHub Analyzer', icon: 'chevron.left.forwardslash.chevron.right' as SymbolName },
  { href: '/certificates', label: 'Certificates', icon: 'rosette' as SymbolName },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebarHeader}>
        <View style={styles.logoCircle}>
          <ThemedText style={styles.logoText}>S</ThemedText>
        </View>
        <View>
          <ThemedText style={styles.brandName}>CareerCompass</ThemedText>
          <ThemedText style={styles.brandTagline}>Your Career Copilot</ThemedText>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sidebarNav}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href as any} asChild>
              <TouchableOpacity style={StyleSheet.flatten([styles.navItem, active && styles.navItemActive])}>
                <SymbolView 
                  name={item.icon} 
                  size={20} 
                  tintColor={active ? '#fff' : '#888'} 
                />
                <ThemedText style={StyleSheet.flatten([styles.navText, active && styles.navTextActive])}>
                  {item.label}
                </ThemedText>
              </TouchableOpacity>
            </Link>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 270,
    backgroundColor: '#0d0d16',
    borderRightWidth: 1,
    borderRightColor: '#1F202E',
    display: Platform.OS === 'web' ? 'flex' : 'none',
    height: '100%',
  },
  sidebarHeader: {
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#1F202E',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  brandTagline: {
    color: '#888',
    fontSize: 12,
  },
  sidebarNav: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: 12,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#7C3AED20',
  },
  navText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#7C3AED',
    fontWeight: '600',
  },
});