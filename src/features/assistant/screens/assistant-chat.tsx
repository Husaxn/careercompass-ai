import { usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  analyzeCv,
  sendMessage,
  type AssistantContext,
} from '@/services/assistant-service';
import {
  assistantStore,
  getRoadmapProgress,
  useAssistant,
  useAssessmentResults,
  useMilestones,
  type AssistantMessage,
} from '@/store';

type AIAssistantChatProps = {
  onClose: () => void;
};

const WELCOME =
  'Hi, I can help analyze your resume or answer questions about your career path — ask me anything or upload your CV.';

const SAMPLE_RESUME =
  'Experienced frontend engineer with 3 years of React and TypeScript experience. ' +
  'Built scalable web applications, led a small team, and shipped accessible, ' +
  'performant products used by thousands of users.';

export default function AIAssistantChat({ onClose }: AIAssistantChatProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { messages, open } = useAssistant();

  const milestones = useMilestones();
  const assessmentResults = useAssessmentResults();

  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const listRef = useRef<FlatList<AssistantMessage>>(null);
  const lastUser = useRef('');

  const latestResult = assessmentResults[0];
  const { total, completed, nextMilestone } = getRoadmapProgress(milestones);

  const buildContext = (): AssistantContext => ({
    screen: pathname,
    assessmentCompleted: assessmentResults.length > 0,
    topCareer: latestResult?.topCareers?.[0]?.title,
    roadmapTotal: total,
    roadmapCompleted: completed,
    nextMilestone: nextMilestone?.title,
  });

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: false }));
    }
  }, [open]);

  useEffect(() => {
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: false }));
  }, [messages.length, pending]);

  const submitText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    lastUser.current = trimmed;
    setDraft('');
    assistantStore.addMessage({ role: 'user', text: trimmed });
    setPending(true);
    try {
      const reply = await sendMessage(trimmed, buildContext());
      assistantStore.addMessage({ role: 'assistant', text: reply });
    } catch {
      assistantStore.addMessage({
        role: 'assistant',
        text: 'Something went wrong. Please try again.',
        error: true,
      });
    } finally {
      setPending(false);
    }
  };

  const retryLast = () => {
    if (lastUser.current) submitText(lastUser.current);
  };

  const handleCvFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      runCvAnalysis(file.name || 'resume', content);
    };
    reader.readAsText(file);
  };

  const runCvAnalysis = async (fileName: string, content: string) => {
    if (pending) return;
    assistantStore.addMessage({ role: 'user', text: 'Analyze my CV', attachment: fileName });
    const id = assistantStore.addMessage({ role: 'assistant', text: '', analyzing: true });
    setPending(true);
    try {
      const { summary } = await analyzeCv(fileName, content);
      assistantStore.updateMessage(id, { text: summary, analyzing: false });
    } catch {
      assistantStore.updateMessage(id, {
        text: 'Something went wrong analyzing your CV. Please try again.',
        analyzing: false,
        error: true,
      });
    } finally {
      setPending(false);
    }
  };

  const startSampleCv = () => runCvAnalysis('sample-resume.txt', SAMPLE_RESUME);

  const renderMessage = ({ item }: { item: AssistantMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.userRow : styles.aiRow]}>
        <ThemedView type={isUser ? 'backgroundSelected' : 'backgroundElement'} style={styles.bubble}>
          {item.attachment ? (
            <ThemedText type="smallBold" style={styles.attachmentLabel}>
              📎 {item.attachment}
            </ThemedText>
          ) : null}
          {item.analyzing ? (
            <View style={styles.analyzing}>
              <ActivityIndicator size="small" color="#3c87f7" />
              <ThemedText type="small" themeColor="textSecondary">
                Analyzing your CV…
              </ThemedText>
            </View>
          ) : (
            <ThemedText type="small" themeColor={item.error ? 'textSecondary' : 'text'}>
              {item.text}
            </ThemedText>
          )}
        </ThemedView>
      </View>
    );
  };

  const renderComposer = (
    <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, Spacing.two) }]}>
      {isWeb ? (
        <label style={styles.attach}>
          <ThemedText type="smallBold" themeColor="textSecondary">+</ThemedText>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
            disabled={pending}
            onChange={(event) => handleCvFile(event.currentTarget.files?.[0] as File)}
          />
        </label>
      ) : (
        <Pressable onPress={startSampleCv} disabled={pending} style={styles.attach}>
          <ThemedText type="smallBold" themeColor="textSecondary">+</ThemedText>
        </Pressable>
      )}

      <TextInput
        style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
        value={draft}
        onChangeText={setDraft}
        placeholder="Ask me anything…"
        placeholderTextColor={theme.textSecondary}
        editable={!pending}
        onSubmitEditing={() => submitText(draft)}
        returnKeyType="send"
        multiline
      />

      {pending ? (
        <View style={styles.sendLoading}>
          <ActivityIndicator size="small" color="#3c87f7" />
        </View>
      ) : (
        <Pressable
          onPress={() => submitText(draft)}
          disabled={draft.trim().length === 0}
          style={({ pressed }) => [styles.send, pressed && styles.pressed, draft.trim().length === 0 && { opacity: 0.4 }]}>
          <ThemedText type="smallBold" themeColor="textSecondary">Send</ThemedText>
        </Pressable>
      )}
    </View>
  );

  const renderHeader = (
    <View style={styles.header}>
      <ThemedText type="captionBold">AI Assistant</ThemedText>
      <View style={styles.headerActions}>
        {messages.length > 0 && (
          <Pressable onPress={() => assistantStore.reset()} hitSlop={8} style={styles.newChat}>
            <ThemedText type="smallBold" themeColor="textSecondary">New chat</ThemedText>
          </Pressable>
        )}
        <Pressable onPress={onClose} hitSlop={8} style={styles.close}>
          <ThemedText type="smallBold" themeColor="textSecondary">Close</ThemedText>
        </Pressable>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.root}>
      {renderHeader}

      {messages.length === 0 ? (
        <View style={styles.welcome}>
          <ThemedText type="body" themeColor="textSecondary" style={styles.welcomeText}>
            {WELCOME}
          </ThemedText>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContent}
          ListFooterComponent={
            messages.some((m) => m.error) ? (
              <Pressable onPress={retryLast} style={styles.retry}>
                <ThemedText type="linkPrimary">Retry</ThemedText>
              </Pressable>
            ) : null
          }
        />
      )}

      {renderComposer}
    </ThemedView>
  );
}

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#88888855',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  newChat: {
    paddingVertical: Spacing.one,
  },
  close: {
    paddingVertical: Spacing.one,
  },
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  welcomeText: {
    textAlign: 'center',
    maxWidth: 360,
  },
  messagesContent: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  messageRow: {
    width: '100%',
  },
  userRow: {
    alignItems: 'flex-end',
  },
  aiRow: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  attachmentLabel: {
    color: '#3c87f7',
  },
  analyzing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#88888855',
  },
  attach: {
    width: 40,
    height: 40,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3c87f7',
  },
  input: {
    flex: 1,
    maxHeight: 120,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 16,
  },
  send: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  sendLoading: {
    width: 48,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retry: {
    alignSelf: 'center',
    padding: Spacing.two,
  },
  pressed: {
    opacity: 0.8,
  },
});
