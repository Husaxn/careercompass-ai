import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatePanel } from '@/components/ui/state-panel';
import { Spacing } from '@/constants/theme';
import { usePosts } from '@/store';

type FeedProps = {
  onOpenPost: (id: string) => void;
  onCreatePost: () => void;
  onOpenMentors: () => void;
};

export default function Feed({ onOpenPost, onCreatePost, onOpenMentors }: FeedProps) {
  const posts = usePosts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="heading">Community</ThemedText>
          <Pressable onPress={onCreatePost} style={styles.compose}>
            <ThemedText type="captionBold" themeColor="textSecondary">+ Post</ThemedText>
          </Pressable>
        </View>

        <Pressable onPress={onOpenMentors} style={styles.mentorsLink}>
          <ThemedView type="backgroundElement" style={styles.mentorsInner}>
            <ThemedText type="captionBold">Mentors</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">Book sessions or message mentors →</ThemedText>
          </ThemedView>
        </Pressable>

        {loading ? (
          <StatePanel loading />
        ) : posts.length === 0 ? (
          <StatePanel empty emptyText="No posts yet. Be the first to start a discussion!" />
        ) : (
          <View style={styles.list}>
            {posts.map((post) => (
              <Pressable
                key={post.id}
                onPress={() => onOpenPost(post.id)}
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
                <ThemedView type="backgroundElement" style={styles.card}>
                  <ThemedText type="caption" themeColor="textSecondary">
                    {post.author} · {post.category} · {post.timeAgo}
                  </ThemedText>
                  <ThemedText type="captionBold">{post.title}</ThemedText>
                  {post.comments.length > 0 && (
                    <ThemedText type="caption" themeColor="textSecondary">
                      {post.comments.length} comment{post.comments.length === 1 ? '' : 's'}
                    </ThemedText>
                  )}
                  {post.imageUri && (
                    <Image
                      source={{ uri: post.imageUri }}
                      style={styles.postImage}
                      contentFit="cover"
                    />
                  )}
                </ThemedView>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compose: {
    borderWidth: 1,
    borderColor: '#3c87f7',
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  mentorsLink: {
    borderRadius: Spacing.three,
  },
  mentorsInner: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  list: {
    gap: Spacing.three,
  },
  item: {
    borderRadius: Spacing.three,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.8,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: Spacing.two,
    marginVertical: Spacing.two,
  },
});