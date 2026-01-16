import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { isTablet, SPACING } from '../../utils/responsive';

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWeight?: number; // 0-1, defaults to 0.5
  minLeftWidth?: number;
  minRightWidth?: number;
  style?: ViewStyle;
  gap?: number;
}

export const SplitView: React.FC<SplitViewProps> = ({
  left,
  right,
  leftWeight = 0.5,
  minLeftWidth = 300,
  minRightWidth = 300,
  style,
  gap = SPACING.lg,
}) => {
  if (!isTablet) {
    // On phone, stack vertically
    return (
      <View style={[styles.stackContainer, style]}>
        <View style={styles.stackSection}>{left}</View>
        <View style={[styles.stackSection, { marginTop: gap }]}>{right}</View>
      </View>
    );
  }

  return (
    <View style={[styles.splitContainer, style]}>
      <View
        style={[
          styles.leftPanel,
          {
            flex: leftWeight,
            minWidth: minLeftWidth,
            marginRight: gap / 2,
          },
        ]}
      >
        {left}
      </View>
      <View
        style={[
          styles.rightPanel,
          {
            flex: 1 - leftWeight,
            minWidth: minRightWidth,
            marginLeft: gap / 2,
          },
        ]}
      >
        {right}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splitContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftPanel: {
    overflow: 'hidden',
  },
  rightPanel: {
    overflow: 'hidden',
  },
  stackContainer: {
    flex: 1,
  },
  stackSection: {
    flex: 1,
  },
});
