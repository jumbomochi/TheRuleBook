import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import {
  Appbar,
  Searchbar,
  List,
  Chip,
  FAB,
  Portal,
  Modal,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import Markdown from 'react-native-markdown-display';
import { useGameLibrary } from '../../../hooks';
import type { RuleSection } from '../../../types';
import { SPACING, TYPOGRAPHY, TOUCH_TARGETS, isTablet } from '../../../utils/responsive';

export default function RulesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { getGameById } = useGameLibrary();
  const game = getGameById(id || '');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<RuleSection | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [showBookmarks, setShowBookmarks] = useState(false);

  if (!game) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Game Not Found' }} />
        <Text>Game not found</Text>
      </View>
    );
  }

  const filteredRules = game.rules.filter((rule) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      rule.title.toLowerCase().includes(query) ||
      rule.content.toLowerCase().includes(query) ||
      rule.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const bookmarkedRules = game.rules.filter((rule) => bookmarks.has(rule.id));

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

  const displayedRules = showBookmarks ? bookmarkedRules : filteredRules;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: game.name,
          headerRight: () => (
            <IconButton
              icon={showBookmarks ? 'bookmark' : 'bookmark-outline'}
              onPress={() => setShowBookmarks(!showBookmarks)}
            />
          ),
        }}
      />

      <Searchbar
        placeholder="Search rules..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView style={styles.scrollView}>
        <List.Section>
          {displayedRules.map((rule) => (
            <List.Accordion
              key={rule.id}
              title={rule.title}
              description={rule.level ? `Level ${rule.level}` : undefined}
              left={(props) => <List.Icon {...props} icon="book-open-variant" />}
              right={(props) => (
                <View style={styles.accordionRight}>
                  {rule.tags && rule.tags.length > 0 && (
                    <View style={styles.tags}>
                      {rule.tags.slice(0, 2).map((tag) => (
                        <Chip key={tag} compact style={styles.chip}>
                          {tag}
                        </Chip>
                      ))}
                    </View>
                  )}
                  <IconButton
                    icon={bookmarks.has(rule.id) ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    onPress={() => toggleBookmark(rule.id)}
                  />
                  <List.Icon {...props} icon="chevron-down" />
                </View>
              )}
            >
              <View style={styles.ruleContent}>
                <Markdown
                  style={{
                    body: {
                      color: theme.colors.onSurface,
                      fontSize: 16,
                      lineHeight: 24,
                    },
                    heading1: {
                      color: theme.colors.primary,
                      fontSize: 24,
                      fontWeight: 'bold',
                      marginTop: 16,
                      marginBottom: 8,
                    },
                    heading2: {
                      color: theme.colors.primary,
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginTop: 12,
                      marginBottom: 6,
                    },
                    list_item: {
                      marginVertical: 4,
                    },
                    code_inline: {
                      backgroundColor: theme.colors.surfaceVariant,
                      color: theme.colors.onSurfaceVariant,
                      padding: 4,
                      borderRadius: 4,
                    },
                  }}
                >
                  {rule.content}
                </Markdown>
                {rule.examples && rule.examples.length > 0 && (
                  <View style={styles.examples}>
                    <Text variant="titleMedium" style={styles.examplesTitle}>
                      Examples
                    </Text>
                    {rule.examples.map((example, index) => (
                      <View key={index} style={styles.example}>
                        <Text variant="bodyMedium">{example}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </List.Accordion>
          ))}
        </List.Section>

        {displayedRules.length === 0 && (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge">
              {showBookmarks
                ? 'No bookmarked rules yet'
                : 'No rules found matching your search'}
            </Text>
          </View>
        )}
      </ScrollView>

      <FAB
        icon="information"
        style={styles.fab}
        onPress={() => setSelectedSection(game.rules[0])}
        label="Quick Ref"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: SPACING.sm,
    minHeight: TOUCH_TARGETS.medium,
  },
  scrollView: {
    flex: 1,
  },
  accordionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TOUCH_TARGETS.medium,
  },
  tags: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginRight: SPACING.sm,
  },
  chip: {
    height: TOUCH_TARGETS.small,
  },
  ruleContent: {
    padding: isTablet ? SPACING.lg : SPACING.md,
    paddingTop: SPACING.sm,
  },
  examples: {
    marginTop: SPACING.md,
    padding: isTablet ? SPACING.md : SPACING.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  examplesTitle: {
    marginBottom: SPACING.sm,
    fontWeight: 'bold',
    fontSize: TYPOGRAPHY.subheading,
  },
  example: {
    marginVertical: SPACING.xs,
    paddingLeft: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(0, 0, 0, 0.2)',
  },
  emptyState: {
    padding: isTablet ? SPACING.xxl : SPACING.xl,
    alignItems: 'center',
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
