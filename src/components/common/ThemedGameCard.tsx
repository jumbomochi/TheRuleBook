import React, { useMemo } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Game } from '../../types';
import { isTablet, SPACING } from '../../utils/responsive';
import {
  getGemAsset,
  getPlanetAsset,
  GemColor,
  PlanetType,
  MARS_PLANET_TYPES,
  BOARD_GAME_ICONS,
} from '../../utils/assets';

interface ThemedGameCardProps {
  game: Game;
  height?: number;
}

interface GameDesign {
  pattern: 'gems' | 'planets' | 'trains' | 'birds' | 'default';
  tagline: string;
  iconFallback: string;
}

// Game-specific design configurations
const gameDesigns: Record<string, GameDesign> = {
  splendor: {
    pattern: 'gems',
    tagline: 'Renaissance Gem Trading',
    iconFallback: 'diamond-stone',
  },
  wingspan: {
    pattern: 'birds',
    tagline: 'Bird Collection & Engine Building',
    iconFallback: 'bird',
  },
  'terraforming-mars': {
    pattern: 'planets',
    tagline: 'Transform the Red Planet',
    iconFallback: 'planet',
  },
  'ticket-to-ride': {
    pattern: 'trains',
    tagline: 'Cross-Country Train Adventure',
    iconFallback: 'train',
  },
};

// Splendor gem colors matching the game
const SPLENDOR_GEM_COLORS: GemColor[] = ['diamond', 'sapphire', 'emerald', 'ruby', 'onyx', 'topaz'];

// Mars-like planets for Terraforming Mars
const TM_PLANET_TYPES: PlanetType[] = ['Arid', 'Barren', 'Cratered', 'Rocky', 'RedGiant'];

export function ThemedGameCard({ game, height = isTablet ? 200 : 160 }: ThemedGameCardProps) {
  const design = gameDesigns[game.id] || getDefaultDesign(game);
  const { colorScheme, boxArtThumbnail, cardCover } = game.assets;

  // Memoize the pattern elements to avoid re-rendering
  const patternElements = useMemo(() => {
    return renderPattern(design, colorScheme, game.id);
  }, [game.id]);

  // If we have a box art thumbnail, use it as background
  if (boxArtThumbnail) {
    return (
      <ImageBackground
        source={{ uri: boxArtThumbnail }}
        style={[styles.container, { height }]}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.gradient}
        >
          <View style={styles.contentBottom}>
            <Text style={styles.tagline}>{cardCover?.tagline || design.tagline}</Text>
            <Text style={styles.title}>{game.name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }

  // Otherwise, render a themed pattern design with actual assets
  return (
    <View style={[styles.container, { height, backgroundColor: colorScheme.background }]}>
      {/* Pattern overlay with actual images */}
      <View style={styles.patternContainer}>
        {patternElements}
      </View>

      {/* Gradient and content */}
      <LinearGradient
        colors={[
          colorScheme.primary + '20',
          colorScheme.background + 'D0',
          colorScheme.background,
        ]}
        locations={[0, 0.4, 1]}
        style={styles.gradient}
      >
        {/* Decorative accent bar */}
        <View style={[styles.accentBar, { backgroundColor: colorScheme.accent }]} />

        {/* Featured asset in top right */}
        <View style={styles.featuredAsset}>
          {renderFeaturedAsset(design, colorScheme)}
        </View>

        <View style={styles.contentBottom}>
          <Text style={[styles.tagline, { color: colorScheme.secondary }]}>
            {cardCover?.tagline || design.tagline}
          </Text>
          <Text style={[styles.title, { color: colorScheme.text }]}>{game.name}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

function renderFeaturedAsset(design: GameDesign, colorScheme: any) {
  const size = isTablet ? 72 : 56;

  switch (design.pattern) {
    case 'gems':
      return (
        <Image
          source={getGemAsset('ruby', 1)}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      );
    case 'planets':
      return (
        <Image
          source={getPlanetAsset('Arid', 1)}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      );
    case 'trains':
      return (
        <MaterialCommunityIcons
          name="train"
          size={size}
          color={colorScheme.secondary + '80'}
        />
      );
    case 'birds':
      return (
        <MaterialCommunityIcons
          name="bird"
          size={size}
          color={colorScheme.secondary + '80'}
        />
      );
    default:
      return (
        <Image
          source={BOARD_GAME_ICONS.dice}
          style={{ width: size, height: size, opacity: 0.6 }}
          resizeMode="contain"
        />
      );
  }
}

function renderPattern(design: GameDesign, colorScheme: any, gameId: string) {
  const elements: React.ReactNode[] = [];
  const numElements = isTablet ? 10 : 7;

  switch (design.pattern) {
    case 'gems':
      // Render actual gem images for Splendor
      for (let i = 0; i < numElements; i++) {
        const gemColor = SPLENDOR_GEM_COLORS[i % SPLENDOR_GEM_COLORS.length];
        const variation = (i % 10) + 1;
        const size = isTablet ? 36 + Math.random() * 24 : 28 + Math.random() * 20;
        const rotation = Math.random() * 40 - 20;
        const top = 5 + Math.random() * 50;
        const left = 5 + (i / numElements) * 85;

        elements.push(
          <View
            key={i}
            style={[
              styles.patternElement,
              {
                top: `${top}%`,
                left: `${left}%`,
                transform: [{ rotate: `${rotation}deg` }],
                opacity: 0.7 + Math.random() * 0.3,
              },
            ]}
          >
            <Image
              source={getGemAsset(gemColor, variation)}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          </View>
        );
      }
      break;

    case 'planets':
      // Render actual planet images for Terraforming Mars
      for (let i = 0; i < Math.min(numElements, 5); i++) {
        const planetType = TM_PLANET_TYPES[i % TM_PLANET_TYPES.length];
        const variation = (i % 5) + 1;
        const size = isTablet ? 48 + Math.random() * 32 : 36 + Math.random() * 24;
        const top = 5 + Math.random() * 45;
        const left = 8 + (i / 5) * 80;

        elements.push(
          <View
            key={i}
            style={[
              styles.patternElement,
              {
                top: `${top}%`,
                left: `${left}%`,
                opacity: 0.6 + Math.random() * 0.4,
              },
            ]}
          >
            <Image
              source={getPlanetAsset(planetType, variation)}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          </View>
        );
      }
      break;

    case 'trains':
      // Use train icons for Ticket to Ride
      const trainColors = ['#1E88E5', '#43A047', '#E53935', '#FDD835', '#8E24AA'];
      for (let i = 0; i < numElements; i++) {
        const color = trainColors[i % trainColors.length];
        const size = isTablet ? 28 + Math.random() * 16 : 22 + Math.random() * 12;
        const rotation = Math.random() * 30 - 15;
        const top = 10 + Math.random() * 50;
        const left = 5 + (i / numElements) * 85;

        elements.push(
          <View
            key={i}
            style={[
              styles.patternElement,
              {
                top: `${top}%`,
                left: `${left}%`,
                transform: [{ rotate: `${rotation}deg` }],
                opacity: 0.4 + Math.random() * 0.3,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={i % 2 === 0 ? 'train-car' : 'train'}
              size={size}
              color={color}
            />
          </View>
        );
      }
      break;

    case 'birds':
      // Use bird icons for Wingspan
      const birdColors = ['#228B22', '#8B4513', '#87CEEB', '#4B0082', '#FF6B35'];
      for (let i = 0; i < numElements; i++) {
        const color = birdColors[i % birdColors.length];
        const size = isTablet ? 26 + Math.random() * 18 : 20 + Math.random() * 14;
        const rotation = Math.random() * 20 - 10;
        const top = 8 + Math.random() * 55;
        const left = 5 + (i / numElements) * 85;

        elements.push(
          <View
            key={i}
            style={[
              styles.patternElement,
              {
                top: `${top}%`,
                left: `${left}%`,
                transform: [{ rotate: `${rotation}deg` }, { scaleX: i % 2 === 0 ? 1 : -1 }],
                opacity: 0.35 + Math.random() * 0.25,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="bird"
              size={size}
              color={color}
            />
          </View>
        );
      }
      break;

    default:
      // Default pattern with board game icons
      for (let i = 0; i < numElements; i++) {
        const icons = ['dice', 'cards-playing-outline', 'chess-pawn', 'puzzle-outline'];
        const icon = icons[i % icons.length];
        const size = isTablet ? 24 + Math.random() * 16 : 20 + Math.random() * 12;
        const rotation = Math.random() * 360;
        const top = Math.random() * 60;
        const left = 10 + (i / numElements) * 80;

        elements.push(
          <View
            key={i}
            style={[
              styles.patternElement,
              {
                top: `${top}%`,
                left: `${left}%`,
                transform: [{ rotate: `${rotation}deg` }],
                opacity: 0.2 + Math.random() * 0.15,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={icon as any}
              size={size}
              color={colorScheme.primary}
            />
          </View>
        );
      }
  }

  return elements;
}

function getDefaultDesign(game: Game): GameDesign {
  return {
    pattern: 'default',
    tagline: game.categories[0] || 'Board Game',
    iconFallback: 'dice-multiple-outline',
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  patternContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  patternElement: {
    position: 'absolute',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: SPACING.md,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  featuredAsset: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
  },
  contentBottom: {
    marginTop: 'auto',
  },
  tagline: {
    fontSize: isTablet ? 13 : 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: isTablet ? 28 : 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
