import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const PLAYER_COLORS = [
  { name: 'Red', value: '#f44336' },
  { name: 'Blue', value: '#2196f3' },
  { name: 'Green', value: '#4caf50' },
  { name: 'Yellow', value: '#ffeb3b' },
  { name: 'Purple', value: '#9c27b0' },
  { name: 'Orange', value: '#ff9800' },
  { name: 'Pink', value: '#e91e63' },
  { name: 'Teal', value: '#009688' },
  { name: 'Brown', value: '#795548' },
  { name: 'Grey', value: '#9e9e9e' },
  { name: 'Cyan', value: '#00bcd4' },
  { name: 'Lime', value: '#cddc39' },
];

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  usedColors?: string[];
  label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
  usedColors = [],
  label,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text variant="labelLarge" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={styles.colorGrid}>
        {PLAYER_COLORS.map((color) => {
          const isSelected = selectedColor === color.value;
          const isUsed = usedColors.includes(color.value) && !isSelected;

          return (
            <TouchableOpacity
              key={color.value}
              style={[
                styles.colorButton,
                { backgroundColor: color.value },
                isSelected && styles.selectedColor,
                isUsed && styles.usedColor,
              ]}
              onPress={() => !isUsed && onColorSelect(color.value)}
              disabled={isUsed}
            >
              {isSelected && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
              {isUsed && (
                <View style={styles.disabledOverlay} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  label: {
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 3,
  },
  usedColor: {
    opacity: 0.3,
  },
  checkmark: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 24,
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  disabledOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
  },
});
