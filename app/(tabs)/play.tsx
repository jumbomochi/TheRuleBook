import React from 'react';
import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Placeholder - will be replaced with actual session store
const ACTIVE_SESSIONS: {
  id: string;
  gameId: string;
  gameName: string;
  players: string[];
  turnNumber: number;
  lastUpdated: string;
}[] = [];

export default function PlayScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const hasActiveSessions = ACTIVE_SESSIONS.length > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {hasActiveSessions ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Games</Text>
          {ACTIVE_SESSIONS.map((session) => (
            <Link key={session.id} href={`/game/${session.gameId}/play` as any} asChild>
              <Pressable
                style={[
                  styles.sessionCard,
                  { backgroundColor: colors.background, borderColor: colors.tint },
                ]}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionGameName}>{session.gameName}</Text>
                  <Text style={styles.sessionDetails}>
                    Turn {session.turnNumber} • {session.players.length} players
                  </Text>
                  <Text style={styles.sessionUpdated}>
                    Last played: {session.lastUpdated}
                  </Text>
                </View>
                <FontAwesome name="play-circle" size={32} color={colors.tint} />
              </Pressable>
            </Link>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <View
            style={[styles.emptyIcon, { backgroundColor: colors.tint + '20' }]}>
            <FontAwesome name="gamepad" size={64} color={colors.tint} />
          </View>
          <Text style={styles.emptyTitle}>No Active Games</Text>
          <Text style={styles.emptySubtitle}>
            Start a new game session from your library
          </Text>
          <Link href="/(tabs)" asChild>
            <Pressable
              style={[styles.browseButton, { backgroundColor: colors.tint }]}>
              <FontAwesome name="book" size={18} color={colors.background} />
              <Text style={[styles.browseButtonText, { color: colors.background }]}>
                Browse Library
              </Text>
            </Pressable>
          </Link>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <Pressable
            style={[
              styles.quickActionButton,
              { backgroundColor: colors.tint + '15', borderColor: colors.tint },
            ]}>
            <FontAwesome name="random" size={24} color={colors.tint} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              Random Game
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.quickActionButton,
              { backgroundColor: colors.tint + '15', borderColor: colors.tint },
            ]}>
            <FontAwesome name="history" size={24} color={colors.tint} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              Play History
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  sessionInfo: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sessionGameName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sessionDetails: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 2,
  },
  sessionUpdated: {
    fontSize: 12,
    opacity: 0.6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
