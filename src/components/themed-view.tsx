import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const scheme = useColorScheme();
  const theme = useTheme();
  const themeMode = scheme === 'unspecified' ? 'light' : scheme;
  const defaultColor = theme[type ?? 'background'];
  const backgroundColor = themeMode === 'dark' ? darkColor ?? defaultColor : lightColor ?? defaultColor;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
