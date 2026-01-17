import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, useTheme, Divider } from 'react-native-paper';
import type { QuickRefCard } from '../../types';
import type { ColorPalette } from '../../types/assets';

interface QuickReferenceProps {
  cards: QuickRefCard[];
  colorScheme?: ColorPalette;
}

export function QuickReference({ cards, colorScheme }: QuickReferenceProps) {
  const theme = useTheme();
  const accentColor = colorScheme?.accent || theme.colors.primary;
  const primaryColor = colorScheme?.primary || theme.colors.primary;

  if (!cards || cards.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text variant="bodyLarge">No quick reference cards available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          style={[
            styles.card,
            colorScheme && {
              borderLeftWidth: 4,
              borderLeftColor: accentColor,
            },
          ]}
        >
          <Card.Title
            title={card.title}
            subtitle={card.category}
            left={(props) => (
              <List.Icon
                {...props}
                icon="card-text"
                color={primaryColor}
              />
            )}
            titleStyle={{ color: primaryColor, fontWeight: '600' }}
          />
          <Card.Content>
            {card.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                {itemIndex > 0 && <Divider style={styles.divider} />}
                <View style={styles.item}>
                  {item.label && (
                    <Text
                      variant="labelMedium"
                      style={[styles.label, { color: accentColor }]}
                    >
                      {item.label}
                    </Text>
                  )}
                  <Text variant="bodyMedium">{item.value}</Text>
                  {item.description && (
                    <Text
                      variant="bodySmall"
                      style={[
                        styles.description,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      {item.description}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  item: {
    paddingVertical: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  description: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  divider: {
    marginVertical: 4,
  },
});
