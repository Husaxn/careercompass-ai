import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Spacing } from '@/constants/theme';
import { getRoadmapProgress, useMilestones, useUser } from '@/store';

const DANGER = '#e5484d';

type ProfileOverviewProps = {
  onOpen: (id: string) => void;
  onLogout?: () => void;
};

export default function ProfileOverview({ onOpen, onLogout }: ProfileOverviewProps) {
  const user = useUser();
  const milestones = useMilestones();
  const { completed, total, percent } = getRoadmapProgress(milestones);

  const [confirmVisible, setConfirmVisible] = useState(false);

  const menu = [
    { id: 'edit', label: 'Edit profile' },
    { id: 'resume', label: 'My resume' },
    { id: 'settings', label: 'Settings' },
    { id: 'account', label: 'Account' },
    { id: 'help', label: 'Help center' },
  ];

  const confirmLogout = () => {
    setConfirmVisible(false);
    onLogout?.();
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedView type="backgroundElement" style={styles.header}>
          <UserAvatar size={96} />
          <ThemedText type="heading">{user.name}</ThemedText>
          <ThemedText type="body" themeColor="textSecondary">
            {user.title} · {user.experience}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">{user.location}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Roadmap progress · {completed} of {total} ({percent}%)
          </ThemedText>
        </ThemedView>

        <View style={styles.menu}>
          {menu.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => onOpen(item.id)}
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
              <ThemedView type="backgroundElement" style={styles.itemInner}>
                <ThemedText type="captionBold">{item.label}</ThemedText>
              </ThemedView>
            </Pressable>
          ))}

          <Pressable
            onPress={() => setConfirmVisible(true)}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
            <ThemedView type="backgroundElement" style={styles.itemInner}>
              <ThemedText type="captionBold" style={styles.logoutText}>
                Log out
              </ThemedText>
            </ThemedView>
          </Pressable>
        </View>
      </View>

      <Modal
        transparent
        visible={confirmVisible}
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}>
        <View style={styles.backdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setConfirmVisible(false)} />
          <ThemedView type="backgroundElement" style={styles.dialog}>
            <ThemedText type="subheading">Log out?</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Are you sure you want to log out?
            </ThemedText>

            <View style={styles.dialogActions}>
              <Pressable
                onPress={() => setConfirmVisible(false)}
                style={({ pressed }) => [styles.dialogButton, pressed && styles.pressed]}>
                <ThemedText type="smallBold" themeColor="textSecondary">Cancel</ThemedText>
              </Pressable>
              <Pressable
                onPress={confirmLogout}
                style={({ pressed }) => [styles.dialogButton, styles.dangerButton, pressed && styles.pressed]}>
                <ThemedText type="smallBold" themeColor="textSecondary" style={styles.logoutText}>
                  Log out
                </ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  header: {
    alignItems: 'center',
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  menu: {
    gap: Spacing.two,
  },
  item: {
    borderRadius: Spacing.two,
  },
  itemInner: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
  },
  logoutText: {
    color: DANGER,
  },
  pressed: {
    opacity: 0.8,
  },
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
    backgroundColor: '#00000066',
  },
  dialog: {
    width: '100%',
    maxWidth: 360,
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  dialogActions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  dialogButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#3c87f7',
  },
  dangerButton: {
    backgroundColor: DANGER,
    borderColor: DANGER,
  },
});