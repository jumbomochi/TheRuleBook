import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Text, IconButton, Chip } from 'react-native-paper';
import type { ScoreEntry } from '../../types/session';

interface ScoreHistoryProps {
  entries: ScoreEntry[];
  onUndo?: (index: number) => void;
  playerName?: string;
  playerColor?: string;
}

export const ScoreHistory: React.FC<ScoreHistoryProps> = ({
  entries,
  onUndo,
  playerName,
  playerColor,
}) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPoints = (points: number): string => {
    return points >= 0 ? `+${points}` : `${points}`;
  };

  const renderEntry = ({
    item,
    index,
  }: {
    item: ScoreEntry;
    index: number;
  }) => {
    const isPositive = item.points >= 0;

    return (
      <List.Item
        title={
          <View style={styles.entryTitle}>
            <Text
              variant="bodyLarge"
              style={[
                styles.points,
                isPositive ? styles.positivePoints : styles.negativePoints,
              ]}
            >
              {formatPoints(item.points)}
            </Text>
            <Text variant="bodyMedium">{item.category}</Text>
          </View>
        }
        description={formatTime(item.timestamp)}
        right={() =>
          onUndo ? (
            <IconButton
              icon="undo"
              size={20}
              onPress={() => onUndo(index)}
            />
          ) : null
        }
        style={styles.entry}
      />
    );
  };

  if (entries.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text variant="bodyMedium" style={styles.emptyText}>
          No scores recorded yet
        </Text>
      </View>
    );
  }

  const totalScore = entries.reduce((sum, entry) => sum + entry.points, 0);

  return (
    <View style={styles.container}>
      {playerName && (
        <View style={styles.header}>
          <View style={styles.playerInfo}>
            {playerColor && (
              <View
                style={[styles.playerColor, { backgroundColor: playerColor }]}
              />
            )}
            <Text variant="titleMedium">{playerName}</Text>
          </View>
          <Chip icon="trophy" style={styles.totalChip}>
            Total: {totalScore}
          </Chip>
        </View>
      )}
      <FlatList
        data={[...entries].reverse()}
        renderItem={({ item, index }) =>
          renderEntry({ item, index: entries.length - 1 - index })
        }
        keyExtractor={(item, index) => `${item.timestamp}-${index}`}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playerColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  totalChip: {
    backgroundColor: '#4caf50',
  },
  list: {
    flex: 1,
  },
  entry: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  entryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  points: {
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
    minWidth: 50,
  },
  positivePoints: {
    color: '#4caf50',
  },
  negativePoints: {
    color: '#f44336',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#666',
  },
});
