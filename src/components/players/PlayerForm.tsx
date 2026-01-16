import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { ColorPicker } from './ColorPicker';
import type { Player } from '../../types/session';

interface PlayerFormProps {
  onSubmit: (player: Omit<Player, 'id'>) => void;
  onCancel?: () => void;
  usedColors?: string[];
  initialPlayer?: Player;
}

export const PlayerForm: React.FC<PlayerFormProps> = ({
  onSubmit,
  onCancel,
  usedColors = [],
  initialPlayer,
}) => {
  const [name, setName] = useState(initialPlayer?.name || '');
  const [color, setColor] = useState(initialPlayer?.color || '#2196f3');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({
        name: name.trim(),
        color,
      });
      setName('');
      setColor('#2196f3');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Player Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        autoFocus
      />
      <ColorPicker
        label="Player Color"
        selectedColor={color}
        onColorSelect={setColor}
        usedColors={usedColors.filter((c) => c !== initialPlayer?.color)}
      />
      <View style={styles.actions}>
        {onCancel && (
          <Button mode="outlined" onPress={onCancel} style={styles.button}>
            Cancel
          </Button>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!name.trim()}
          style={styles.button}
        >
          {initialPlayer ? 'Update' : 'Add'} Player
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  button: {
    minWidth: 100,
  },
});
