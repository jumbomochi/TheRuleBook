import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFilteredGames, useGames } from '../../hooks';
import { Game } from '../../types';
import { TouchableCard } from '../../components/common/TouchableCard';
import { GridLayout } from '../../components/common/GridLayout';
import { StarRating } from '../../components/common/StarRating';
import { EmptyState } from '../../components/common/EmptyState';
import { ThemedGameCard } from '../../components/common/ThemedGameCard';
import { TYPOGRAPHY, SPACING, TOUCH_TARGETS, isTablet } from '../../utils/responsive';
import { COLORS, SHADOWS } from '../../utils/theme';

/**
 * Library screen - Browse and search all games
 */
export default function LibraryScreen() {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useGames();
  const filteredGames = useFilteredGames();

  const renderContent = () => {
    if (filteredGames.length === 0) {
      return (
        <EmptyState
          icon="library-outline"
          title="No games found"
          message={searchQuery ? 'Try a different search term' : 'Add games to get started'}
        />
      );
    }

    if (isTablet) {
      return (
        <FlatList
          data={filteredGames}
          renderItem={() => null}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <GridLayout>
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPress={() => router.push(`/game/${game.id}`)}
                />
              ))}
            </GridLayout>
          }
        />
      );
    }

    return (
      <FlatList
        data={filteredGames}
        renderItem={({ item }) => (
          <GameCard game={item} onPress={() => router.push(`/game/${item.id}`)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={isTablet ? 24 : 20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search games..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={isTablet ? 24 : 20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {renderContent()}
    </View>
  );
}

/**
 * Individual game card component with thematic design
 */
function GameCard({
  game,
  onPress,
}: {
  game: Game;
  onPress: () => void;
}) {
  const iconSize = isTablet ? 18 : 14;
  const maxCategories = isTablet ? 4 : 3;
  const { colorScheme } = game.assets;

  return (
    <TouchableCard onPress={onPress} size="large" variant="elevated" style={styles.gameCard}>
      {/* Themed header with game-specific design */}
      <ThemedGameCard game={game} height={isTablet ? 180 : 140} />

      {/* Game info section */}
      <View style={[styles.cardContent, { backgroundColor: colorScheme.surface }]}>
        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={[styles.statBadge, { backgroundColor: colorScheme.primary + '20' }]}>
            <Ionicons name="people" size={iconSize} color={colorScheme.primary} />
            <Text style={[styles.statText, { color: colorScheme.primary }]}>
              {game.playerCount.min}-{game.playerCount.max}
            </Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: colorScheme.secondary + '20' }]}>
            <Ionicons name="time" size={iconSize} color={colorScheme.secondary} />
            <Text style={[styles.statText, { color: colorScheme.secondary }]}>
              {game.playTime.min}-{game.playTime.max}m
            </Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: colorScheme.accent + '20' }]}>
            <StarRating
              rating={game.complexity}
              size={iconSize}
              color={colorScheme.accent}
            />
          </View>
        </View>

        {/* Categories */}
        {game.categories.length > 0 && (
          <View style={styles.categories}>
            {game.categories.slice(0, maxCategories).map((category) => (
              <Text
                key={category}
                style={[styles.categoryText, { color: colorScheme.text + '80' }]}
              >
                {category}
              </Text>
            ))}
          </View>
        )}
      </View>
    </TouchableCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light.surface,
    margin: isTablet ? SPACING.lg : SPACING.md,
    paddingHorizontal: isTablet ? SPACING.md : SPACING.sm,
    minHeight: TOUCH_TARGETS.medium,
    borderRadius: 12,
    ...SHADOWS.small,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.light.text,
  },
  clearButton: {
    padding: SPACING.xs,
    minHeight: TOUCH_TARGETS.small,
    minWidth: TOUCH_TARGETS.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: isTablet ? SPACING.lg : SPACING.md,
    paddingBottom: SPACING.xl,
  },
  gameCard: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: 16,
  },
  cardContent: {
    padding: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: isTablet ? SPACING.sm : 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statText: {
    fontSize: isTablet ? 13 : 11,
    fontWeight: '600',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryText: {
    fontSize: isTablet ? 12 : 11,
    fontWeight: '500',
  },
});
