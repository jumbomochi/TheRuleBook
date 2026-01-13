import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useLocalSearchParams, Link, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Placeholder game data - will be replaced with data store
const GAMES_DATA: Record<string, {
  name: string;
  description: string;
  playerCount: string;
  playTime: string;
  complexity: number;
  boxArt: string | null;
  primaryColor: string;
}> = {
  splendor: {
    name: 'Splendor',
    description:
      'A game of chip-collecting and card development. Players are Renaissance merchants acquiring gem mines, transportation, and shops to earn prestige points.',
    playerCount: '2-4',
    playTime: '30 min',
    complexity: 1.8,
    boxArt: null,
    primaryColor: '#8B4513',
  },
  wingspan: {
    name: 'Wingspan',
    description:
      'A competitive bird-collection, engine-building game. Attract birds to your wildlife preserves and score points from eggs, cached food, and bird powers.',
    playerCount: '1-5',
    playTime: '40-70 min',
    complexity: 2.4,
    boxArt: null,
    primaryColor: '#4A90A4',
  },
  'terraforming-mars': {
    name: 'Terraforming Mars',
    description:
      'Corporations compete to transform Mars into a habitable planet by raising temperature, oxygen, and ocean coverage while building infrastructure.',
    playerCount: '1-5',
    playTime: '120 min',
    complexity: 3.2,
    boxArt: null,
    primaryColor: '#C84B31',
  },
};

interface ActionCardProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  subtitle: string;
  href: string;
  colorScheme: 'light' | 'dark';
  accentColor: string;
}

function ActionCard({
  icon,
  title,
  subtitle,
  href,
  colorScheme,
  accentColor,
}: ActionCardProps) {
  const colors = Colors[colorScheme];

  return (
    <Link href={href as any} asChild>
      <Pressable
        style={[
          styles.actionCard,
          { backgroundColor: accentColor + '15', borderColor: accentColor },
        ]}>
        <View style={[styles.actionIcon, { backgroundColor: accentColor }]}>
          <FontAwesome name={icon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={[styles.actionSubtitle, { color: colors.text + 'AA' }]}>
            {subtitle}
          </Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color={colors.text + '60'} />
      </Pressable>
    </Link>
  );
}

export default function GameDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const game = GAMES_DATA[id ?? ''] ?? {
    name: 'Unknown Game',
    description: 'Game not found',
    playerCount: '-',
    playTime: '-',
    complexity: 0,
    boxArt: null,
    primaryColor: colors.tint,
  };

  return (
    <>
      <Stack.Screen options={{ title: game.name }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.boxArtContainer}>
            {game.boxArt ? (
              <Image source={{ uri: game.boxArt }} style={styles.boxArt} />
            ) : (
              <View
                style={[
                  styles.boxArtPlaceholder,
                  { backgroundColor: game.primaryColor },
                ]}>
                <FontAwesome name="cube" size={64} color="#FFFFFF" />
              </View>
            )}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <FontAwesome
                name="users"
                size={20}
                color={game.primaryColor}
              />
              <Text style={styles.statValue}>{game.playerCount}</Text>
              <Text style={styles.statLabel}>Players</Text>
            </View>
            <View style={styles.statBox}>
              <FontAwesome
                name="clock-o"
                size={20}
                color={game.primaryColor}
              />
              <Text style={styles.statValue}>{game.playTime}</Text>
              <Text style={styles.statLabel}>Play Time</Text>
            </View>
            <View style={styles.statBox}>
              <FontAwesome
                name="signal"
                size={20}
                color={game.primaryColor}
              />
              <Text style={styles.statValue}>{game.complexity.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Complexity</Text>
            </View>
          </View>

          <Text style={styles.description}>{game.description}</Text>
        </View>

        <View style={styles.actions}>
          <ActionCard
            icon="play"
            title="Start Game"
            subtitle="Set up players and begin tracking"
            href={`/game/${id}/setup`}
            colorScheme={colorScheme}
            accentColor={game.primaryColor}
          />
          <ActionCard
            icon="book"
            title="Rules"
            subtitle="Full game rules and reference"
            href={`/game/${id}/rules`}
            colorScheme={colorScheme}
            accentColor={game.primaryColor}
          />
          <ActionCard
            icon="list"
            title="Quick Reference"
            subtitle="Turn order and key reminders"
            href={`/game/${id}/quickref`}
            colorScheme={colorScheme}
            accentColor={game.primaryColor}
          />
          <ActionCard
            icon="question-circle"
            title="FAQ"
            subtitle="Common questions answered"
            href={`/game/${id}/faq`}
            colorScheme={colorScheme}
            accentColor={game.primaryColor}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  boxArtContainer: {
    width: 180,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  boxArt: {
    width: '100%',
    height: '100%',
  },
  boxArtPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  statBox: {
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'transparent',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 8,
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
  },
});
