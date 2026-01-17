import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, TYPOGRAPHY, isTablet } from '../../utils/responsive';
import { COLORS } from '../../utils/theme';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

/**
 * EmptyState - Illustrated empty states
 * Displays a consistent empty state with icon, title, and optional message/action
 */
export function EmptyState({
  icon = 'file-tray-outline',
  title,
  message,
  action,
}: EmptyStateProps) {
  const iconSize = isTablet ? 96 : 64;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={iconSize} color={COLORS.light.disabled} />
      </View>

      <Text style={styles.title}>{title}</Text>

      {message && <Text style={styles.message}>{message}</Text>}

      {action && <View style={styles.actionContainer}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isTablet ? 120 : 80,
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '600',
    color: COLORS.light.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  message: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.light.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  actionContainer: {
    marginTop: SPACING.md,
  },
});
