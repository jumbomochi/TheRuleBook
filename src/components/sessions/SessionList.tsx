import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, IconButton, Button, Chip } from 'react-native-paper';
import type { GameSession } from '../../types/session';

interface SessionListProps {
  sessions: GameSession[];
  onResume: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
  onViewDetails?: (sessionId: string) => void;
}

export const SessionList: React.FC<SessionListProps> = ({
  sessions,
  onResume,
  onDelete,
  onViewDetails,
}) => {
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const calculateTotalScore = (session: GameSession, playerId: string): number => {
    const playerScores = session.scores[playerId] || [];
    return playerScores.reduce((sum, entry) => sum + entry.points, 0);
  };

  const renderSession = ({ item: session }: { item: GameSession }) => {
    const isCompleted = !!session.completedAt;
    const currentPlayer = session.players[session.currentPlayerIndex];

    return (
      <Card style={styles.card}>
        <Card.Title
          title={session.gameId}
          subtitle={`${session.players.length} players • ${formatDate(
            session.lastUpdatedAt
          )}`}
          right={(props) => (
            <View style={styles.cardActions}>
              {onViewDetails && (
                <IconButton
                  {...props}
                  icon="information"
                  onPress={() => onViewDetails(session.id)}
                />
              )}
              <IconButton
                {...props}
                icon="delete"
                onPress={() => onDelete(session.id)}
              />
            </View>
          )}
        />
        <Card.Content>
          <View style={styles.sessionInfo}>
            {isCompleted ? (
              <Chip icon="trophy" style={styles.statusChip}>
                Completed
              </Chip>
            ) : (
              <Chip icon="play" style={styles.statusChip}>
                In Progress
              </Chip>
            )}
            {!isCompleted && currentPlayer && (
              <Text variant="bodyMedium">
                Current: {currentPlayer.name}
              </Text>
            )}
          </View>

          <View style={styles.players}>
            {session.players.map((player) => {
              const totalScore = calculateTotalScore(session, player.id);
              const isWinner = session.winner === player.id;

              return (
                <View key={player.id} style={styles.playerRow}>
                  <View style={styles.playerInfo}>
                    <View
                      style={[
                        styles.playerColor,
                        { backgroundColor: player.color },
                      ]}
                    />
                    <Text variant="bodyMedium">{player.name}</Text>
                    {isWinner && (
                      <Text variant="bodySmall" style={styles.winnerBadge}>
                        Winner
                      </Text>
                    )}
                  </View>
                  <Text variant="bodyLarge" style={styles.playerScore}>
                    {totalScore}
                  </Text>
                </View>
              );
            })}
          </View>

          {!isCompleted && (
            <View style={styles.sessionStats}>
              <Text variant="bodySmall">Turn: {session.turnNumber}</Text>
              {session.roundNumber && (
                <Text variant="bodySmall">Round: {session.roundNumber}</Text>
              )}
            </View>
          )}
        </Card.Content>
        {!isCompleted && (
          <Card.Actions>
            <Button mode="contained" onPress={() => onResume(session.id)}>
              Resume Game
            </Button>
          </Card.Actions>
        )}
      </Card>
    );
  };

  if (sessions.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text variant="titleMedium">No saved games</Text>
        <Text variant="bodyMedium" style={styles.emptyText}>
          Start a new game to see it here
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sessions}
      renderItem={renderSession}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  players: {
    gap: 8,
    marginBottom: 12,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playerColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  playerScore: {
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  winnerBadge: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  sessionStats: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 8,
    color: '#666',
  },
});
