import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorPalette } from '../../types/assets';
import { isTablet } from '../../utils/responsive';

interface HeroImageProps {
  source: ImageSourcePropType | string;
  height?: number;
  colorScheme?: ColorPalette;
  children?: React.ReactNode;
  gradientOpacity?: number;
}

/**
 * HeroImage - Hero image with gradient overlay
 * Displays an image with a gradient overlay for text readability
 */
export function HeroImage({
  source,
  height = isTablet ? 300 : 200,
  colorScheme,
  children,
  gradientOpacity = 0.7,
}: HeroImageProps) {
  const imageSource =
    typeof source === 'string' ? { uri: source } : source;

  // Create gradient colors from color scheme
  const gradientColors: readonly [string, string] = colorScheme
    ? [
        `${colorScheme.primary}00`,
        `${colorScheme.primary}${Math.round(gradientOpacity * 255).toString(16).padStart(2, '0')}`,
      ]
    : [
        'rgba(0,0,0,0)',
        `rgba(0,0,0,${gradientOpacity})`,
      ];

  return (
    <View style={[styles.container, { height }]}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
  },
});
