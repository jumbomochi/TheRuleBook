import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { TOUCH_TARGETS, SPACING, isTablet } from '../../utils/responsive';
import { SHADOWS, BORDER_RADIUS, COLORS } from '../../utils/theme';

interface TouchableCardProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
  variant?: 'elevated' | 'outlined' | 'filled';
  disabled?: boolean;
}

export const TouchableCard: React.FC<TouchableCardProps> = ({
  onPress,
  children,
  style,
  size = 'medium',
  variant = 'elevated',
  disabled = false,
}) => {
  const minHeight = {
    small: TOUCH_TARGETS.small,
    medium: TOUCH_TARGETS.large,
    large: TOUCH_TARGETS.extraLarge,
  }[size];

  const variantStyle = {
    elevated: styles.elevated,
    outlined: styles.outlined,
    filled: styles.filled,
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.container,
        variantStyle,
        { minHeight },
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.large,
    padding: isTablet ? SPACING.lg : SPACING.md,
    justifyContent: 'center',
  },
  elevated: {
    backgroundColor: COLORS.light.surface,
    ...SHADOWS.medium,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  filled: {
    backgroundColor: COLORS.light.surfaceVariant,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
  },
});
