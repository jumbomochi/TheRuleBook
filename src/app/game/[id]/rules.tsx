import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import {
  Searchbar,
  Chip,
  IconButton,
  Text,
  Surface,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { useGameLibrary } from '../../../hooks';
import type { RuleSection, ColorPalette } from '../../../types';
import { QuickReference, FAQList } from '../../../components/rules';
import {
  RulebookSectionHeader,
  SidebarBox,
  RulebookParagraph,
  BulletList,
  KeyTerm,
  PageDivider,
  QuoteBlock,
  IconGrid,
  RulebookHeader,
} from '../../../components/rules/RulebookComponents';
import { SPACING, isTablet } from '../../../utils/responsive';

// Game-specific configurations for theming
const GAME_THEMES: Record<string, GameTheme> = {
  'terraforming-mars': {
    pattern: 'mars',
    sectionIcons: {
      overview: 'planet-outline',
      setup: 'view-grid-outline',
      'player-board': 'card-account-details-outline',
      cards: 'cards-outline',
      generations: 'timer-sand',
      actions: 'lightning-bolt',
      'game-end': 'flag-checkered',
      scoring: 'trophy',
      tiles: 'puzzle',
      default: 'book-open-variant',
    },
    flavorQuotes: [
      { quote: "In the 2400s, mankind begins to terraform the planet Mars.", attribution: "Opening narration" },
      { quote: "Don't forget! Increasing a global parameter also increases your TR!", attribution: "Key reminder" },
    ],
  },
  'splendor': {
    pattern: 'gems',
    sectionIcons: {
      overview: 'diamond-stone',
      setup: 'view-grid-outline',
      'turn-structure': 'refresh',
      gems: 'hexagon-multiple',
      cards: 'cards',
      nobles: 'crown',
      scoring: 'trophy',
      default: 'book-open-variant',
    },
    flavorQuotes: [
      { quote: "You are a wealthy Renaissance merchant traveling the Silk Road.", attribution: "Game premise" },
    ],
  },
  'wingspan': {
    pattern: 'birds',
    sectionIcons: {
      overview: 'bird',
      setup: 'view-grid-outline',
      habitats: 'home-variant',
      birds: 'bird',
      'food-tokens': 'food-apple',
      eggs: 'egg',
      'end-of-round': 'flag',
      scoring: 'trophy',
      default: 'book-open-variant',
    },
    flavorQuotes: [
      { quote: "You are bird enthusiasts seeking to discover and attract the best birds to your network of wildlife preserves.", attribution: "Game premise" },
    ],
  },
  'ticket-to-ride': {
    pattern: 'trains',
    sectionIcons: {
      overview: 'train',
      setup: 'view-grid-outline',
      routes: 'road-variant',
      'train-cards': 'cards',
      destinations: 'map-marker-path',
      claiming: 'check-circle',
      scoring: 'trophy',
      default: 'book-open-variant',
    },
    flavorQuotes: [
      { quote: "On a long August day in 1900, five friends met up at a local pub for an epic gamble.", attribution: "Game backstory" },
    ],
  },
};

interface GameTheme {
  pattern: string;
  sectionIcons: Record<string, string>;
  flavorQuotes: Array<{ quote: string; attribution: string }>;
}

// Section type icons
const getSectionIcon = (sectionId: string, gameId: string): string => {
  const theme = GAME_THEMES[gameId] || GAME_THEMES['terraforming-mars'];
  const lowerId = sectionId.toLowerCase();

  for (const [key, icon] of Object.entries(theme.sectionIcons)) {
    if (lowerId.includes(key)) return icon;
  }
  return theme.sectionIcons.default;
};

export default function RulesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getGameById } = useGameLibrary();
  const game = getGameById(id || '');

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'rules' | 'quickref' | 'faq'>('rules');

  const colorScheme = game?.assets?.colorScheme || {
    primary: '#6200EE',
    secondary: '#03DAC6',
    accent: '#FF5722',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
  };

  const gameTheme = GAME_THEMES[id || ''] || GAME_THEMES['terraforming-mars'];

  if (!game) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Game Not Found' }} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#999" />
          <Text variant="headlineSmall" style={styles.errorText}>Game not found</Text>
        </View>
      </View>
    );
  }

  const filteredRules = useMemo(() => {
    if (!searchQuery) return game.rules;
    const query = searchQuery.toLowerCase();
    return game.rules.filter((rule) =>
      rule.title.toLowerCase().includes(query) ||
      rule.content.toLowerCase().includes(query) ||
      rule.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [game.rules, searchQuery]);

  const toggleBookmark = (ruleId: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(ruleId)) {
        next.delete(ruleId);
      } else {
        next.add(ruleId);
      }
      return next;
    });
  };

  // Enhanced markdown styles matching rulebook typography
  const markdownStyles = useMemo(() => ({
    body: {
      color: colorScheme.text,
      fontSize: isTablet ? 17 : 15,
      lineHeight: isTablet ? 28 : 24,
    },
    heading1: {
      color: colorScheme.primary,
      fontSize: isTablet ? 26 : 22,
      fontWeight: '800' as const,
      letterSpacing: 1,
      marginTop: 24,
      marginBottom: 12,
      textTransform: 'uppercase' as const,
    },
    heading2: {
      color: colorScheme.primary,
      fontSize: isTablet ? 20 : 18,
      fontWeight: '700' as const,
      marginTop: 20,
      marginBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: colorScheme.primary + '30',
      paddingBottom: 6,
    },
    heading3: {
      color: colorScheme.secondary,
      fontSize: isTablet ? 17 : 15,
      fontWeight: '600' as const,
      marginTop: 16,
      marginBottom: 8,
    },
    paragraph: {
      marginVertical: 8,
      textAlign: 'justify' as const,
    },
    list_item: {
      marginVertical: 6,
      flexDirection: 'row' as const,
    },
    bullet_list: {
      marginVertical: 10,
      marginLeft: 8,
    },
    ordered_list: {
      marginVertical: 10,
    },
    bullet_list_icon: {
      color: colorScheme.secondary,
      fontSize: 20,
      marginRight: 10,
    },
    code_inline: {
      backgroundColor: colorScheme.primary + '15',
      color: colorScheme.primary,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
      fontFamily: 'monospace',
      fontWeight: '600' as const,
    },
    code_block: {
      backgroundColor: colorScheme.surface,
      padding: 16,
      borderRadius: 12,
      marginVertical: 12,
      borderLeftWidth: 4,
      borderLeftColor: colorScheme.primary,
    },
    blockquote: {
      backgroundColor: colorScheme.accent + '10',
      borderLeftWidth: 4,
      borderLeftColor: colorScheme.accent,
      paddingLeft: 16,
      paddingVertical: 12,
      marginVertical: 16,
      borderRadius: 8,
      fontStyle: 'italic' as const,
    },
    strong: {
      fontWeight: '700' as const,
      color: colorScheme.primary,
    },
    em: {
      fontStyle: 'italic' as const,
      color: colorScheme.text + 'DD',
    },
    hr: {
      backgroundColor: colorScheme.surface,
      height: 3,
      marginVertical: 24,
      borderRadius: 2,
    },
    table: {
      borderWidth: 2,
      borderColor: colorScheme.primary + '30',
      borderRadius: 12,
      marginVertical: 16,
      overflow: 'hidden' as const,
    },
    th: {
      backgroundColor: colorScheme.primary,
      padding: 12,
      fontWeight: '700' as const,
      color: '#fff',
    },
    td: {
      padding: 12,
      borderTopWidth: 1,
      borderTopColor: colorScheme.surface,
      backgroundColor: colorScheme.background,
    },
    tr: {
      borderBottomWidth: 1,
      borderBottomColor: colorScheme.surface,
    },
    link: {
      color: colorScheme.secondary,
      textDecorationLine: 'underline' as const,
    },
    image: {
      marginVertical: 16,
      borderRadius: 12,
    },
  }), [colorScheme]);

  const renderRuleSection = (rule: RuleSection, index: number) => {
    const isExpanded = expandedSection === rule.id;
    const isBookmarked = bookmarks.has(rule.id);
    const sectionIcon = getSectionIcon(rule.id, id || '');

    return (
      <View key={rule.id} style={styles.ruleSectionWrapper}>
        {/* Section card with rulebook styling */}
        <Surface
          style={[
            styles.ruleCard,
            {
              backgroundColor: colorScheme.background,
              borderColor: isExpanded ? colorScheme.primary : colorScheme.surface,
            }
          ]}
          elevation={isExpanded ? 4 : 1}
        >
          {/* Colored top accent */}
          <View style={[styles.cardTopAccent, { backgroundColor: colorScheme.primary }]} />

          {/* Section header */}
          <TouchableOpacity
            onPress={() => setExpandedSection(isExpanded ? null : rule.id)}
            style={styles.ruleHeader}
            activeOpacity={0.7}
          >
            {/* Icon with themed background */}
            <View style={[styles.sectionIconContainer, { backgroundColor: colorScheme.primary + '15' }]}>
              <MaterialCommunityIcons
                name={sectionIcon as any}
                size={isTablet ? 28 : 24}
                color={colorScheme.primary}
              />
            </View>

            {/* Title and tags */}
            <View style={styles.sectionTitleContainer}>
              <Text
                variant="titleMedium"
                style={[
                  styles.sectionTitle,
                  { color: colorScheme.text },
                  isExpanded && { color: colorScheme.primary }
                ]}
              >
                {rule.title}
              </Text>
              {rule.tags && rule.tags.length > 0 && (
                <View style={styles.tagRow}>
                  {rule.tags.slice(0, 3).map((tag) => (
                    <View
                      key={tag}
                      style={[styles.tag, { backgroundColor: colorScheme.secondary + '20' }]}
                    >
                      <Text style={[styles.tagText, { color: colorScheme.secondary }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Actions */}
            <View style={styles.sectionActions}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  toggleBookmark(rule.id);
                }}
                style={styles.bookmarkButton}
              >
                <Ionicons
                  name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={22}
                  color={isBookmarked ? colorScheme.accent : colorScheme.textSecondary}
                />
              </TouchableOpacity>
              <MaterialCommunityIcons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={28}
                color={colorScheme.primary}
              />
            </View>
          </TouchableOpacity>

          {/* Expanded content */}
          {isExpanded && (
            <View style={styles.ruleContent}>
              {/* Decorative divider */}
              <View style={styles.contentDivider}>
                <View style={[styles.dividerLine, { backgroundColor: colorScheme.surface }]} />
                <MaterialCommunityIcons
                  name={sectionIcon as any}
                  size={16}
                  color={colorScheme.primary + '60'}
                />
                <View style={[styles.dividerLine, { backgroundColor: colorScheme.surface }]} />
              </View>

              {/* Main markdown content */}
              <View style={styles.markdownContainer}>
                <Markdown style={markdownStyles}>
                  {rule.content}
                </Markdown>
              </View>

              {/* Examples section */}
              {rule.examples && rule.examples.length > 0 && (
                <SidebarBox
                  title="Examples"
                  colorScheme={colorScheme}
                  variant="example"
                  icon="lightbulb-on-outline"
                >
                  {rule.examples.map((example, idx) => (
                    <View key={idx} style={styles.exampleItem}>
                      <MaterialCommunityIcons
                        name="arrow-right-circle"
                        size={18}
                        color={colorScheme.secondary}
                        style={styles.exampleIcon}
                      />
                      <Text style={[styles.exampleText, { color: colorScheme.text }]}>
                        {example}
                      </Text>
                    </View>
                  ))}
                </SidebarBox>
              )}

              {/* Illustrations placeholder */}
              {rule.illustrations && rule.illustrations.length > 0 && (
                <View style={styles.illustrationsSection}>
                  <View style={styles.illustrationHeader}>
                    <MaterialCommunityIcons
                      name="image-multiple"
                      size={20}
                      color={colorScheme.secondary}
                    />
                    <Text style={[styles.illustrationTitle, { color: colorScheme.secondary }]}>
                      Diagrams & Illustrations
                    </Text>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {rule.illustrations.map((illust, idx) => (
                      <View
                        key={idx}
                        style={[styles.illustrationCard, { backgroundColor: colorScheme.surface }]}
                      >
                        <MaterialCommunityIcons
                          name="image-area"
                          size={40}
                          color={colorScheme.primary + '40'}
                        />
                        <Text style={[styles.illustrationCaption, { color: colorScheme.textSecondary }]}>
                          {illust.caption || 'Illustration'}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Page number decoration */}
              <View style={styles.pageFooter}>
                <View style={[styles.pageFooterLine, { backgroundColor: colorScheme.surface }]} />
                <View style={[styles.pageNumber, { backgroundColor: colorScheme.primary }]}>
                  <Text style={styles.pageNumberText}>{index + 1}</Text>
                </View>
                <View style={[styles.pageFooterLine, { backgroundColor: colorScheme.surface }]} />
              </View>
            </View>
          )}
        </Surface>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.background }]}>
      <Stack.Screen
        options={{
          title: `${game.name} Rules`,
          headerStyle: { backgroundColor: colorScheme.primary },
          headerTintColor: '#fff',
        }}
      />

      {/* Rulebook-style header */}
      <RulebookHeader
        gameName={game.name}
        sectionTitle="Official Rulebook"
        colorScheme={colorScheme}
        backgroundPattern={gameTheme.pattern as any}
      />

      {/* Tab Bar */}
      <View style={[styles.tabBar, { backgroundColor: colorScheme.surface }]}>
        {[
          { key: 'rules', label: 'Rules', icon: 'book-open-variant' },
          { key: 'quickref', label: 'Quick Ref', icon: 'flash' },
          { key: 'faq', label: 'FAQ', icon: 'frequently-asked-questions' },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                isActive && [styles.tabActive, { borderBottomColor: colorScheme.primary }]
              ]}
              onPress={() => setActiveTab(tab.key as typeof activeTab)}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={22}
                color={isActive ? colorScheme.primary : colorScheme.textSecondary}
              />
              <Text
                variant="labelMedium"
                style={[
                  styles.tabLabel,
                  { color: isActive ? colorScheme.primary : colorScheme.textSecondary },
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Search Bar */}
      {activeTab === 'rules' && (
        <View style={[styles.searchContainer, { backgroundColor: colorScheme.background }]}>
          <View style={[styles.searchWrapper, { backgroundColor: colorScheme.surface }]}>
            <MaterialCommunityIcons
              name="magnify"
              size={22}
              color={colorScheme.primary}
              style={styles.searchIcon}
            />
            <Searchbar
              placeholder="Search rules..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
              inputStyle={[styles.searchInput, { color: colorScheme.text }]}
              placeholderTextColor={colorScheme.textSecondary}
              iconColor="transparent"
            />
          </View>
        </View>
      )}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'rules' && (
          <>
            {/* Opening quote */}
            {gameTheme.flavorQuotes.length > 0 && !searchQuery && (
              <QuoteBlock
                quote={gameTheme.flavorQuotes[0].quote}
                attribution={gameTheme.flavorQuotes[0].attribution}
                colorScheme={colorScheme}
              />
            )}

            {/* Bookmarked Rules */}
            {bookmarks.size > 0 && !searchQuery && (
              <View style={styles.bookmarkedSection}>
                <RulebookSectionHeader
                  title="Bookmarks"
                  colorScheme={colorScheme}
                  icon="bookmark-multiple"
                />
                {game.rules
                  .filter((r) => bookmarks.has(r.id))
                  .map((rule, idx) => renderRuleSection(rule, idx))}
              </View>
            )}

            {/* All Rules */}
            <RulebookSectionHeader
              title={searchQuery ? 'Search Results' : 'Rules'}
              colorScheme={colorScheme}
              icon="book-open-page-variant"
            />

            {filteredRules.map((rule, idx) => renderRuleSection(rule, idx))}

            {filteredRules.length === 0 && (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="book-search"
                  size={64}
                  color={colorScheme.textSecondary + '60'}
                />
                <Text variant="bodyLarge" style={[styles.emptyText, { color: colorScheme.textSecondary }]}>
                  No rules found for "{searchQuery}"
                </Text>
              </View>
            )}

            {/* Footer decoration */}
            <PageDivider colorScheme={colorScheme} />
          </>
        )}

        {activeTab === 'quickref' && (
          <View style={styles.quickRefContainer}>
            <RulebookSectionHeader
              title="Quick Reference"
              colorScheme={colorScheme}
              icon="flash"
            />
            <QuickReference cards={game.quickReference} colorScheme={colorScheme} />
          </View>
        )}

        {activeTab === 'faq' && (
          <View style={styles.faqContainer}>
            <RulebookSectionHeader
              title="FAQ"
              colorScheme={colorScheme}
              icon="frequently-asked-questions"
            />
            <FAQList items={game.faq} colorScheme={colorScheme} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 16,
    color: '#999',
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomWidth: 3,
  },
  tabLabel: {
    marginLeft: 8,
    fontWeight: '500',
  },
  tabLabelActive: {
    fontWeight: '700',
  },

  // Search
  searchContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingLeft: SPACING.md,
  },
  searchIcon: {
    marginRight: -8,
  },
  searchbar: {
    flex: 1,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  searchInput: {
    fontSize: isTablet ? 16 : 14,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 100,
  },

  // Bookmarks
  bookmarkedSection: {
    marginBottom: SPACING.lg,
  },

  // Rule sections
  ruleSectionWrapper: {
    marginBottom: SPACING.md,
  },
  ruleCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
  },
  cardTopAccent: {
    height: 4,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  sectionIconContainer: {
    width: isTablet ? 52 : 44,
    height: isTablet ? 52 : 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: isTablet ? 18 : 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookmarkButton: {
    padding: 8,
  },

  // Rule content
  ruleContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  contentDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  markdownContainer: {
    paddingHorizontal: SPACING.xs,
  },

  // Examples
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  exampleIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  exampleText: {
    flex: 1,
    fontSize: isTablet ? 15 : 14,
    lineHeight: isTablet ? 24 : 20,
  },

  // Illustrations
  illustrationsSection: {
    marginTop: SPACING.lg,
  },
  illustrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  illustrationTitle: {
    fontSize: isTablet ? 15 : 13,
    fontWeight: '600',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  illustrationCard: {
    width: isTablet ? 180 : 140,
    height: isTablet ? 120 : 100,
    borderRadius: 12,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationCaption: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },

  // Page footer
  pageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingTop: SPACING.md,
  },
  pageFooterLine: {
    flex: 1,
    height: 1,
  },
  pageNumber: {
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  pageNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 16,
  },

  // Quick ref and FAQ containers
  quickRefContainer: {
    paddingTop: SPACING.sm,
  },
  faqContainer: {
    paddingTop: SPACING.sm,
  },
});
