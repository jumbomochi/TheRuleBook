import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFilteredGames, useGames } from '../../hooks';
import { Game } from '../../types';
import { TouchableCard } from '../../components/common/TouchableCard';
import { GridLayout } from '../../components/common/GridLayout';
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
        <View style={styles.emptyContainer}>
          <Ionicons name="library-outline" size={isTablet ? 96 : 64} color="#ccc" />
          <Text style={styles.emptyText}>No games found</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery ? 'Try a different search term' : 'Add games to get started'}
          </Text>
        </View>
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
 * Individual game card component
 */
function GameCard({
  game,
  onPress,
}: {
  game: Game;
  onPress: () => void;
}) {
  const iconSize = isTablet ? 20 : 16;
  const maxCategories = isTablet ? 4 : 3;

  return (
    <TouchableCard onPress={onPress} size="large" variant="elevated">
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{game.name}</Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="people" size={iconSize} color="#666" />
          <Text style={styles.detailText}>
            {game.playerCount.min}-{game.playerCount.max} players
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={iconSize} color="#666" />
          <Text style={styles.detailText}>
            {game.playTime.min}-{game.playTime.max} min
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="bar-chart" size={iconSize} color="#666" />
          <Text style={styles.detailText}>Complexity: {game.complexity}/5</Text>
        </View>
      </View>

      {game.categories.length > 0 && (
        <View style={styles.categories}>
          {game.categories.slice(0, maxCategories).map((category) => (
            <View key={category} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      )}
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
  cardHeader: {
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '600',
    color: COLORS.light.text,
  },
  cardDetails: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    minHeight: TOUCH_TARGETS.small,
  },
  detailText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.light.textSecondary,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  categoryTag: {
    backgroundColor: '#007AFF15',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    minHeight: TOUCH_TARGETS.small,
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: TYPOGRAPHY.caption,
    color: '#007AFF',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isTablet ? 120 : 80,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '600',
    color: COLORS.light.textSecondary,
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.light.textSecondary,
    marginTop: SPACING.sm,
  },
});
