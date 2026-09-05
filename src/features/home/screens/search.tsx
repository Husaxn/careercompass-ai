import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const suggestions = ['Frontend developer', 'Data analyst', 'UX designer'];

export default function Search() {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Search</ThemedText>

        <TextInput
          style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          placeholder="Search careers, courses, mentors..."
          placeholderTextColor={theme.textSecondary}
        />

        <View style={styles.suggestions}>
          {suggestions.map((item) => (
            <Pressable key={item} onPress={() => setQuery(item)} style={styles.suggestion}>
              <ThemedText type="small" themeColor="textSecondary">
                {item}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <ThemedView type="backgroundElement" style={styles.empty}>
          <ThemedText type="small" themeColor="textSecondary">
            {query
              ? `Showing results for "${query}"`
              : 'Start typing to find careers, courses and mentors.'}
          </ThemedText>
        </ThemedView>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    fontSize: 16,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  suggestion: {
    borderWidth: 1,
    borderColor: '#3c87f7',
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  empty: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
  },
});