import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SPACING, TYPOGRAPHY, isTablet } from '../../utils/responsive';
import { COLORS, BORDER_RADIUS } from '../../utils/theme';

/**
 * GameCardSkeleton - Loading skeleton for game cards
 * Displays an animated placeholder while game data loads
 */
export function GameCardSkeleton() {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [fadeAnim]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.image, { opacity: fadeAnim }]} />

      <View style={styles.content}>
        <Animated.View style={[styles.titleBar, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.subtitleBar, { opacity: fadeAnim }]} />

        <View style={styles.detailsContainer}>
          <Animated.View style={[styles.detailBar, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.detailBar, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.detailBar, { opacity: fadeAnim }]} />
        </View>

        <View style={styles.tagsContainer}>
          <Animated.View style={[styles.tag, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.tag, { opacity: fadeAnim }]} />
          <Animated.View style={[styles.tag, { opacity: fadeAnim }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.light.surface,
    borderRadius: BORDER_RADIUS.large,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  image: {
    height: isTablet ? 180 : 120,
    backgroundColor: COLORS.light.surfaceVariant,
  },
  content: {
    padding: SPACING.md,
  },
  titleBar: {
    height: TYPOGRAPHY.heading,
    backgroundColor: COLORS.light.surfaceVariant,
    borderRadius: BORDER_RADIUS.small,
    marginBottom: SPACING.sm,
    width: '70%',
  },
  subtitleBar: {
    height: TYPOGRAPHY.body,
    backgroundColor: COLORS.light.surfaceVariant,
    borderRadius: BORDER_RADIUS.small,
    marginBottom: SPACING.md,
    width: '50%',
  },
  detailsContainer: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  detailBar: {
    height: TYPOGRAPHY.body,
    backgroundColor: COLORS.light.surfaceVariant,
    borderRadius: BORDER_RADIUS.small,
    width: '60%',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  tag: {
    height: 24,
    width: 60,
    backgroundColor: COLORS.light.surfaceVariant,
    borderRadius: BORDER_RADIUS.medium,
  },
});
