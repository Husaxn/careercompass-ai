import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { communityStore, useChat, useMentors } from '@/store';

type ChatProps = {
  mentorId: string;
};

export default function Chat({ mentorId }: ChatProps) {
  const theme = useTheme();
  const mentors = useMentors();
  const mentor = mentors.find((m) => m.id === mentorId);
  const messages = useChat(mentorId);
  const [draft, setDraft] = useState('');

  const send = () => {
    if (!draft.trim()) return;
    communityStore.sendMessage(mentorId, draft.trim());
    setDraft('');
  };

  return (
    <ScreenContainer scroll={false}>
      <View style={styles.content}>
        <ThemedText type="subtitle">{mentor?.name ?? 'Mentor'}</ThemedText>

        <ScrollView style={styles.thread} contentContainerStyle={styles.threadContent}>
          {messages.length === 0 ? (
            <ThemedText type="small" themeColor="textSecondary">Say hello to start the conversation.</ThemedText>
          ) : (
            messages.map((message) => (
              <ThemedView
                key={message.id}
                type={message.mine ? 'backgroundSelected' : 'backgroundElement'}
                style={[styles.bubble, message.mine && styles.mine]}>
                <ThemedText type="small">{message.text}</ThemedText>
              </ThemedView>
            ))
          )}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={draft}
            onChangeText={setDraft}
            placeholder="Type a message..."
            placeholderTextColor={theme.textSecondary}
            onSubmitEditing={send}
          />
          <ThemedView type="backgroundElement" style={styles.send} onTouchEnd={send}>
            <ThemedText type="smallBold" themeColor="textSecondary">Send</ThemedText>
          </ThemedView>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: Spacing.three,
  },
  thread: {
    flex: 1,
  },
  threadContent: {
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  bubble: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  mine: {
    alignSelf: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    fontSize: 16,
  },
  send: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
  },
});