import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
}

/**
 * StarRating component - Visual star ratings for complexity
 * Displays filled and half-filled stars based on rating value
 */
export function StarRating({
  rating,
  maxRating = 5,
  size = 16,
  color = '#FFD700',
  emptyColor = '#E0E0E0',
}: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const diff = rating - i;
    let iconName: 'star' | 'star-half' | 'star-outline' = 'star-outline';

    if (diff >= 0) {
      iconName = 'star';
    } else if (diff > -0.5) {
      iconName = 'star-half';
    }

    stars.push(
      <Ionicons
        key={i}
        name={iconName}
        size={size}
        color={iconName === 'star-outline' ? emptyColor : color}
      />
    );
  }

  return <View style={styles.container}>{stars}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
});
