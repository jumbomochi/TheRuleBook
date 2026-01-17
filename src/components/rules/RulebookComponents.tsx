import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING, isTablet } from '../../utils/responsive';
import type { ColorPalette } from '../../types';
import {
  getGemAsset,
  getPlanetAsset,
  GemColor,
  PlanetType,
  SPLENDOR_GEMS,
} from '../../utils/assets';

interface RulebookSectionHeaderProps {
  title: string;
  colorScheme: ColorPalette;
  icon?: string;
}

/**
 * Stylized section header like "GAME OVERVIEW" in rulebooks
 * All caps, spaced letters, with decorative underline
 */
export function RulebookSectionHeader({ title, colorScheme, icon }: RulebookSectionHeaderProps) {
  return (
    <View style={styles.sectionHeaderContainer}>
      <View style={[styles.sectionHeaderLine, { backgroundColor: colorScheme.primary }]} />
      <View style={styles.sectionHeaderContent}>
        {icon && (
          <MaterialCommunityIcons
            name={icon as any}
            size={isTablet ? 28 : 24}
            color={colorScheme.primary}
            style={styles.sectionHeaderIcon}
          />
        )}
        <Text style={[styles.sectionHeaderText, { color: colorScheme.primary }]}>
          {title.toUpperCase().split('').join(' ')}
        </Text>
      </View>
      <View style={[styles.sectionHeaderLine, { backgroundColor: colorScheme.primary }]} />
    </View>
  );
}

interface SidebarBoxProps {
  title: string;
  children: React.ReactNode;
  colorScheme: ColorPalette;
  icon?: string;
  variant?: 'info' | 'tip' | 'warning' | 'example';
}

/**
 * Sidebar information box like the "A Terraformed Mars" box in the rulebook
 */
export function SidebarBox({ title, children, colorScheme, icon, variant = 'info' }: SidebarBoxProps) {
  const variantConfig = {
    info: { bg: colorScheme.primary + '15', border: colorScheme.primary, iconName: 'information' },
    tip: { bg: colorScheme.secondary + '15', border: colorScheme.secondary, iconName: 'lightbulb-on' },
    warning: { bg: colorScheme.accent + '15', border: colorScheme.accent, iconName: 'alert' },
    example: { bg: colorScheme.surface, border: colorScheme.text + '40', iconName: 'text-box-outline' },
  };

  const config = variantConfig[variant];

  return (
    <View style={[styles.sidebarBox, { backgroundColor: config.bg, borderColor: config.border }]}>
      <View style={styles.sidebarHeader}>
        <MaterialCommunityIcons
          name={(icon || config.iconName) as any}
          size={isTablet ? 20 : 18}
          color={config.border}
        />
        <Text style={[styles.sidebarTitle, { color: config.border }]}>
          {title}
        </Text>
      </View>
      <View style={styles.sidebarContent}>
        {children}
      </View>
    </View>
  );
}

interface RulebookParagraphProps {
  children: string;
  colorScheme: ColorPalette;
  style?: TextStyle;
}

/**
 * Styled paragraph text matching rulebook typography
 */
export function RulebookParagraph({ children, colorScheme, style }: RulebookParagraphProps) {
  return (
    <Text style={[styles.paragraphText, { color: colorScheme.text }, style]}>
      {children}
    </Text>
  );
}

interface BulletListProps {
  items: string[];
  colorScheme: ColorPalette;
  bulletIcon?: string;
  numbered?: boolean;
}

/**
 * Styled bullet or numbered list
 */
export function BulletList({ items, colorScheme, bulletIcon, numbered }: BulletListProps) {
  return (
    <View style={styles.bulletList}>
      {items.map((item, index) => (
        <View key={index} style={styles.bulletItem}>
          {numbered ? (
            <View style={[styles.numberBullet, { backgroundColor: colorScheme.primary }]}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
          ) : bulletIcon ? (
            <MaterialCommunityIcons
              name={bulletIcon as any}
              size={isTablet ? 18 : 16}
              color={colorScheme.secondary}
              style={styles.bulletIcon}
            />
          ) : (
            <View style={[styles.bulletDot, { backgroundColor: colorScheme.secondary }]} />
          )}
          <Text style={[styles.bulletText, { color: colorScheme.text }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

interface KeyTermProps {
  term: string;
  definition: string;
  colorScheme: ColorPalette;
  icon?: string;
}

/**
 * Key term highlight like bold terms in rulebooks
 */
export function KeyTerm({ term, definition, colorScheme, icon }: KeyTermProps) {
  return (
    <View style={styles.keyTermContainer}>
      {icon && (
        <MaterialCommunityIcons
          name={icon as any}
          size={isTablet ? 24 : 20}
          color={colorScheme.primary}
          style={styles.keyTermIcon}
        />
      )}
      <View style={styles.keyTermContent}>
        <Text style={[styles.keyTermTitle, { color: colorScheme.primary }]}>{term}:</Text>
        <Text style={[styles.keyTermDefinition, { color: colorScheme.text }]}> {definition}</Text>
      </View>
    </View>
  );
}

interface PageDividerProps {
  colorScheme: ColorPalette;
  pageNumber?: number;
}

/**
 * Decorative page divider with optional page number
 */
export function PageDivider({ colorScheme, pageNumber }: PageDividerProps) {
  return (
    <View style={styles.pageDividerContainer}>
      <View style={[styles.pageDividerLine, { backgroundColor: colorScheme.surface }]} />
      {pageNumber && (
        <View style={[styles.pageNumberBox, { backgroundColor: colorScheme.primary }]}>
          <Text style={styles.pageNumberText}>{pageNumber}</Text>
        </View>
      )}
      <View style={[styles.pageDividerLine, { backgroundColor: colorScheme.surface }]} />
    </View>
  );
}

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
  colorScheme: ColorPalette;
}

/**
 * Styled quote block for flavor text
 */
export function QuoteBlock({ quote, attribution, colorScheme }: QuoteBlockProps) {
  return (
    <View style={[styles.quoteBlock, { borderLeftColor: colorScheme.accent }]}>
      <Text style={[styles.quoteText, { color: colorScheme.text + 'CC' }]}>"{quote}"</Text>
      {attribution && (
        <Text style={[styles.quoteAttribution, { color: colorScheme.textSecondary }]}>
          — {attribution}
        </Text>
      )}
    </View>
  );
}

interface IconGridProps {
  items: Array<{ icon: string; label: string; description?: string }>;
  colorScheme: ColorPalette;
  columns?: number;
}

/**
 * Grid of icons with labels, like resource symbols in rulebooks
 */
export function IconGrid({ items, colorScheme, columns = 3 }: IconGridProps) {
  return (
    <View style={[styles.iconGrid, { flexWrap: 'wrap' }]}>
      {items.map((item, index) => (
        <View
          key={index}
          style={[styles.iconGridItem, { width: `${100 / columns}%` }]}
        >
          <View style={[styles.iconGridCircle, { backgroundColor: colorScheme.primary + '20' }]}>
            <MaterialCommunityIcons
              name={item.icon as any}
              size={isTablet ? 28 : 24}
              color={colorScheme.primary}
            />
          </View>
          <Text style={[styles.iconGridLabel, { color: colorScheme.text }]}>{item.label}</Text>
          {item.description && (
            <Text style={[styles.iconGridDesc, { color: colorScheme.textSecondary }]}>
              {item.description}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

interface RulebookHeaderProps {
  gameName: string;
  sectionTitle: string;
  colorScheme: ColorPalette;
  backgroundPattern?: 'mars' | 'gems' | 'birds' | 'trains';
}

/**
 * Full-width header like rulebook page headers
 */
export function RulebookHeader({ gameName, sectionTitle, colorScheme, backgroundPattern }: RulebookHeaderProps) {
  return (
    <LinearGradient
      colors={[colorScheme.primary, colorScheme.primary + 'CC']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.rulebookHeader}
    >
      {/* Decorative pattern overlay with actual images for gems/planets */}
      <View style={styles.headerPatternOverlay}>
        {backgroundPattern === 'gems' ? (
          // Render actual gem images for Splendor
          <>
            {(['ruby', 'sapphire', 'emerald', 'diamond', 'onyx', 'topaz'] as GemColor[]).map((color, i) => (
              <Image
                key={i}
                source={getGemAsset(color, (i % 5) + 1)}
                style={{
                  position: 'absolute',
                  width: isTablet ? 48 : 36,
                  height: isTablet ? 48 : 36,
                  left: `${(i * 18) % 95}%`,
                  top: `${15 + (i * 30) % 60}%`,
                  opacity: 0.25,
                  transform: [{ rotate: `${i * 15}deg` }],
                }}
                resizeMode="contain"
              />
            ))}
          </>
        ) : backgroundPattern === 'mars' ? (
          // Render actual planet images for Terraforming Mars
          <>
            {(['Arid', 'Barren', 'Cratered', 'Rocky', 'RedGiant'] as PlanetType[]).map((type, i) => (
              <Image
                key={i}
                source={getPlanetAsset(type, (i % 5) + 1)}
                style={{
                  position: 'absolute',
                  width: isTablet ? 56 : 44,
                  height: isTablet ? 56 : 44,
                  left: `${5 + (i * 22) % 90}%`,
                  top: `${10 + (i * 25) % 55}%`,
                  opacity: 0.2,
                }}
                resizeMode="contain"
              />
            ))}
          </>
        ) : (
          // Fallback to icons for other patterns
          [...Array(8)].map((_, i) => (
            <MaterialCommunityIcons
              key={i}
              name={getPatternIcon(backgroundPattern) as any}
              size={40}
              color="rgba(255,255,255,0.08)"
              style={{
                position: 'absolute',
                left: `${(i * 15) % 100}%`,
                top: `${(i * 25) % 100}%`,
                transform: [{ rotate: `${i * 45}deg` }],
              }}
            />
          ))
        )}
      </View>

      <View style={styles.headerTextContainer}>
        <Text style={styles.headerGameName}>{gameName}</Text>
        <Text style={styles.headerSectionTitle}>{sectionTitle}</Text>
      </View>

      {/* Decorative bottom border */}
      <View style={styles.headerBottomBorder}>
        <View style={[styles.headerBorderSegment, { backgroundColor: colorScheme.secondary }]} />
        <View style={[styles.headerBorderSegment, { backgroundColor: colorScheme.accent }]} />
        <View style={[styles.headerBorderSegment, { backgroundColor: colorScheme.secondary }]} />
      </View>
    </LinearGradient>
  );
}

interface GameAssetRowProps {
  gameId: string;
  colorScheme: ColorPalette;
  style?: ViewStyle;
}

/**
 * Display a row of game-specific assets (gems for Splendor, planets for TM, etc.)
 */
export function GameAssetRow({ gameId, colorScheme, style }: GameAssetRowProps) {
  const renderAssets = () => {
    switch (gameId) {
      case 'splendor':
        return (
          <View style={styles.assetRowContent}>
            {(['diamond', 'sapphire', 'emerald', 'ruby', 'onyx'] as GemColor[]).map((color, i) => (
              <View key={i} style={styles.assetItem}>
                <Image
                  source={getGemAsset(color, 1)}
                  style={styles.assetImage}
                  resizeMode="contain"
                />
                <Text style={[styles.assetLabel, { color: colorScheme.text }]}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        );

      case 'terraforming-mars':
        return (
          <View style={styles.assetRowContent}>
            {(['Barren', 'Arid', 'Ocean', 'Lush', 'Terrestrial'] as PlanetType[]).map((type, i) => (
              <View key={i} style={styles.assetItem}>
                <Image
                  source={getPlanetAsset(type, 1)}
                  style={styles.assetImageLarge}
                  resizeMode="contain"
                />
                <Text style={[styles.assetLabel, { color: colorScheme.text }]}>
                  {type}
                </Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  const assets = renderAssets();
  if (!assets) return null;

  return (
    <View style={[styles.assetRowContainer, { backgroundColor: colorScheme.surface }, style]}>
      {assets}
    </View>
  );
}

function getPatternIcon(pattern?: string): string {
  switch (pattern) {
    case 'mars': return 'planet-outline';
    case 'gems': return 'diamond-stone';
    case 'birds': return 'bird';
    case 'trains': return 'train';
    default: return 'cards-playing-outline';
  }
}

const styles = StyleSheet.create({
  // Section Header
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 2,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  sectionHeaderIcon: {
    marginRight: SPACING.sm,
  },
  sectionHeaderText: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: '800',
    letterSpacing: 3,
  },

  // Sidebar Box
  sidebarBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: SPACING.md,
    marginVertical: SPACING.md,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sidebarTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '700',
    fontStyle: 'italic',
    marginLeft: SPACING.sm,
  },
  sidebarContent: {},

  // Paragraph
  paragraphText: {
    fontSize: isTablet ? 17 : 15,
    lineHeight: isTablet ? 28 : 24,
    textAlign: 'justify',
    marginVertical: SPACING.sm,
  },

  // Bullet List
  bulletList: {
    marginVertical: SPACING.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: isTablet ? 10 : 8,
    marginRight: SPACING.sm,
  },
  bulletIcon: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  numberBullet: {
    width: isTablet ? 26 : 22,
    height: isTablet ? 26 : 22,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  numberText: {
    color: '#fff',
    fontSize: isTablet ? 14 : 12,
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontSize: isTablet ? 16 : 14,
    lineHeight: isTablet ? 26 : 22,
  },

  // Key Term
  keyTermContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: SPACING.sm,
  },
  keyTermIcon: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  keyTermContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keyTermTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '700',
  },
  keyTermDefinition: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: isTablet ? 24 : 20,
  },

  // Page Divider
  pageDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  pageDividerLine: {
    flex: 1,
    height: 1,
  },
  pageNumberBox: {
    width: 32,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  pageNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  // Quote Block
  quoteBlock: {
    borderLeftWidth: 4,
    paddingLeft: SPACING.md,
    paddingVertical: SPACING.sm,
    marginVertical: SPACING.md,
  },
  quoteText: {
    fontSize: isTablet ? 16 : 14,
    fontStyle: 'italic',
    lineHeight: isTablet ? 26 : 22,
  },
  quoteAttribution: {
    fontSize: isTablet ? 14 : 12,
    marginTop: SPACING.xs,
  },

  // Icon Grid
  iconGrid: {
    flexDirection: 'row',
    marginVertical: SPACING.md,
  },
  iconGridItem: {
    alignItems: 'center',
    padding: SPACING.sm,
  },
  iconGridCircle: {
    width: isTablet ? 56 : 48,
    height: isTablet ? 56 : 48,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  iconGridLabel: {
    fontSize: isTablet ? 13 : 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconGridDesc: {
    fontSize: isTablet ? 11 : 10,
    textAlign: 'center',
    marginTop: 2,
  },

  // Rulebook Header
  rulebookHeader: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  headerPatternOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerTextContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  headerGameName: {
    fontSize: isTablet ? 14 : 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerSectionTitle: {
    fontSize: isTablet ? 32 : 26,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  headerBottomBorder: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  headerBorderSegment: {
    flex: 1,
    height: '100%',
  },

  // Asset Row
  assetRowContainer: {
    borderRadius: 12,
    padding: SPACING.md,
    marginVertical: SPACING.md,
  },
  assetRowContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  assetItem: {
    alignItems: 'center',
    padding: SPACING.xs,
  },
  assetImage: {
    width: isTablet ? 48 : 40,
    height: isTablet ? 48 : 40,
    marginBottom: 4,
  },
  assetImageLarge: {
    width: isTablet ? 56 : 48,
    height: isTablet ? 56 : 48,
    marginBottom: 4,
  },
  assetLabel: {
    fontSize: isTablet ? 11 : 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});
