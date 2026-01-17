import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ComponentType } from '../../types/assets';
import { saveUserPhoto } from '../../services/assetService';
import { SPACING, TYPOGRAPHY, TOUCH_TARGETS, isTablet } from '../../utils/responsive';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

interface ComponentPhotoUploadProps {
  gameId: string;
  componentType: ComponentType;
  label?: string;
  onPhotoUploaded?: (uri: string) => void;
}

/**
 * ComponentPhotoUpload - User photo upload for game components
 * Allows users to capture or select photos of their game components
 */
export function ComponentPhotoUpload({
  gameId,
  componentType,
  label,
  onPhotoUploaded,
}: ComponentPhotoUploadProps) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to upload photos.'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      handleImageSelected(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera permissions to take photos.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      handleImageSelected(result.assets[0].uri);
    }
  };

  const handleImageSelected = async (uri: string) => {
    setUploading(true);
    try {
      const photoLabel = label || `${componentType} photo`;
      const savedPhoto = await saveUserPhoto(gameId, uri, componentType, photoLabel);

      if (savedPhoto) {
        setPhotoUri(uri);
        onPhotoUploaded?.(uri);
        Alert.alert('Success', 'Photo uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to save photo. Please try again.');
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      Alert.alert('Error', 'An error occurred while uploading the photo.');
    } finally {
      setUploading(false);
    }
  };

  const showOptions = () => {
    Alert.alert('Add Photo', 'Choose an option', [
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Choose from Library', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
          <TouchableOpacity
            style={styles.changeButton}
            onPress={showOptions}
          >
            <Ionicons name="camera" size={20} color="#FFFFFF" />
            <Text style={styles.changeButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={showOptions}
          disabled={uploading}
        >
          <Ionicons
            name="camera-outline"
            size={isTablet ? 48 : 40}
            color={COLORS.light.primary}
          />
          <Text style={styles.uploadText}>
            {uploading ? 'Uploading...' : 'Add Photo'}
          </Text>
          <Text style={styles.uploadSubtext}>
            Take a photo or choose from library
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.large,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.light.border,
    backgroundColor: COLORS.light.surfaceVariant,
    minHeight: isTablet ? 200 : 150,
  },
  uploadText: {
    fontSize: TYPOGRAPHY.subheading,
    fontWeight: '600',
    color: COLORS.light.text,
    marginTop: SPACING.sm,
  },
  uploadSubtext: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.light.textSecondary,
    marginTop: SPACING.xs,
  },
  photoContainer: {
    position: 'relative',
    borderRadius: BORDER_RADIUS.large,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  photo: {
    width: '100%',
    height: isTablet ? 240 : 180,
    backgroundColor: COLORS.light.surfaceVariant,
  },
  changeButton: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.medium,
    minHeight: TOUCH_TARGETS.small,
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },
});
