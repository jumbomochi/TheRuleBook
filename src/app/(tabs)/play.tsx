import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSession, useGame } from '../../hooks';
import { GameSession } from '../../types';
import { useEffect } from 'react';

/**
 * Play screen - View active session and saved sessions
 */
export default function PlayScreen() {
  const router = useRouter();
  const { activeSession, savedSessions, loadSavedSessions, loadSession } = useSession();

  useEffect(() => {
    loadSavedSessions();
  }, []);

  const handleResumeSession = (sessionId: string) => {
    loadSession(sessionId);
    // Navigate to the game play screen
    const session = savedSessions.find((s: GameSession) => s.id === sessionId);
    if (session) {
      router.push(`/game/${session.gameId}/play`);
    }
  };

  return (
    <View style={styles.container}>
      {activeSession ? (
        <ActiveSessionCard session={activeSession} />
      ) : (
        <View style={styles.noActiveContainer}>
          <Ionicons name="game-controller-outline" size={64} color="#ccc" />
          <Text style={styles.noActiveText}>No active game</Text>
          <Text style={styles.noActiveSubtext}>Start a game from the Library</Text>
        </View>
      )}

      <View style={styles.savedHeader}>
        <Text style={styles.savedTitle}>Saved Games</Text>
      </View>

      <FlatList
        data={savedSessions}
        renderItem={({ item }) => (
          <SavedSessionCard
            session={item}
            onPress={() => handleResumeSession(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved games</Text>
          </View>
        }
      />
    </View>
  );
}

/**
 * Active session card component
 */
function ActiveSessionCard({ session }: { session: GameSession }) {
  const game = useGame(session.gameId);
  const router = useRouter();

  if (!game) return null;

  return (
    <TouchableOpacity
      style={styles.activeCard}
      onPress={() => router.push(`/game/${session.gameId}/play`)}
    >
      <View style={styles.activeHeader}>
        <Ionicons name="play-circle" size={32} color="#34C759" />
        <Text style={styles.activeTitle}>Active Game</Text>
      </View>
      <Text style={styles.activeGameName}>{game.name}</Text>
      <View style={styles.activeDetails}>
        <Text style={styles.activeDetailText}>
          {session.players.length} players • Turn {session.turnNumber}
        </Text>
        <Text style={styles.activeDetailText}>
          Current: {session.players[session.currentPlayerIndex]?.name || 'Unknown'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Saved session card component
 */
function SavedSessionCard({
  session,
  onPress,
}: {
  session: GameSession;
  onPress: () => void;
}) {
  const game = useGame(session.gameId);

  if (!game) return null;

  const lastPlayed = new Date(session.lastUpdatedAt).toLocaleDateString();

  return (
    <TouchableOpacity style={styles.savedCard} onPress={onPress}>
      <View style={styles.savedCardContent}>
        <Text style={styles.savedGameName}>{game.name}</Text>
        <Text style={styles.savedDetails}>
          {session.players.length} players • Turn {session.turnNumber}
        </Text>
        <Text style={styles.savedDate}>Last played: {lastPlayed}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  noActiveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  noActiveText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  noActiveSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  activeCard: {
    backgroundColor: '#34C75920',
    borderColor: '#34C759',
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    margin: 16,
  },
  activeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34C759',
  },
  activeGameName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  activeDetails: {
    gap: 4,
  },
  activeDetailText: {
    fontSize: 14,
    color: '#666',
  },
  savedHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  savedCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  savedCardContent: {
    flex: 1,
  },
  savedGameName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  savedDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  savedDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
