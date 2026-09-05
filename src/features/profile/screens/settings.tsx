import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { settingsStore, useSettings } from '@/store';

export default function Settings() {
  const settings = useSettings();

  const options = [
    {
      id: 'notifications',
      label: 'Push notifications',
      value: settings.notifications,
      onToggle: () => settingsStore.setNotifications(!settings.notifications),
    },
    {
      id: 'darkMode',
      label: 'Dark mode',
      value: settings.theme === 'dark',
      onToggle: () => settingsStore.setTheme(settings.theme === 'dark' ? 'light' : 'dark'),
    },
  ];

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Settings</ThemedText>
        <ThemedText themeColor="textSecondary">
          Dark mode changes the app theme instantly; notification preference is saved.
        </ThemedText>

        <View style={styles.list}>
          {options.map((option) => (
            <Pressable key={option.id} onPress={option.onToggle} style={styles.row}>
              <ThemedView type="backgroundElement" style={styles.rowInner}>
                <ThemedText type="small">{option.label}</ThemedText>
                <View style={[styles.switch, option.value && styles.switchOn]}>
                  <View style={[styles.knob, option.value && styles.knobOn]} />
                </View>
              </ThemedView>
            </Pressable>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.two,
  },
  row: {
    borderRadius: Spacing.two,
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.two,
    padding: Spacing.three,
  },
  switch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E1E6',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  switchOn: {
    backgroundColor: '#3c87f7',
  },
  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  knobOn: {
    alignSelf: 'flex-end',
  },
});