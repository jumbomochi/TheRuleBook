import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';

interface ScoreInputProps {
  categories?: string[];
  onSubmit: (points: number, category: string) => void;
  defaultCategory?: string;
}

export const ScoreInput: React.FC<ScoreInputProps> = ({
  categories = ['General'],
  onSubmit,
  defaultCategory,
}) => {
  const [points, setPoints] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    defaultCategory || categories[0]
  );

  const handleSubmit = () => {
    const numPoints = parseInt(points, 10);
    if (!isNaN(numPoints)) {
      onSubmit(numPoints, selectedCategory);
      setPoints('');
    }
  };

  const handleQuickAdd = (value: number) => {
    onSubmit(value, selectedCategory);
  };

  return (
    <View style={styles.container}>
      {categories.length > 1 && (
        <SegmentedButtons
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          buttons={categories.map((cat) => ({
            value: cat,
            label: cat,
          }))}
          style={styles.categoryButtons}
        />
      )}

      <View style={styles.inputRow}>
        <TextInput
          label="Points"
          value={points}
          onChangeText={setPoints}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          placeholder="Enter points"
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!points}
          style={styles.submitButton}
        >
          Add
        </Button>
      </View>

      <View style={styles.quickButtons}>
        <Button
          mode="outlined"
          onPress={() => handleQuickAdd(1)}
          style={styles.quickButton}
        >
          +1
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleQuickAdd(5)}
          style={styles.quickButton}
        >
          +5
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleQuickAdd(10)}
          style={styles.quickButton}
        >
          +10
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleQuickAdd(-1)}
          style={styles.quickButton}
        >
          -1
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  categoryButtons: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
  },
  submitButton: {
    justifyContent: 'center',
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  quickButton: {
    flex: 1,
  },
});
