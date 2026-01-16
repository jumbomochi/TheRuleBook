import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, useTheme, Divider } from 'react-native-paper';
import type { QuickRefCard } from '../../types';

interface QuickReferenceProps {
  cards: QuickRefCard[];
}

export function QuickReference({ cards }: QuickReferenceProps) {
  const theme = useTheme();

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
        <Card key={card.id} style={styles.card}>
          <Card.Title
            title={card.title}
            subtitle={card.category}
            left={(props) => <List.Icon {...props} icon="card-text" />}
          />
          <Card.Content>
            {card.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                {itemIndex > 0 && <Divider style={styles.divider} />}
                <View style={styles.item}>
                  {item.label && (
                    <Text
                      variant="labelMedium"
                      style={[styles.label, { color: theme.colors.primary }]}
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
