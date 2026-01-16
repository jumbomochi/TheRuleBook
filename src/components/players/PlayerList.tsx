import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, IconButton, Text, Chip } from 'react-native-paper';
import type { Player } from '../../types/session';

interface PlayerListProps {
  players: Player[];
  onRemove?: (playerId: string) => void;
  onEdit?: (player: Player) => void;
  currentPlayerId?: string;
  showScore?: boolean;
  scores?: Record<string, number>;
  compact?: boolean;
}

export const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onRemove,
  onEdit,
  currentPlayerId,
  showScore = false,
  scores = {},
  compact = false,
}) => {
  const renderPlayer = ({ item: player }: { item: Player }) => {
    const isCurrent = currentPlayerId === player.id;
    const score = scores[player.id] || 0;

    if (compact) {
      return (
        <View style={styles.compactItem}>
          <View style={styles.compactInfo}>
            <View
              style={[styles.colorDot, { backgroundColor: player.color }]}
            />
            <Text
              variant="bodyMedium"
              style={[isCurrent && styles.currentPlayerText]}
            >
              {player.name}
            </Text>
            {isCurrent && (
              <Chip compact style={styles.currentChip}>
                Current
              </Chip>
            )}
          </View>
          {showScore && (
            <Text variant="bodyLarge" style={styles.scoreText}>
              {score}
            </Text>
          )}
        </View>
      );
    }

    return (
      <List.Item
        title={player.name}
        description={showScore ? `Score: ${score}` : undefined}
        left={() => (
          <View style={styles.leftContent}>
            <View
              style={[styles.colorIndicator, { backgroundColor: player.color }]}
            />
          </View>
        )}
        right={() => (
          <View style={styles.rightContent}>
            {isCurrent && (
              <Chip compact style={styles.currentChip}>
                Current
              </Chip>
            )}
            {onEdit && (
              <IconButton icon="pencil" size={20} onPress={() => onEdit(player)} />
            )}
            {onRemove && (
              <IconButton
                icon="close"
                size={20}
                onPress={() => onRemove(player.id)}
              />
            )}
          </View>
        )}
        style={[styles.listItem, isCurrent && styles.currentPlayerItem]}
      />
    );
  };

  return (
    <FlatList
      data={players}
      renderItem={renderPlayer}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={compact && styles.compactList}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listItem: {
    paddingVertical: 8,
  },
  currentPlayerItem: {
    backgroundColor: '#e3f2fd',
  },
  currentPlayerText: {
    fontWeight: 'bold',
  },
  leftContent: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  colorIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currentChip: {
    backgroundColor: '#4caf50',
  },
  compactList: {
    gap: 8,
  },
  compactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  compactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  scoreText: {
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
});
