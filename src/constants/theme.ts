/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    brand: '#3c87f7',
    onBrand: '#ffffff',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    brand: '#4f9cff',
    onBrand: '#0b0b0d',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Global type scale. All screens should size text through these tokens (via
 * `ThemedText` types) rather than raw font sizes, so body text stays readable
 * (>= 14px) on both web and mobile.
 */
export const TypeScale = {
  /** Page/feature headings. */
  heading: { fontSize: 32, lineHeight: 40, fontWeight: '700' },
  /** Section headings. */
  subheading: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  /** Primary body text. */
  body: { fontSize: 16, lineHeight: 24, fontWeight: '500' },
  /** Labels, captions, metadata. */
  caption: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  /** Emphasized labels. */
  captionBold: { fontSize: 14, lineHeight: 20, fontWeight: '700' },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
