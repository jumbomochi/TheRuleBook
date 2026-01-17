import React from 'react';
import { View, ScrollView, StyleSheet, Text as RNText } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Card, Button, Text, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useGameLibrary } from '../../../hooks';
import { TouchableCard } from '../../../components/common/TouchableCard';
import { HeroImage } from '../../../components/common/HeroImage';
import { StarRating } from '../../../components/common/StarRating';
import { SPACING, TYPOGRAPHY, TOUCH_TARGETS, isTablet } from '../../../utils/responsive';
import { COLORS, BORDER_RADIUS } from '../../../utils/theme';

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

  const { colorScheme, boxArt, boxArtThumbnail } = game.assets;
  const heroImageSource = boxArt || boxArtThumbnail;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: game.name }} />

      <ScrollView style={styles.scrollView}>
        {/* Hero Section with Box Art */}
        {heroImageSource ? (
          <HeroImage
            source={heroImageSource}
            colorScheme={colorScheme}
            height={isTablet ? 320 : 220}
          >
            <RNText style={styles.heroTitle}>{game.name}</RNText>
            {game.publisher && (
              <RNText style={styles.heroSubtitle}>{game.publisher}</RNText>
            )}
          </HeroImage>
        ) : (
          <View style={[styles.heroPlaceholder, { backgroundColor: colorScheme.primary }]}>
            <RNText style={styles.heroTitle}>{game.name}</RNText>
            {game.publisher && (
              <RNText style={styles.heroSubtitle}>{game.publisher}</RNText>
            )}
          </View>
        )}

        {/* Visual Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colorScheme.primary }]}>
            <Ionicons name="people" size={isTablet ? 32 : 24} color="#FFFFFF" />
            <RNText style={styles.statValue}>
              {game.playerCount.min}-{game.playerCount.max}
            </RNText>
            <RNText style={styles.statLabel}>Players</RNText>
          </View>

          <View style={[styles.statCard, { backgroundColor: colorScheme.secondary }]}>
            <Ionicons name="time" size={isTablet ? 32 : 24} color="#FFFFFF" />
            <RNText style={styles.statValue}>
              {game.playTime.min}-{game.playTime.max}
            </RNText>
            <RNText style={styles.statLabel}>Minutes</RNText>
          </View>

          <View style={[styles.statCard, { backgroundColor: colorScheme.accent }]}>
            <StarRating
              rating={game.complexity}
              size={isTablet ? 20 : 16}
              color="#FFFFFF"
              emptyColor="rgba(255,255,255,0.3)"
            />
            <RNText style={styles.statValue}>{game.complexity}</RNText>
            <RNText style={styles.statLabel}>Complexity</RNText>
          </View>
        </View>

        {/* Categories */}
        {game.categories.length > 0 && (
          <View style={styles.categoriesSection}>
            {game.categories.map((category) => (
              <View
                key={category}
                style={[
                  styles.categoryChip,
                  { backgroundColor: `${colorScheme.accent}20`, borderColor: colorScheme.accent }
                ]}
              >
                <RNText style={[styles.categoryText, { color: colorScheme.accent }]}>
                  {category}
                </RNText>
              </View>
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <View
            style={[styles.actionCard, { borderLeftColor: colorScheme.primary, borderLeftWidth: 4 }]}
          >
            <TouchableCard
              onPress={() => router.push(`/game/${game.id}/setup`)}
              size="large"
              variant="elevated"
            >
              <View style={styles.actionContent}>
                <Ionicons name="play-circle" size={isTablet ? 48 : 40} color={colorScheme.primary} />
                <RNText style={styles.actionTitle}>Start New Game</RNText>
                <RNText style={styles.actionSubtitle}>Set up players and begin</RNText>
              </View>
            </TouchableCard>
          </View>

          <View
            style={[styles.actionCard, { borderLeftColor: colorScheme.secondary, borderLeftWidth: 4 }]}
          >
            <TouchableCard
              onPress={() => router.push(`/game/${game.id}/rules`)}
              size="large"
              variant="elevated"
            >
              <View style={styles.actionContent}>
                <Ionicons name="book" size={isTablet ? 48 : 40} color={colorScheme.secondary} />
                <RNText style={styles.actionTitle}>View Rules</RNText>
                <RNText style={styles.actionSubtitle}>Browse rules and FAQs</RNText>
              </View>
            </TouchableCard>
          </View>
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
  heroPlaceholder: {
    height: isTablet ? 320 : 220,
    justifyContent: 'flex-end',
    padding: SPACING.lg,
  },
  heroTitle: {
    fontSize: isTablet ? 36 : 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    fontSize: TYPOGRAPHY.subheading,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: isTablet ? SPACING.lg : SPACING.md,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.large,
    gap: SPACING.xs,
  },
  statValue: {
    fontSize: isTablet ? TYPOGRAPHY.heading : TYPOGRAPHY.subheading,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: TYPOGRAPHY.caption,
    color: '#FFFFFF',
    opacity: 0.9,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  categoriesSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    paddingHorizontal: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: SPACING.md,
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.medium,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },
  actionsContainer: {
    padding: isTablet ? SPACING.lg : SPACING.md,
    gap: SPACING.md,
  },
  actionCard: {
    marginBottom: 0,
    borderRadius: BORDER_RADIUS.large,
    overflow: 'hidden',
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
