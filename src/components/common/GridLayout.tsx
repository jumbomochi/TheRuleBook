import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { GRID, getColumns } from '../../utils/responsive';

interface GridLayoutProps {
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
  style?: ViewStyle;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns,
  gap = GRID.gap,
  style,
}) => {
  const numColumns = columns ? getColumns(columns - 1) : GRID.columns;

  return (
    <View style={[styles.container, { gap }, style]}>
      {children.map((child, index) => (
        <View
          key={index}
          style={[
            styles.item,
            {
              width: `${100 / numColumns}%`,
              padding: gap / 2,
            },
          ]}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -GRID.gap / 2,
  },
  item: {
    minWidth: GRID.cardMinWidth,
  },
});
