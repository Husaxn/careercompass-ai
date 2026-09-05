import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform } from 'react-native';
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

type UseImagePickerReturn = {
  hasSelectedImage: boolean;
  previewUri: string | null;
  isUploading: boolean;
  showActionSheet: () => void;
  handleTakePhoto: () => void;
  handleChooseFromGallery: () => void;
  handleRemoveImage: () => void;
  confirmImage: () => void;
  resetImage: () => void;
};

export function useImagePicker(): UseImagePickerReturn {
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [notice, setNotice] = useState<{ title: string; message: string; actionLabel?: string; action?: () => void } | null>(null);

  const isWeb = Platform.OS === 'web';

  const closeOptions = () => { };

  const showActionSheet = useCallback(() => {
    setNotice(null);
  }, []);

  const handlePermission = async (permissionCheck: () => Promise<{ granted: boolean }>, notice: { title: string; message: string; actionLabel?: string; action?: () => void }) => {
    const perm = await permissionCheck();
    if (!perm.granted) {
      setNotice({
        title: notice.title,
        message: notice.message,
        actionLabel: notice.actionLabel,
        action: notice.action,
      });
      return false;
    }
    return true;
  };

  const handleCamera = async () => {
    closeOptions();
    if (isWeb) {
      Alert.alert('Camera not available', 'Camera access is not supported on the web platform.');
      return;
    }
    const hasCam = await handlePermission(
      () => ImagePicker.requestCameraPermissionsAsync(),
      {
        title: 'Camera access needed',
        message: 'To take a new photo, CareerCompass needs camera permission. You can enable it in your device settings.',
        actionLabel: 'Open Settings',
        action: () => Alert.alert('Open Settings', 'Settings opening...'),
      }
    );
    if (!hasCam) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const processed = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 512, height: 512 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    const dataUri = `data:image/jpeg;base64,${processed.base64}`;
    setPreviewUri(dataUri);
  };

  const handleGallery = async () => {
    closeOptions();
    if (!isWeb) {
      const hasGl = await handlePermission(
        () => ImagePicker.requestMediaLibraryPermissionsAsync(),
        {
          title: 'Photo library access needed',
          message: 'To choose a photo from your library, CareerCompass needs access to your photo library. You can enable it in your device settings.',
          actionLabel: 'Open Settings',
          action: () => Alert.alert('Open Settings', 'Settings opening...'),
        }
      );
      if (!hasGl) return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (result.canceled) return;

    const processed = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 512, height: 512 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    const dataUri = `data:image/jpeg;base64,${processed.base64}`;
    setPreviewUri(dataUri);
  };

  const confirmImage = useCallback(() => {
    if (!previewUri) return;
    setIsUploading(true);
  }, [previewUri]);

  const removeImage = useCallback(() => {
    setPreviewUri(null);
  }, []);

  return {
    hasSelectedImage: previewUri != null,
    previewUri,
    isUploading,
    showActionSheet,
    handleTakePhoto: handleCamera,
    handleChooseFromGallery: handleGallery,
    handleRemoveImage: removeImage,
    confirmImage,
    resetImage: () => {
      setPreviewUri(null);
    },
  };
};