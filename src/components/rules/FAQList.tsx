import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import type { FAQItem, ColorPalette } from '../../types';
import { SPACING, isTablet } from '../../utils/responsive';

interface FAQListProps {
  items: FAQItem[];
  colorScheme?: ColorPalette;
}

export function FAQList({ items, colorScheme }: FAQListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Use high-contrast colors with proper defaults
  const colors = colorScheme || {
    primary: '#6200EE',
    secondary: '#03DAC6',
    accent: '#FF5722',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
  };

  // ALWAYS use light card backgrounds with dark text for maximum readability
  // Regardless of the game's color scheme, FAQ cards should be readable
  const cardBg = '#FFFFFF';
  const textColor = '#1A1A1A';
  const secondaryTextColor = '#555555';
  const answerBg = '#F8F9FA';

  if (!items || items.length === 0) {
    return (
      <View style={styles.emptyState}>
        <MaterialCommunityIcons
          name="frequently-asked-questions"
          size={64}
          color={secondaryTextColor}
        />
        <Text variant="bodyLarge" style={[styles.emptyText, { color: secondaryTextColor }]}>
          No FAQ items available
        </Text>
      </View>
    );
  }

  // Extract unique categories
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean))
  ) as string[];

  // Filter items
  const filteredItems = items.filter((item) => {
    return !selectedCategory || item.category === selectedCategory;
  });

  // High contrast markdown styles
  const markdownStyles = {
    body: {
      color: textColor,
      fontSize: isTablet ? 16 : 15,
      lineHeight: isTablet ? 26 : 24,
    },
    paragraph: {
      marginVertical: 8,
    },
    strong: {
      fontWeight: '700' as const,
      color: colors.primary,
    },
    em: {
      fontStyle: 'italic' as const,
    },
    list_item: {
      marginVertical: 4,
    },
    bullet_list: {
      marginVertical: 8,
    },
    bullet_list_icon: {
      color: colors.primary,
    },
    code_inline: {
      backgroundColor: colors.primary + '20',
      color: colors.primary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      fontWeight: '600' as const,
    },
  };

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      {categories.length > 0 && (
        <View style={styles.categorySection}>
          <Text
            variant="labelMedium"
            style={[styles.categoryLabel, { color: secondaryTextColor }]}
          >
            FILTER BY CATEGORY
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === null ? colors.primary : cardBg,
                  borderColor: colors.primary,
                }
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  { color: selectedCategory === null ? '#FFFFFF' : colors.primary }
                ]}
              >
                All ({items.length})
              </Text>
            </TouchableOpacity>
            {categories.map((category) => {
              const count = items.filter(i => i.category === category).length;
              const isSelected = selectedCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: isSelected ? colors.secondary : cardBg,
                      borderColor: colors.secondary,
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      { color: isSelected ? '#FFFFFF' : colors.secondary }
                    ]}
                  >
                    {category} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* FAQ Items */}
      <View style={styles.faqList}>
        {filteredItems.map((item, index) => {
          const isExpanded = expandedId === item.id;

          return (
            <Surface
              key={item.id}
              style={[
                styles.faqCard,
                {
                  backgroundColor: cardBg,
                  borderColor: isExpanded ? colors.primary : 'transparent',
                }
              ]}
              elevation={isExpanded ? 4 : 2}
            >
              {/* Question number badge */}
              <View style={[styles.questionBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.questionBadgeText}>Q{index + 1}</Text>
              </View>

              <TouchableOpacity
                onPress={() => setExpandedId(isExpanded ? null : item.id)}
                style={styles.questionRow}
                activeOpacity={0.7}
              >
                <View style={styles.questionContent}>
                  <Text
                    variant="titleMedium"
                    style={[
                      styles.questionText,
                      { color: textColor }
                    ]}
                  >
                    {item.question}
                  </Text>
                  {item.category && (
                    <View style={[styles.categoryTag, { backgroundColor: colors.secondary + '25' }]}>
                      <MaterialCommunityIcons
                        name="tag-outline"
                        size={12}
                        color={colors.secondary}
                      />
                      <Text style={[styles.categoryTagText, { color: colors.secondary }]}>
                        {item.category}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={[
                  styles.expandButton,
                  { backgroundColor: isExpanded ? colors.primary : colors.primary + '15' }
                ]}>
                  <MaterialCommunityIcons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={isExpanded ? '#FFFFFF' : colors.primary}
                  />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.answerContainer}>
                  {/* Divider with icon */}
                  <View style={styles.answerDivider}>
                    <View style={[styles.dividerLine, { backgroundColor: colors.primary + '30' }]} />
                    <MaterialCommunityIcons
                      name="arrow-down-circle"
                      size={20}
                      color={colors.primary}
                    />
                    <View style={[styles.dividerLine, { backgroundColor: colors.primary + '30' }]} />
                  </View>

                  {/* Answer box with high contrast */}
                  <View style={[styles.answerBox, { backgroundColor: colors.primary + '08' }]}>
                    <View style={styles.answerHeader}>
                      <View style={[styles.answerBadge, { backgroundColor: colors.primary }]}>
                        <Text style={styles.answerBadgeText}>A</Text>
                      </View>
                      <Text
                        variant="labelLarge"
                        style={[styles.answerLabel, { color: colors.primary }]}
                      >
                        Answer
                      </Text>
                    </View>
                    <View style={styles.answerContent}>
                      <Markdown style={markdownStyles}>
                        {item.answer}
                      </Markdown>
                    </View>
                  </View>

                  {/* Related Rules */}
                  {item.relatedRules && item.relatedRules.length > 0 && (
                    <View style={[styles.relatedRules, { backgroundColor: colors.accent + '12' }]}>
                      <View style={styles.relatedHeader}>
                        <MaterialCommunityIcons
                          name="link-variant"
                          size={18}
                          color={colors.accent}
                        />
                        <Text
                          variant="labelMedium"
                          style={[styles.relatedTitle, { color: colors.accent }]}
                        >
                          Related Rules
                        </Text>
                      </View>
                      <View style={styles.relatedTags}>
                        {item.relatedRules.map((ruleId, idx) => (
                          <TouchableOpacity
                            key={idx}
                            style={[
                              styles.relatedTag,
                              { backgroundColor: colors.accent, borderColor: colors.accent }
                            ]}
                          >
                            <MaterialCommunityIcons
                              name="book-open-variant"
                              size={12}
                              color="#FFFFFF"
                            />
                            <Text style={styles.relatedTagText}>
                              {ruleId}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              )}
            </Surface>
          );
        })}

        {filteredItems.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="filter-off-outline"
              size={64}
              color={secondaryTextColor}
            />
            <Text variant="bodyLarge" style={[styles.emptyText, { color: secondaryTextColor }]}>
              No FAQ items in this category
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

// Helper function to check if a color is dark
function isColorDark(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

// Helper function to lighten a color
function lightenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + Math.round(255 * amount));
  const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + Math.round(255 * amount));
  const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categorySection: {
    marginBottom: SPACING.lg,
  },
  categoryLabel: {
    marginBottom: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  categoryContainer: {
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  faqList: {
    gap: SPACING.md,
  },
  faqCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
  },
  questionBadge: {
    position: 'absolute',
    top: -1,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  questionBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingTop: SPACING.lg + 8,
  },
  questionContent: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  questionText: {
    fontWeight: '700',
    fontSize: isTablet ? 17 : 15,
    lineHeight: isTablet ? 26 : 22,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  expandButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  answerDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 2,
  },
  answerBox: {
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  answerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  answerBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  answerBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  answerLabel: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  answerContent: {
    paddingLeft: 38,
  },
  relatedRules: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: 12,
  },
  relatedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  relatedTitle: {
    marginLeft: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  relatedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relatedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  relatedTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
  },
});
