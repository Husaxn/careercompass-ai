import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const seedNotifications = [
  { id: 1, title: 'New match', body: 'A Senior Frontend role matches your profile.', time: '2h' },
  { id: 2, title: 'Milestone unlocked', body: 'You completed the Python fundamentals milestone.', time: '1d' },
  { id: 3, title: 'New mentor request', body: 'Priya accepted your mentorship request.', time: '2d' },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(seedNotifications);
  const [allRead, setAllRead] = useState(false);

  const markAllRead = () => {
    if (allRead) return;
    setAllRead(true);
    setNotifications([]);
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Notifications</ThemedText>

        {allRead && (
          <ThemedText type="small" themeColor="textSecondary">
            All notifications marked as read.
          </ThemedText>
        )}

        <View style={styles.list}>
          {notifications.map((item) => (
            <ThemedView key={item.id} type="backgroundElement" style={styles.item}>
              <ThemedText type="smallBold">
                {item.title} <ThemedText type="small" themeColor="textSecondary">{item.time}</ThemedText>
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {item.body}
              </ThemedText>
            </ThemedView>
          ))}
        </View>

        <Pressable
          onPress={markAllRead}
          disabled={allRead}
          style={({ pressed }) => [styles.clear, pressed && styles.pressed, allRead && { opacity: 0.5 }]}>
          <ThemedText type="linkPrimary">{allRead ? 'All read' : 'Mark all as read'}</ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  list: {
    gap: Spacing.three,
  },
  item: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  clear: {
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});