import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, TextInput, View, Modal } from 'react-native';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useUser, communityStore } from '@/store';
import { useImagePicker } from '@/hooks/use-image-picker';

type CreatePostProps = {
  onSubmit?: () => void;
};

export default function CreatePost({ onSubmit }: CreatePostProps) {
  const theme = useTheme();
  const user = useUser();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { previewUri, handleTakePhoto, handleChooseFromGallery, handleRemoveImage, hasSelectedImage } = useImagePicker();

  const canPublish = title.trim().length > 0 || body.trim().length > 0 || hasSelectedImage;

  const publish = () => {
    if (!canPublish) return;
    communityStore.addPost({
      author: user.name,
      title: title.trim(),
      body: body.trim(),
      category: 'General',
      imageUri: previewUri,
    });
    onSubmit?.();
  };

  const removeImage = () => {
    handleRemoveImage();
  };

  const showActionSheet = () => {
    setImageVisible(true);
  };

  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    if (previewUri) {
      setImageVisible(false);
    }
  }, [previewUri]);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <ThemedText type="subtitle">Create post</ThemedText>

        <View style={styles.field}>
          <ThemedText type="smallBold">Title</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Give your post a title"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.field}>
          <ThemedText type="smallBold">Body</ThemedText>
          <TextInput
            style={[styles.input, styles.body, { borderColor: theme.backgroundElement, color: theme.text }]}
            value={body}
            onChangeText={setBody}
            placeholder="Share your experience, ask a question..."
            placeholderTextColor={theme.textSecondary}
            multiline
          />
        </View>

        <Modal
          visible={imageVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setImageVisible(false)}>
          <View style={styles.actionSheetOverlay} />
          <View style={styles.actionSheetContainer}>
            <ThemedText type="captionBold" themeColor="textSecondary" style={styles.actionSheetTitle}>
              Add photo
            </ThemedText>
            <Pressable style={styles.actionSheetOption} onPress={handleTakePhoto}>
              <ThemedText type="smallBold">Take Photo</ThemedText>
            </Pressable>
            <Pressable style={styles.actionSheetOption} onPress={handleChooseFromGallery}>
              <ThemedText type="smallBold">Choose from Gallery</ThemedText>
            </Pressable>
            <Pressable style={styles.actionSheetOption} onPress={() => setImageVisible(false)}>
              <ThemedText type="smallBold" themeColor="textSecondary">Cancel</ThemedText>
            </Pressable>
          </View>
        </Modal>

        <View style={styles.imagePreviewContainer}>
          {previewUri && (
            <Image
              source={{ uri: previewUri }}
              style={styles.imagePreview}
              contentFit="cover"
            />
          )}
          {previewUri && (
            <Pressable onPress={removeImage} style={styles.removeButton}>
              <ThemedText type="small" themeColor="textSecondary">x</ThemedText>
            </Pressable>
          )}
          {!previewUri && (
            <Pressable style={styles.cameraButton} onPress={showActionSheet}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                Add photo
              </ThemedText>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={publish}
          disabled={!canPublish}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, !canPublish && { opacity: 0.5 }]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Publish
          </ThemedText>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  field: {
    gap: Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    fontSize: 16,
  },
  body: {
    minHeight: 160,
    textAlignVertical: 'top',
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  pressed: {
    opacity: 0.8,
  },
  imagePreviewContainer: {
    marginVertical: Spacing.three,
    gap: Spacing.one,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: Spacing.two,
    alignSelf: 'center',
    marginBottom: Spacing.two,
  },
  removeButton: {
    position: 'absolute',
    top: Spacing.one,
    right: Spacing.one,
  },
  cameraButton: {
    alignItems: 'center',
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: Spacing.two,
    backgroundColor: 'white',
  },
  actionSheetOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  actionSheetContainer: {
    marginTop: Spacing.eight,
    backgroundColor: 'white',
    borderTopLeftRadius: Spacing.three,
    borderTopRightRadius: Spacing.three,
    padding: Spacing.four,
  },
  actionSheetTitle: {
    marginBottom: Spacing.two,
    alignSelf: 'center',
  },
  actionSheetOption: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
});