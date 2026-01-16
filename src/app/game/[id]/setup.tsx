import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import {
  Button,
  TextInput,
  List,
  IconButton,
  Chip,
  Card,
  Text,
  useTheme,
  Divider,
} from 'react-native-paper';
import { useGameLibrary, useSession } from '../../../hooks';
import type { Player } from '../../../types';

const PLAYER_COLORS = [
  '#FF5252',
  '#448AFF',
  '#69F0AE',
  '#FFD740',
  '#E040FB',
  '#FF6E40',
];

export default function SetupScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { getGameById } = useGameLibrary();
  const { startSession } = useSession();
  const game = getGameById(id || '');

  const [players, setPlayers] = useState<Array<{ name: string; color: string }>>([
    { name: '', color: PLAYER_COLORS[0] },
  ]);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [enabledExpansions, setEnabledExpansions] = useState<Set<string>>(new Set());

  if (!game) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Game Not Found' }} />
        <Text>Game not found</Text>
      </View>
    );
  }

  const addPlayer = () => {
    if (players.length < game.playerCount.max) {
      const availableColors = PLAYER_COLORS.filter(
        (color) => !players.some((p) => p.color === color)
      );
      setPlayers([
        ...players,
        { name: '', color: availableColors[0] || PLAYER_COLORS[players.length % PLAYER_COLORS.length] },
      ]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > game.playerCount.min) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const updated = [...players];
    updated[index].name = name;
    setPlayers(updated);
  };

  const updatePlayerColor = (index: number, color: string) => {
    const updated = [...players];
    updated[index].color = color;
    setPlayers(updated);
  };

  const toggleExpansion = (expansionId: string) => {
    setEnabledExpansions((prev) => {
      const next = new Set(prev);
      if (next.has(expansionId)) {
        next.delete(expansionId);
      } else {
        next.add(expansionId);
      }
      return next;
    });
  };

  const canStartGame = () => {
    const playerCount = players.length;
    const validCount =
      playerCount >= game.playerCount.min && playerCount <= game.playerCount.max;
    const allNamed = players.every((p) => p.name.trim().length > 0);
    return validCount && allNamed;
  };

  const startGame = () => {
    if (!canStartGame()) return;

    const sessionPlayers: Player[] = players.map((p, index) => ({
      id: `player-${Date.now()}-${index}`,
      name: p.name,
      color: p.color,
    }));

    const sessionId = startSession(game.id, sessionPlayers);
    router.push(`/game/${game.id}/play?sessionId=${sessionId}`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Setup ${game.name}` }} />

      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Title
            title="Players"
            subtitle={`${game.playerCount.min}-${game.playerCount.max} players`}
            left={(props) => <List.Icon {...props} icon="account-group" />}
          />
          <Card.Content>
            {players.map((player, index) => (
              <View key={index} style={styles.playerRow}>
                <View style={styles.playerInput}>
                  <TextInput
                    label={`Player ${index + 1}`}
                    value={player.name}
                    onChangeText={(text) => updatePlayerName(index, text)}
                    style={styles.nameInput}
                    mode="outlined"
                  />
                  <View style={styles.colorPicker}>
                    {PLAYER_COLORS.map((color) => (
                      <IconButton
                        key={color}
                        icon={player.color === color ? 'check-circle' : 'circle'}
                        iconColor={color}
                        size={24}
                        onPress={() => updatePlayerColor(index, color)}
                        style={[
                          styles.colorButton,
                          player.color === color && styles.colorButtonSelected,
                        ]}
                      />
                    ))}
                  </View>
                </View>
                {players.length > game.playerCount.min && (
                  <IconButton
                    icon="close"
                    size={20}
                    onPress={() => removePlayer(index)}
                  />
                )}
              </View>
            ))}

            {players.length < game.playerCount.max && (
              <Button
                mode="outlined"
                icon="plus"
                onPress={addPlayer}
                style={styles.addButton}
              >
                Add Player
              </Button>
            )}
          </Card.Content>
        </Card>

        {game.variants && game.variants.length > 0 && (
          <Card style={styles.card}>
            <Card.Title
              title="Game Variants"
              left={(props) => <List.Icon {...props} icon="swap-horizontal" />}
            />
            <Card.Content>
              {game.variants.map((variant) => (
                <Chip
                  key={variant.id}
                  selected={selectedVariant === variant.id}
                  onPress={() =>
                    setSelectedVariant(
                      selectedVariant === variant.id ? null : variant.id
                    )
                  }
                  style={styles.chip}
                >
                  {variant.name}
                </Chip>
              ))}
            </Card.Content>
          </Card>
        )}

        {game.expansions && game.expansions.length > 0 && (
          <Card style={styles.card}>
            <Card.Title
              title="Expansions"
              left={(props) => <List.Icon {...props} icon="puzzle" />}
            />
            <Card.Content>
              {game.expansions.map((expansion) => (
                <Chip
                  key={expansion.id}
                  selected={enabledExpansions.has(expansion.id)}
                  onPress={() => toggleExpansion(expansion.id)}
                  style={styles.chip}
                >
                  {expansion.name}
                </Chip>
              ))}
            </Card.Content>
          </Card>
        )}

        <Card style={styles.card}>
          <Card.Title
            title="Game Info"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
          <Card.Content>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Play Time:</Text>
              <Text variant="bodyMedium">
                {game.playTime.min}-{game.playTime.max} minutes
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text variant="bodyMedium">Complexity:</Text>
              <Text variant="bodyMedium">
                {game.complexity}/5
              </Text>
            </View>
            {game.categories && game.categories.length > 0 && (
              <View style={styles.infoRow}>
                <Text variant="bodyMedium">Categories:</Text>
                <View style={styles.categories}>
                  {game.categories.map((cat) => (
                    <Chip key={cat} compact style={styles.categoryChip}>
                      {cat}
                    </Chip>
                  ))}
                </View>
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={startGame}
          disabled={!canStartGame()}
          style={styles.startButton}
          contentStyle={styles.startButtonContent}
        >
          Start Game
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerInput: {
    flex: 1,
  },
  nameInput: {
    marginBottom: 8,
  },
  colorPicker: {
    flexDirection: 'row',
    gap: 4,
  },
  colorButton: {
    margin: 0,
  },
  colorButtonSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  addButton: {
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  categoryChip: {
    height: 24,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.12)',
  },
  startButton: {
    borderRadius: 8,
  },
  startButtonContent: {
    paddingVertical: 8,
  },
});
