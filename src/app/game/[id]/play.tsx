import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import {
  Button,
  Card,
  IconButton,
  Text,
  useTheme,
  DataTable,
  FAB,
  Portal,
  Modal,
  TextInput,
  Chip,
  SegmentedButtons,
} from 'react-native-paper';
import {
  useGameLibrary,
  useCurrentSession,
  useScoring,
  useTurnTracking,
  useResources,
  usePhases,
} from '../../../hooks';
import { SplitView } from '../../../components/common/SplitView';
import { SPACING, TYPOGRAPHY, TOUCH_TARGETS, isTablet } from '../../../utils/responsive';

export default function PlayScreen() {
  const { id, sessionId } = useLocalSearchParams<{ id: string; sessionId: string }>();
  const theme = useTheme();
  const { getGameById } = useGameLibrary();
  const session = useCurrentSession();
  const game = getGameById(id || '');

  const { addScore, getPlayerTotal } = useScoring();
  const { nextTurn, previousTurn, setCurrentPlayer } = useTurnTracking();
  const { updateResource, getPlayerResource } = useResources();
  const { nextPhase, previousPhase } = usePhases();

  const [activeTab, setActiveTab] = useState('scoring');
  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [scoreInput, setScoreInput] = useState('');
  const [scoreCategory, setScoreCategory] = useState('');

  if (!game || !session) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Session Not Found' }} />
        <Text>Session not found</Text>
      </View>
    );
  }

  const currentPlayer = session.players[session.currentPlayerIndex];
  const currentPhase = session.currentPhase
    ? game.phases?.find((p) => p.id === session.currentPhase)
    : null;

  const openScoreModal = (playerId: string) => {
    setSelectedPlayerId(playerId);
    setScoreInput('');
    setScoreCategory(game.scoring.categories?.[0]?.id || 'main');
    setScoreModalVisible(true);
  };

  const submitScore = () => {
    if (!selectedPlayerId || !scoreInput) return;
    const points = parseInt(scoreInput, 10);
    if (isNaN(points)) return;

    addScore(selectedPlayerId, points, scoreCategory);
    setScoreModalVisible(false);
    setSelectedPlayerId(null);
    setScoreInput('');
  };

  const updatePlayerResource = (playerId: string, resourceId: string, delta: number) => {
    const current = getPlayerResource(playerId, resourceId);
    updateResource(playerId, resourceId, current + delta);
  };

  const renderTurnInfo = () => (
    <Card style={styles.turnCard}>
      <Card.Content>
        <View style={styles.turnInfo}>
          <View style={styles.turnColumn}>
            <Text variant="labelMedium">Turn {session.turnNumber}</Text>
            <Text variant="titleLarge" style={{ color: currentPlayer.color }}>
              {currentPlayer.name}
            </Text>
          </View>
          {currentPhase && (
            <View style={styles.turnColumn}>
              <Text variant="labelMedium">Phase</Text>
              <Text variant="titleMedium">{currentPhase.name}</Text>
            </View>
          )}
          <View style={styles.turnButtons}>
            <IconButton
              icon="chevron-left"
              size={isTablet ? 28 : 24}
              onPress={previousTurn}
              disabled={session.turnNumber === 1}
            />
            <IconButton
              icon="chevron-right"
              size={isTablet ? 28 : 24}
              onPress={nextTurn}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderScoring = () => (
    <Card style={styles.card}>
      <Card.Title title="Scores" />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Player</DataTable.Title>
          {game.scoring.categories?.map((cat) => (
            <DataTable.Title key={cat.id} numeric>
              {cat.name}
            </DataTable.Title>
          ))}
          <DataTable.Title numeric>Total</DataTable.Title>
          <DataTable.Title> </DataTable.Title>
        </DataTable.Header>

        {session.players.map((player) => {
          const total = getPlayerTotal(player.id);
          const scores = session.scores[player.id] || [];

          return (
            <DataTable.Row
              key={player.id}
              style={
                player.id === currentPlayer.id && styles.currentPlayerRow
              }
            >
              <DataTable.Cell>
                <View style={styles.playerCell}>
                  <View
                    style={[styles.colorDot, { backgroundColor: player.color }]}
                  />
                  <Text>{player.name}</Text>
                </View>
              </DataTable.Cell>
              {game.scoring.categories?.map((cat) => {
                const categoryScores = scores.filter(
                  (s) => s.category === cat.id
                );
                const categoryTotal = categoryScores.reduce(
                  (sum, s) => sum + s.points,
                  0
                );
                return (
                  <DataTable.Cell key={cat.id} numeric>
                    {categoryTotal}
                  </DataTable.Cell>
                );
              })}
              <DataTable.Cell numeric>
                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                  {total}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="plus"
                  size={isTablet ? 24 : 20}
                  onPress={() => openScoreModal(player.id)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </Card>
  );

  const renderPlayers = () => (
    <View>
      {session.players.map((player, index) => (
        <Card
          key={player.id}
          style={[
            styles.card,
            index === session.currentPlayerIndex && styles.currentPlayerCard,
          ]}
          onPress={() => setCurrentPlayer(index)}
        >
          <Card.Title
            title={player.name}
            titleStyle={{ color: player.color }}
            subtitle={
              index === session.currentPlayerIndex
                ? 'Current Turn'
                : `Player ${index + 1}`
            }
            left={(props) => (
              <View
                style={[
                  styles.colorDot,
                  styles.largeDot,
                  { backgroundColor: player.color },
                ]}
              />
            )}
            right={(props) =>
              index === session.currentPlayerIndex ? (
                <Chip>Active</Chip>
              ) : null
            }
          />
        </Card>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: game.name,
          headerRight: () => (
            <IconButton
              icon="pause"
              onPress={() => router.push('/(tabs)/play')}
            />
          ),
        }}
      />

      {renderTurnInfo()}

      {isTablet ? (
        <SplitView
          left={
            <ScrollView style={styles.scrollView}>
              {renderScoring()}
            </ScrollView>
          }
          right={
            <ScrollView style={styles.scrollView}>
              {renderPlayers()}
            </ScrollView>
          }
          leftWeight={0.6}
          style={styles.splitContainer}
        />
      ) : (
        <>
          <SegmentedButtons
            value={activeTab}
            onValueChange={setActiveTab}
            buttons={[
              { value: 'scoring', label: 'Scores', icon: 'trophy' },
              ...(game.resources && game.resources.length > 0
                ? [{ value: 'resources', label: 'Resources', icon: 'diamond-stone' }]
                : []),
              { value: 'players', label: 'Players', icon: 'account-group' },
            ]}
            style={styles.tabs}
          />

              <ScrollView style={styles.scrollView}>
            {activeTab === 'scoring' && renderScoring()}

            {activeTab === 'resources' && game.resources && (
              <View>
                {session.players.map((player) => (
                  <Card key={player.id} style={styles.card}>
                    <Card.Title
                      title={player.name}
                      titleStyle={{ color: player.color }}
                      left={(props) => (
                        <View
                          style={[
                            styles.colorDot,
                            styles.largeDot,
                            { backgroundColor: player.color },
                          ]}
                        />
                      )}
                    />
                    <Card.Content>
                      {game.resources!.map((resource) => {
                        const amount = getPlayerResource(player.id, resource.id);
                        return (
                          <View key={resource.id} style={styles.resourceRow}>
                            <Text variant="bodyLarge">{resource.name}</Text>
                            <View style={styles.resourceControls}>
                              <IconButton
                                icon="minus"
                                size={isTablet ? 24 : 20}
                                onPress={() =>
                                  updatePlayerResource(player.id, resource.id, -1)
                                }
                                disabled={amount <= (resource.min || 0)}
                              />
                              <Text variant="titleLarge" style={styles.resourceValue}>
                                {amount}
                              </Text>
                              <IconButton
                                icon="plus"
                                size={isTablet ? 24 : 20}
                                onPress={() =>
                                  updatePlayerResource(player.id, resource.id, 1)
                                }
                                disabled={
                                  resource.max !== undefined && amount >= resource.max
                                }
                              />
                            </View>
                          </View>
                        );
                      })}
                    </Card.Content>
                  </Card>
                ))}
              </View>
            )}

            {activeTab === 'players' && renderPlayers()}
          </ScrollView>
        </>
      )}

      {/* Score Input Modal */}
      <Portal>
        <Modal
          visible={scoreModalVisible}
          onDismiss={() => setScoreModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Add Score
          </Text>
          {game.scoring.categories && game.scoring.categories.length > 1 && (
            <View style={styles.categorySelector}>
              {game.scoring.categories.map((cat) => (
                <Chip
                  key={cat.id}
                  selected={scoreCategory === cat.id}
                  onPress={() => setScoreCategory(cat.id)}
                  style={styles.chip}
                >
                  {cat.name}
                </Chip>
              ))}
            </View>
          )}
          <TextInput
            label="Points"
            value={scoreInput}
            onChangeText={setScoreInput}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <View style={styles.modalButtons}>
            <Button onPress={() => setScoreModalVisible(false)}>Cancel</Button>
            <Button mode="contained" onPress={submitScore}>
              Add
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Phase Navigation FAB (if game has phases) */}
      {game.phases && game.phases.length > 0 && (
        <FAB
          icon="swap-horizontal"
          style={styles.fab}
          onPress={nextPhase}
          label={currentPhase?.name || 'Next Phase'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splitContainer: {
    flex: 1,
  },
  turnCard: {
    margin: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: SPACING.sm,
  },
  turnInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: TOUCH_TARGETS.medium,
  },
  turnColumn: {
    gap: SPACING.xs,
  },
  turnButtons: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  tabs: {
    margin: isTablet ? SPACING.lg : SPACING.md,
    marginTop: SPACING.sm,
    minHeight: TOUCH_TARGETS.large,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: SPACING.sm,
  },
  currentPlayerCard: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  currentPlayerRow: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  playerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    minHeight: TOUCH_TARGETS.small,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  largeDot: {
    width: isTablet ? 32 : 24,
    height: isTablet ? 32 : 24,
    borderRadius: isTablet ? 16 : 12,
  },
  resourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.sm,
    minHeight: TOUCH_TARGETS.medium,
  },
  resourceControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  resourceValue: {
    minWidth: isTablet ? 60 : 40,
    textAlign: 'center',
    fontSize: isTablet ? TYPOGRAPHY.heading : TYPOGRAPHY.subheading,
  },
  modal: {
    backgroundColor: 'white',
    padding: isTablet ? SPACING.xl : SPACING.lg,
    margin: isTablet ? SPACING.xxl : SPACING.xl,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: SPACING.md,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  chip: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    minHeight: TOUCH_TARGETS.small,
  },
  input: {
    marginBottom: SPACING.md,
    minHeight: TOUCH_TARGETS.large,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  fab: {
    position: 'absolute',
    margin: SPACING.md,
    right: 0,
    bottom: 0,
    minHeight: TOUCH_TARGETS.large,
    minWidth: TOUCH_TARGETS.large,
  },
});
