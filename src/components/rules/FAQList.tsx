import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  List,
  Searchbar,
  Text,
  useTheme,
  Chip,
} from 'react-native-paper';
import Markdown from 'react-native-markdown-display';
import type { FAQItem } from '../../types';

interface FAQListProps {
  items: FAQItem[];
}

export function FAQList({ items }: FAQListProps) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!items || items.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text variant="bodyLarge">No FAQ items available</Text>
      </View>
    );
  }

  // Extract unique categories
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean))
  ) as string[];

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search FAQs..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      {categories.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          <Chip
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
            style={styles.chip}
          >
            All
          </Chip>
          {categories.map((category) => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.chip}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      )}

      <ScrollView style={styles.scrollView}>
        <List.Section>
          {filteredItems.map((item) => (
            <List.Accordion
              key={item.id}
              title={item.question}
              description={item.category}
              left={(props) => <List.Icon {...props} icon="help-circle" />}
            >
              <View style={styles.answerContainer}>
                <Markdown
                  style={{
                    body: {
                      color: theme.colors.onSurface,
                      fontSize: 15,
                      lineHeight: 22,
                    },
                    paragraph: {
                      marginVertical: 8,
                    },
                    strong: {
                      fontWeight: 'bold',
                      color: theme.colors.primary,
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
                  {item.answer}
                </Markdown>
                {item.relatedRules && item.relatedRules.length > 0 && (
                  <View style={styles.relatedRules}>
                    <Text
                      variant="labelMedium"
                      style={[
                        styles.relatedTitle,
                        { color: theme.colors.primary },
                      ]}
                    >
                      Related Rules
                    </Text>
                    {item.relatedRules.map((ruleId, index) => (
                      <Text
                        key={index}
                        variant="bodySmall"
                        style={[
                          styles.relatedRule,
                          { color: theme.colors.onSurfaceVariant },
                        ]}
                      >
                        {ruleId}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </List.Accordion>
          ))}
        </List.Section>

        {filteredItems.length === 0 && (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge">
              No FAQ items found matching your search
            </Text>
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
  searchbar: {
    margin: 16,
    marginBottom: 8,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  answerContainer: {
    padding: 16,
    paddingTop: 8,
  },
  relatedRules: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  relatedTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  relatedRule: {
    marginVertical: 2,
    paddingLeft: 8,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
});
