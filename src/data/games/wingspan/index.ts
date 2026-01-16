import { Game } from '../../../types/game';
import { ColorPalette } from '../../../types/assets';

const wingspanPalette: ColorPalette = {
  primary: '#4A7BA7',
  secondary: '#8FB339',
  accent: '#D97B4E',
  background: '#1A2634',
  surface: '#2D3E50',
  text: '#FFFFFF',
  textSecondary: '#B8C5D6',
};

export const wingspan: Game = {
  id: 'wingspan',
  name: 'Wingspan',
  bggId: 266192,
  publisher: 'Stonemaier Games',
  playerCount: { min: 1, max: 5 },
  playTime: { min: 40, max: 70 },
  complexity: 2.4,
  categories: ['Animals', 'Card Game', 'Educational'],
  mechanics: ['Hand Management', 'Set Collection', 'Engine Building', 'Card Drafting'],

  rules: [
    {
      id: 'overview',
      title: 'Overview',
      order: 1,
      content: `
# Game Overview

Wingspan is a competitive, medium-weight, card-driven, engine-building board game about birds. You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves.

**Goal:** Accumulate the most points by the end of 4 rounds through birds, bonus cards, end-of-round goals, eggs, cached food, and tucked cards.

**Game Length:** 4 rounds, with each player taking fewer actions each round (8, 7, 6, 5 actions).
      `.trim(),
    },
    {
      id: 'setup',
      title: 'Setup',
      order: 2,
      content: `
# Setup

1. **Place the main board** in the center (for goals and food dice)
2. **Each player receives:**
   - 1 player mat
   - 8 action cubes (in their color)
   - 2 random bonus cards (keep 1, discard 1)
   - 5 random bird cards (keep some by "paying" food equal to their total food cost, max 5 food available)
   - 5 food tokens (1 of each type from the birdfeeder)
3. **Setup the birdfeeder:**
   - Roll all 5 dice and place in the tower
4. **Setup goal board:**
   - For 2-3 players: Use green side with 1 cube per goal
   - For 4 players: Use blue side with 1 cube per goal
5. **Setup bird tray:**
   - Draw and display 3 bird cards face-up
6. **Determine first player** (player who most recently saw a bird in real life)
      `.trim(),
      tags: ['setup'],
    },
    {
      id: 'turn-structure',
      title: 'Turn Structure',
      order: 3,
      content: `
# On Your Turn

Place one of your action cubes on one of your three habitat rows and take all actions in that row (from right to left).

## Actions by Habitat

### Forest (Green) - Gain Food
1. Gain food tokens equal to the number of die faces shown
2. Take 1 die from birdfeeder for each food
3. Activate brown "when activated" powers (right to left)

### Grassland (Yellow) - Lay Eggs
1. Lay eggs equal to the number shown on the exposed action space
2. Distribute eggs among birds (respecting nest capacity)
3. Activate brown "when activated" powers (right to left)

### Wetland (Blue) - Draw Cards
1. Draw bird cards equal to the number shown
2. Choose from face-up tray or deck (or mix)
3. Activate brown "when activated" powers (right to left)

### Play a Bird
Instead of taking a row action, you may play a bird card from your hand:
1. Pay the food cost shown on the card
2. Pay 1 egg from any bird for each bird already in that habitat
3. Place the bird in the leftmost empty space of a habitat
4. Draw from bonus cards if shown in that space
      `.trim(),
      tags: ['actions', 'turn'],
    },
    {
      id: 'bird-powers',
      title: 'Bird Powers',
      order: 4,
      content: `
# Bird Powers

Birds have four types of powers:

## Brown Powers - "When Activated"
Trigger every time you take the habitat action (activate right to left).

## Pink Powers - "Once Between Turns"
Can be used once on another player's turn when condition is met. Reset on your turn.

## White Powers - "When Played"
Trigger immediately when you play the bird card.

## No Power
Some birds have no power but may have high point values or useful attributes.

**Important:** Powers are optional - you can choose not to activate them.
      `.trim(),
      tags: ['birds', 'powers'],
    },
    {
      id: 'round-end',
      title: 'Round End & Goals',
      order: 5,
      content: `
# End of Round

After all players have used all their action cubes:

1. **Score the Round Goal:**
   - Check the current round's goal on the goal board
   - Compare your count with other players
   - Award points: 1st place gets 5/4/3 points (depending on player count), 2nd gets 2/1/0, etc.
   - Place scoring cube on the goal board to show your rank

2. **Discard active bird tray cards** and draw 3 new ones

3. **Prepare for next round:**
   - Return all action cubes to your supply
   - Next round you'll have 1 fewer action cube to place

**Round Summary:**
- Round 1: 8 actions per player
- Round 2: 7 actions per player
- Round 3: 6 actions per player
- Round 4: 5 actions per player
      `.trim(),
      tags: ['round-end', 'goals'],
    },
    {
      id: 'end-game',
      title: 'End of Game',
      order: 6,
      content: `
# End of Game Scoring

After 4 rounds, count your points from:

1. **Bird Cards:** Sum of points on all played birds
2. **Bonus Cards:** Score your chosen bonus card
3. **End-of-Round Goals:** Points earned each round (on goal board)
4. **Eggs:** 1 point per egg on your birds
5. **Food on Cards:** 1 point per cached food token
6. **Tucked Cards:** 1 point per tucked card under birds

**Winner:** The player with the most total points wins.

**Tiebreaker:** If tied, the player with the most unused food tokens wins.
      `.trim(),
      tags: ['end-game', 'scoring'],
    },
  ],

  quickReference: [
    {
      id: 'actions',
      title: 'Available Actions',
      category: 'Turn',
      items: [
        { label: 'Forest', value: 'Gain food + activate birds' },
        { label: 'Grassland', value: 'Lay eggs + activate birds' },
        { label: 'Wetland', value: 'Draw cards + activate birds' },
        { label: 'Play Bird', value: 'Pay food + eggs, place bird' },
      ],
    },
    {
      id: 'bird-costs',
      title: 'Playing a Bird',
      category: 'Rules',
      items: [
        { value: 'Pay food shown on card' },
        { value: 'Pay 1 egg per bird already in habitat' },
        { value: 'Place in leftmost empty space' },
      ],
    },
    {
      id: 'power-types',
      title: 'Bird Power Colors',
      category: 'Birds',
      items: [
        { label: 'Brown', value: 'Activate when habitat used' },
        { label: 'Pink', value: 'Once between your turns' },
        { label: 'White', value: 'When played' },
        { label: 'None', value: 'No power' },
      ],
    },
    {
      id: 'round-structure',
      title: 'Rounds',
      category: 'Game Flow',
      items: [
        { label: 'Round 1', value: '8 actions' },
        { label: 'Round 2', value: '7 actions' },
        { label: 'Round 3', value: '6 actions' },
        { label: 'Round 4', value: '5 actions' },
      ],
    },
    {
      id: 'scoring',
      title: 'Score Sources',
      category: 'End Game',
      items: [
        { value: 'Bird card points' },
        { value: 'Bonus card' },
        { value: 'Round goal points' },
        { value: '1pt per egg' },
        { value: '1pt per cached food' },
        { value: '1pt per tucked card' },
      ],
    },
  ],

  faq: [
    {
      id: 'faq-1',
      question: 'Can I look at my bonus card after choosing it at the start?',
      answer:
        'Yes! Your bonus card is private information. You can look at it anytime during the game.',
    },
    {
      id: 'faq-2',
      question: 'What if all dice show the same food in the birdfeeder?',
      answer:
        'If all remaining dice show the same food, you may reset the birdfeeder by rolling all 5 dice before taking food.',
    },
    {
      id: 'faq-3',
      question: 'Can eggs exceed a bird\'s nest capacity?',
      answer:
        'No. Each bird has a maximum nest capacity shown on the card. You cannot place more eggs than the capacity allows.',
    },
    {
      id: 'faq-4',
      question: 'Do pink powers reset if I don\'t use them?',
      answer:
        'Yes. Pink powers reset at the start of your turn whether or not you used them since your last turn.',
    },
    {
      id: 'faq-5',
      question: 'Can I play a bird with no food cost for free?',
      answer:
        'You still must pay 1 egg per bird already in that habitat, but yes, the food cost is 0 for some birds.',
    },
    {
      id: 'faq-6',
      question: 'What happens if the bird deck runs out?',
      answer:
        'Shuffle the discard pile to create a new deck. If there are no cards to draw, you simply draw fewer cards.',
    },
    {
      id: 'faq-7',
      question: 'Can I activate a bird power in a different order?',
      answer:
        'No. Brown "when activated" powers must be activated from right to left (in the order birds were played).',
    },
    {
      id: 'faq-8',
      question: 'How do I tie-break round goals?',
      answer:
        'The player whose action cube is lowest on the goal board (placed there first in earlier rounds) wins ties.',
    },
  ],

  turnStructure: [
    {
      id: 'place-cube',
      name: 'Place Action Cube',
      description: 'Place a cube on one of the four rows',
      order: 1,
      actions: [
        'Forest (gain food)',
        'Grassland (lay eggs)',
        'Wetland (draw cards)',
        'Play a bird',
      ],
    },
    {
      id: 'take-action',
      name: 'Take Row Action',
      description: 'Perform the action shown on the leftmost exposed space',
      order: 2,
    },
    {
      id: 'activate-powers',
      name: 'Activate Bird Powers',
      description: 'Activate brown powers from right to left (optional)',
      order: 3,
      optional: true,
    },
  ],

  phases: [
    {
      id: 'round-1',
      name: 'Round 1',
      order: 1,
      description: '8 action cubes per player',
    },
    {
      id: 'goal-1',
      name: 'Goal Scoring 1',
      order: 2,
      description: 'Score round 1 goal, refresh bird tray',
    },
    {
      id: 'round-2',
      name: 'Round 2',
      order: 3,
      description: '7 action cubes per player',
    },
    {
      id: 'goal-2',
      name: 'Goal Scoring 2',
      order: 4,
      description: 'Score round 2 goal, refresh bird tray',
    },
    {
      id: 'round-3',
      name: 'Round 3',
      order: 5,
      description: '6 action cubes per player',
    },
    {
      id: 'goal-3',
      name: 'Goal Scoring 3',
      order: 6,
      description: 'Score round 3 goal, refresh bird tray',
    },
    {
      id: 'round-4',
      name: 'Round 4',
      order: 7,
      description: '5 action cubes per player',
    },
    {
      id: 'goal-4',
      name: 'Goal Scoring 4',
      order: 8,
      description: 'Score round 4 goal',
    },
    {
      id: 'final-scoring',
      name: 'Final Scoring',
      order: 9,
      description: 'Count all points',
    },
  ],

  scoring: {
    categories: [
      {
        id: 'birds',
        name: 'Bird Cards',
        icon: 'bird',
        description: 'Points printed on bird cards',
      },
      {
        id: 'bonus',
        name: 'Bonus Card',
        icon: 'star',
        description: 'Points from your chosen bonus card',
      },
      {
        id: 'goals',
        name: 'Round Goals',
        icon: 'target',
        description: 'Points earned at end of each round',
      },
      {
        id: 'eggs',
        name: 'Eggs',
        icon: 'egg',
        description: '1 point per egg on birds',
      },
      {
        id: 'food',
        name: 'Cached Food',
        icon: 'food',
        description: '1 point per food token on cards',
      },
      {
        id: 'tucked',
        name: 'Tucked Cards',
        icon: 'card',
        description: '1 point per card tucked under birds',
      },
    ],
    finalScoringOnly: true,
    trackDuringGame: false,
  },

  resources: [
    {
      id: 'invertebrate',
      name: 'Invertebrate',
      icon: 'bug',
      color: '#F57C00',
      perPlayer: false,
    },
    {
      id: 'seed',
      name: 'Seed',
      icon: 'seed',
      color: '#FF9800',
      perPlayer: false,
    },
    {
      id: 'fish',
      name: 'Fish',
      icon: 'fish',
      color: '#1976D2',
      perPlayer: false,
    },
    {
      id: 'rodent',
      name: 'Rodent',
      icon: 'rodent',
      color: '#9E9E9E',
      perPlayer: false,
    },
    {
      id: 'fruit',
      name: 'Fruit',
      icon: 'fruit',
      color: '#E91E63',
      perPlayer: false,
    },
  ],

  assets: {
    icon: 'wingspan-icon',
    colorScheme: wingspanPalette,
  },
};
