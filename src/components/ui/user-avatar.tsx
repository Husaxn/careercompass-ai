import { Image } from 'expo-image';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Linking, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { saveProfileAvatar } from '@/services/profile-service';
import { userStore, useUser } from '@/store';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

const AVATAR_IMG = 512;
const isWeb = Platform.OS === 'web';

type Notice = { title: string; message: string; actionLabel?: string; action?: () => void };

type UserAvatarProps = {
  size?: number;
  editable?: boolean;
  /** Optional tap handler (e.g. navigate to Profile). Overrides the edit action. */
  onPress?: () => void;
};

export function UserAvatar({ size = 96, editable = true, onPress }: UserAvatarProps) {
  const theme = useTheme();
  const user = useUser();

  const [optionsVisible, setOptionsVisible] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const words = user.name.trim().split(/\s+/).filter(Boolean);
  let initials = '';
  if (words.length >= 2) {
    initials = `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  } else if (words.length === 1) {
    initials = words[0][0].toUpperCase();
  }

  const hasAvatar = Boolean(user.avatarUri) && !imgError;

  const handlePress = () => {
    if (uploading) return;
    if (onPress) {
      onPress();
      return;
    }
    if (editable) {
      setOptionsVisible(true);
    }
  };

  const closeOptions = () => setOptionsVisible(false);

  const handleCamera = async () => {
    closeOptions();
    if (isWeb) return;
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      setNotice({
        title: 'Camera access needed',
        message:
          'To take a new profile photo, CareerCompass needs camera permission. You can enable it in your device settings.',
        actionLabel: 'Open Settings',
        action: () => Linking.openSettings(),
      });
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled) return;
    setPreview(result.assets[0].uri);
  };

  const handleGallery = async () => {
    closeOptions();
    if (!isWeb) {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        setNotice({
          title: 'Photo library access needed',
          message:
            'To choose a profile photo, CareerCompass needs access to your photo library. You can enable it in your device settings.',
          actionLabel: 'Open Settings',
          action: () => Linking.openSettings(),
        });
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });
    if (result.canceled) return;
    setPreview(result.assets[0].uri);
  };

  const confirmPhoto = async () => {
    if (!preview) return;
    setUploading(true);
    try {
      const processed = await ImageManipulator.manipulateAsync(
        preview,
        [{ resize: { width: AVATAR_IMG, height: AVATAR_IMG } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true },
      );
      const dataUri = `data:image/jpeg;base64,${processed.base64}`;
      const saved = await saveProfileAvatar(dataUri);
      setImgError(false);
      userStore.setAvatar(saved);
      setPreview(null);
    } catch {
      setPreview(null);
      setNotice({
        title: "Couldn't save your photo",
        message: 'Something went wrong while saving your profile photo. Your previous photo was kept.',
      });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = () => {
    closeOptions();
    setImgError(false);
    userStore.setAvatar(undefined);
  };

  const renderAvatarContent = () => {
    if (uploading) {
      return <ActivityIndicator size="small" color={theme.onBrand} />;
    }
    if (hasAvatar) {
      return (
        <Image
          source={{ uri: user.avatarUri }}
          style={[styles.image, { width: size, height: size }]}
          contentFit="cover"
          transition={150}
          onError={() => setImgError(true)}
        />
      );
    }
    if (initials) {
      return (
        <ThemedText type="default" style={[styles.initials, { color: theme.onBrand, fontSize: Math.round(size * 0.4) }]}>
          {initials}
        </ThemedText>
      );
    }
    return (
      <SymbolView name={personIcon} size={Math.round(size * 0.5)} weight="bold" tintColor={theme.onBrand} />
    );
  };

  const cameraIcon = { ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' } as SymbolName;
  const personIcon = { ios: 'person.fill', android: 'person', web: 'person' } as SymbolName;

  return (
    <>
      <Pressable
        onPress={handlePress}
        disabled={uploading}
        accessibilityLabel={onPress ? 'Open profile' : 'Change profile photo'}
        style={({ pressed }) => [styles.wrap, { width: size, height: size }, pressed && styles.pressed]}>
        <ThemedView type="backgroundSelected" style={[styles.avatar, { width: size, height: size }, { backgroundColor: theme.brand }]}>
          {renderAvatarContent()}
        </ThemedView>

        {editable && (
          <ThemedView type="backgroundElement" style={styles.badge}>
            <SymbolView name={cameraIcon} size={14} weight="bold" tintColor={theme.text} />
          </ThemedView>
        )}
      </Pressable>

      <Modal
        transparent
        visible={optionsVisible}
        animationType="fade"
        onRequestClose={closeOptions}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeOptions} />
          <ThemedView type="backgroundElement" style={[styles.sheet, isWeb && styles.sheetCentered]}>
            <ThemedText type="captionBold" themeColor="textSecondary" style={styles.sheetTitle}>
              Profile photo
            </ThemedText>
            {!isWeb && (
              <OptionRow label="Take Photo" onPress={handleCamera} />
            )}
            <OptionRow label="Choose from Gallery" onPress={handleGallery} />
            {user.avatarUri && <OptionRow label="Remove Photo" destructive onPress={removePhoto} />}
            <OptionRow label="Cancel" onPress={closeOptions} />
          </ThemedView>
        </View>
      </Modal>

      <Modal transparent visible={Boolean(preview)} animationType="fade" onRequestClose={() => setPreview(null)}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPreview(null)} />
          <ThemedView type="backgroundElement" style={[styles.sheet, styles.previewSheet, isWeb && styles.sheetCentered]}>
            <ThemedText type="captionBold" themeColor="textSecondary">Preview your photo</ThemedText>
            {preview && (
              <View style={styles.previewFrame}>
                <Image source={{ uri: preview }} style={styles.previewImage} contentFit="cover" />
              </View>
            )}
            <Pressable
              onPress={confirmPhoto}
              disabled={uploading}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, uploading && styles.disabled]}>
              {uploading ? (
                <ActivityIndicator size="small" color="#0b0b0d" />
              ) : (
                <ThemedText type="smallBold" themeColor="textSecondary">Use Photo</ThemedText>
              )}
            </Pressable>
            <Pressable onPress={() => setPreview(null)} style={styles.textButton}>
              <ThemedText type="small" themeColor="textSecondary">Cancel</ThemedText>
            </Pressable>
          </ThemedView>
        </View>
      </Modal>

      <Modal transparent visible={Boolean(notice)} animationType="fade" onRequestClose={() => setNotice(null)}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setNotice(null)} />
          <ThemedView type="backgroundElement" style={[styles.sheet, styles.previewSheet, isWeb && styles.sheetCentered]}>
            <ThemedText type="captionBold">{notice?.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">{notice?.message}</ThemedText>
            <View style={styles.noticeActions}>
              {notice?.action ? (
                <Pressable onPress={notice.action} style={[styles.primaryButton, styles.noticeButton]}>
                  <ThemedText type="smallBold" themeColor="textSecondary">{notice.actionLabel}</ThemedText>
                </Pressable>
              ) : null}
              <Pressable onPress={() => setNotice(null)} style={[styles.textButton, styles.noticeButton]}>
                <ThemedText type="small" themeColor="textSecondary">OK</ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      </Modal>
    </>
  );
}

function OptionRow({ label, onPress, destructive }: { label: string; onPress: () => void; destructive?: boolean }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.option, pressed && styles.pressed]}>
      <ThemedText type="captionBold" themeColor={destructive ? 'text' : 'text'} style={destructive ? styles.destructive : undefined}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 999,
  },
  avatar: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    borderRadius: 999,
  },
  initials: {
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00000022',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    borderTopLeftRadius: Spacing.three,
    borderTopRightRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  sheetCentered: {
    borderRadius: Spacing.three,
    margin: Spacing.four,
  },
  sheetTitle: {
    marginBottom: Spacing.one,
  },
  option: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  destructive: {
    color: '#e5484d',
  },
  previewSheet: {
    alignItems: 'center',
  },
  previewFrame: {
    width: 240,
    height: 240,
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  primaryButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  textButton: {
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  noticeActions: {
    flexDirection: 'row',
    gap: Spacing.two,
    width: '100%',
    marginTop: Spacing.two,
  },
  noticeButton: {
    flex: 1,
  },
});