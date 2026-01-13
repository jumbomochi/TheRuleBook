import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Placeholder game data - will be replaced with actual data store
const SAMPLE_GAMES = [
  {
    id: 'splendor',
    name: 'Splendor',
    playerCount: '2-4',
    playTime: '30 min',
    complexity: 1.8,
    boxArt: null,
  },
  {
    id: 'wingspan',
    name: 'Wingspan',
    playerCount: '1-5',
    playTime: '40-70 min',
    complexity: 2.4,
    boxArt: null,
  },
  {
    id: 'terraforming-mars',
    name: 'Terraforming Mars',
    playerCount: '1-5',
    playTime: '120 min',
    complexity: 3.2,
    boxArt: null,
  },
];

interface GameCardProps {
  game: (typeof SAMPLE_GAMES)[0];
  colorScheme: 'light' | 'dark';
}

function GameCard({ game, colorScheme }: GameCardProps) {
  const colors = Colors[colorScheme];

  return (
    <Link href={`/game/${game.id}`} asChild>
      <Pressable
        style={[
          styles.gameCard,
          { backgroundColor: colors.background, borderColor: colors.tint },
        ]}>
        <View style={styles.gameImageContainer}>
          {game.boxArt ? (
            <Image source={{ uri: game.boxArt }} style={styles.gameImage} />
          ) : (
            <View
              style={[styles.gamePlaceholder, { backgroundColor: colors.tint }]}>
              <FontAwesome name="cube" size={40} color={colors.background} />
            </View>
          )}
        </View>
        <View style={styles.gameInfo}>
          <Text style={styles.gameName}>{game.name}</Text>
          <View style={styles.gameStats}>
            <View style={styles.statItem}>
              <FontAwesome name="users" size={12} color={colors.text} />
              <Text style={styles.statText}>{game.playerCount}</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome name="clock-o" size={12} color={colors.text} />
              <Text style={styles.statText}>{game.playTime}</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome name="signal" size={12} color={colors.text} />
              <Text style={styles.statText}>{game.complexity.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        <FontAwesome name="chevron-right" size={16} color={colors.text} />
      </Pressable>
    </Link>
  );
}

export default function LibraryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = SAMPLE_GAMES.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.background, borderColor: colors.tint },
        ]}>
        <FontAwesome
          name="search"
          size={16}
          color={colors.text}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search games..."
          placeholderTextColor={colors.text + '80'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <FontAwesome name="times-circle" size={16} color={colors.text} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard game={item} colorScheme={colorScheme} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome name="search" size={48} color={colors.text + '40'} />
            <Text style={styles.emptyText}>No games found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  listContent: {
    paddingBottom: 24,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  gameImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  gamePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameInfo: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: 'transparent',
  },
  gameName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  gameStats: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: 'transparent',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'transparent',
  },
  statText: {
    fontSize: 12,
    opacity: 0.8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.6,
  },
});
