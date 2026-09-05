import { useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { communityStore, usePosts } from '@/store';

type PostDetailProps = {
  id: string;
};

export default function PostDetail({ id }: PostDetailProps) {
  const theme = useTheme();
  const posts = usePosts();
  const post = posts.find((p) => p.id === id) ?? null;
  const [reply, setReply] = useState('');

  if (!post) {
    return (
      <ScreenContainer>
        <StatePanel empty emptyText="Post not found." />
      </ScreenContainer>
    );
  }

  const submitComment = () => {
    if (!reply.trim()) return;
    communityStore.addComment(post.id, 'Alex Johnson', reply.trim());
    setReply('');
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="small" themeColor="textSecondary">
          {post.author} · {post.category} · {post.timeAgo}
        </ThemedText>
        <ThemedText type="subtitle">{post.title}</ThemedText>
        {post.imageUri && (
          <Image
            source={{ uri: post.imageUri }}
            style={styles.postImage}
            contentFit="cover"
          />
        )}
        <ThemedText type="default">{post.body}</ThemedText>

        <View style={styles.section}>
          <ThemedText type="smallBold">Comments</ThemedText>
          {post.comments.length === 0 ? (
            <ThemedText type="small" themeColor="textSecondary">No comments yet. Start the discussion.</ThemedText>
          ) : (
            post.comments.map((comment) => (
              <ThemedView key={comment.id} type="backgroundElement" style={styles.comment}>
                <ThemedText type="smallBold">{comment.author}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">{comment.text}</ThemedText>
              </ThemedView>
            ))
          )}
        </View>

        <TextInput
          style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
          value={reply}
          onChangeText={setReply}
          placeholder="Add a comment..."
          placeholderTextColor={theme.textSecondary}
          multiline
        />
        <Pressable
          onPress={submitComment}
          disabled={!reply.trim()}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, !reply.trim() && { opacity: 0.5 }]}>
          <ThemedText type="smallBold" themeColor="textSecondary">Post comment</ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  comment: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    fontSize: 16,
    minHeight: 80,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: Spacing.two,
    marginVertical: Spacing.two,
  },
});