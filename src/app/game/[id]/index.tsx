import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Card, Button, Text, Chip, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useGameLibrary } from '../../../hooks';
import { TouchableCard } from '../../../components/common/TouchableCard';
import { SPACING, TYPOGRAPHY, TOUCH_TARGETS, isTablet } from '../../../utils/responsive';
import { COLORS } from '../../../utils/theme';

/**
 * Game Detail Screen - Overview and navigation hub for a specific game
 */
export default function GameDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getGameById } = useGameLibrary();
  const game = getGameById(id || '');

  if (!game) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Game Not Found' }} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={COLORS.light.error} />
          <Text style={styles.errorText}>Game not found</Text>
          <Button mode="outlined" onPress={() => router.back()}>
            Go Back
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: game.name }} />

      <ScrollView style={styles.scrollView}>
        {/* Game Info Card */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.gameName}>
              {game.name}
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Ionicons name="people" size={isTablet ? 24 : 20} color={COLORS.light.primary} />
                <Text style={styles.statText}>
                  {game.playerCount.min}-{game.playerCount.max} players
                </Text>
              </View>
              <View style={styles.stat}>
                <Ionicons name="time" size={isTablet ? 24 : 20} color={COLORS.light.primary} />
                <Text style={styles.statText}>
                  {game.playTime.min}-{game.playTime.max} min
                </Text>
              </View>
              <View style={styles.stat}>
                <Ionicons name="bar-chart" size={isTablet ? 24 : 20} color={COLORS.light.primary} />
                <Text style={styles.statText}>Complexity: {game.complexity}/5</Text>
              </View>
            </View>

            {game.categories.length > 0 && (
              <View style={styles.categories}>
                {game.categories.map((category) => (
                  <Chip key={category} style={styles.categoryChip}>
                    {category}
                  </Chip>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableCard
            onPress={() => router.push(`/game/${game.id}/setup`)}
            size="large"
            variant="elevated"
            style={styles.actionCard}
          >
            <View style={styles.actionContent}>
              <Ionicons name="play-circle" size={isTablet ? 48 : 40} color={COLORS.light.primary} />
              <Text style={styles.actionTitle}>Start New Game</Text>
              <Text style={styles.actionSubtitle}>Set up players and begin</Text>
            </View>
          </TouchableCard>

          <TouchableCard
            onPress={() => router.push(`/game/${game.id}/rules`)}
            size="large"
            variant="elevated"
            style={styles.actionCard}
          >
            <View style={styles.actionContent}>
              <Ionicons name="book" size={isTablet ? 48 : 40} color={COLORS.light.secondary} />
              <Text style={styles.actionTitle}>View Rules</Text>
              <Text style={styles.actionSubtitle}>Browse rules and FAQs</Text>
            </View>
          </TouchableCard>
        </View>

        {/* Game Features */}
        <Card style={styles.featuresCard}>
          <Card.Title title="Game Features" />
          <Card.Content>
            {game.scoring && (
              <View style={styles.featureRow}>
                <Ionicons name="trophy" size={isTablet ? 24 : 20} color="#FFA000" />
                <View style={styles.featureText}>
                  <Text variant="titleSmall">Scoring System</Text>
                  <Text variant="bodySmall" style={styles.featureDescription}>
                    {game.scoring.categories?.length || 1} scoring categories
                  </Text>
                </View>
              </View>
            )}

            {game.resources && game.resources.length > 0 && (
              <View style={styles.featureRow}>
                <Ionicons name="diamond" size={isTablet ? 24 : 20} color="#00ACC1" />
                <View style={styles.featureText}>
                  <Text variant="titleSmall">Resource Tracking</Text>
                  <Text variant="bodySmall" style={styles.featureDescription}>
                    {game.resources.length} resource types
                  </Text>
                </View>
              </View>
            )}

            {game.phases && game.phases.length > 0 && (
              <View style={styles.featureRow}>
                <Ionicons name="swap-horizontal" size={isTablet ? 24 : 20} color="#7B1FA2" />
                <View style={styles.featureText}>
                  <Text variant="titleSmall">Phase Tracking</Text>
                  <Text variant="bodySmall" style={styles.featureDescription}>
                    {game.phases.length} game phases
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.featureRow}>
              <Ionicons name="help-circle" size={isTablet ? 24 : 20} color="#D32F2F" />
              <View style={styles.featureText}>
                <Text variant="titleSmall">FAQ Support</Text>
                <Text variant="bodySmall" style={styles.featureDescription}>
                  {game.faq?.length || 0} frequently asked questions
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  errorText: {
    fontSize: TYPOGRAPHY.heading,
    color: COLORS.light.error,
  },
  infoCard: {
    margin: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: SPACING.sm,
  },
  gameName: {
    marginBottom: SPACING.md,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SPACING.md,
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.light.textSecondary,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginTop: SPACING.md,
  },
  categoryChip: {
    backgroundColor: COLORS.light.surfaceVariant,
  },
  actionsContainer: {
    padding: isTablet ? SPACING.lg : SPACING.md,
    gap: SPACING.md,
  },
  actionCard: {
    marginBottom: 0,
  },
  actionContent: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  actionTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '600',
    color: COLORS.light.text,
  },
  actionSubtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.light.textSecondary,
  },
  featuresCard: {
    margin: isTablet ? SPACING.lg : SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginVertical: SPACING.sm,
    minHeight: TOUCH_TARGETS.medium,
  },
  featureText: {
    flex: 1,
    gap: SPACING.xs,
  },
  featureDescription: {
    color: COLORS.light.textSecondary,
  },
});
