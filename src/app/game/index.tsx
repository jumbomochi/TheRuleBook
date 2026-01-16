import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Searchbar, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useGameLibrary } from '../../hooks/useGames';

export default function GameIndexScreen() {
  const router = useRouter();
  const { games } = useGameLibrary();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    games.forEach((game) => {
      game.categories.forEach((cat) => cats.add(cat));
    });
    return Array.from(cats);
  }, [games]);

  const filteredGames = React.useMemo(() => {
    return games.filter((game) => {
      const matchesSearch =
        searchQuery === '' ||
        game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === null || game.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  const handleGamePress = (gameId: string) => {
    router.push(`/game/${gameId}/rules`);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search games"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        <Chip
          selected={selectedCategory === null}
          onPress={() => setSelectedCategory(null)}
          style={styles.categoryChip}
        >
          All
        </Chip>
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryChip}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      <ScrollView style={styles.gameList}>
        {filteredGames.map((game) => (
          <Card
            key={game.id}
            style={styles.gameCard}
            onPress={() => handleGamePress(game.id)}
          >
            <Card.Content>
              <Text variant="titleLarge">{game.name}</Text>
              <View style={styles.gameInfo}>
                <Text variant="bodyMedium">
                  {game.playerCount.min}-{game.playerCount.max} players
                </Text>
                <Text variant="bodyMedium">•</Text>
                <Text variant="bodyMedium">
                  {game.playTime.min}-{game.playTime.max} min
                </Text>
                <Text variant="bodyMedium">•</Text>
                <Text variant="bodyMedium">
                  Complexity: {game.complexity}/5
                </Text>
              </View>
              <View style={styles.categories}>
                {game.categories.map((cat) => (
                  <Chip key={cat} compact style={styles.chip}>
                    {cat}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 16,
    marginBottom: 8,
  },
  categoryScroll: {
    flexGrow: 0,
    marginBottom: 8,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  gameList: {
    flex: 1,
    padding: 16,
  },
  gameCard: {
    marginBottom: 16,
  },
  gameInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  chip: {
    alignSelf: 'flex-start',
  },
});
