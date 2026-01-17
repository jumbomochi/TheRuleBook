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

You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves. Each bird extends a chain of powerful combinations in one of your habitats.

Each habitat focuses on a key aspect of your engine:
- **Forest:** Gain food tokens to play more birds
- **Grassland:** Lay eggs to score points and pay costs
- **Wetland:** Draw bird cards to expand your options

**Goal:** Accumulate the most points by the end of 4 rounds.

**Game Length:** 4 rounds with decreasing actions:
- Round 1: 8 actions per player
- Round 2: 7 actions per player
- Round 3: 6 actions per player
- Round 4: 5 actions per player

After each round, you'll score one of the end-of-round goals.
      `.trim(),
    },
    {
      id: 'setup',
      title: 'Setup',
      order: 2,
      content: `
# Setup

1. **Place the main board** in the center of the table for tracking end-of-round goals
2. **Setup the birdfeeder:**
   - Place the dice tower near the main board
   - Roll all 5 food dice and place them in the tower or near it
3. **Each player receives:**
   - 1 player mat (representing your three habitats)
   - 8 action cubes in your chosen color
   - 5 food tokens: 1 of each type (Invertebrate, Seed, Fish, Fruit, Rodent)
   - 2 random bonus cards (secretly look at both, keep 1, discard 1)
   - 5 random bird cards
4. **Starting bird cards:** Each player keeps some of their 5 bird cards by "paying" food equal to the total food cost shown on the cards they keep. You have 5 food tokens available. Discard any unchosen birds and food spent.
5. **Setup the bird tray:**
   - Draw 3 bird cards from the deck and place face-up in the tray near the deck
6. **Setup goal board:**
   - Use green side (easier goals) for 2-3 players
   - Use blue side (harder goals) for 4+ players
   - Place 1 action cube per player on each of the 4 round goal spaces
7. **Determine first player:** The player who most recently saw a bird in real life (or choose randomly)
      `.trim(),
      tags: ['setup'],
    },
    {
      id: 'turn-structure',
      title: 'Turn Structure',
      order: 3,
      content: `
# On Your Turn

On your turn, place one of your remaining action cubes on the leftmost exposed slot of one of your habitat rows. Then perform the action and activate brown-powered birds in that habitat.

## Four Possible Actions

### 1. Play a Bird
Place a bird card from your hand into one of your three habitats:
1. **Pay the food cost** shown on the bird card (discard food tokens)
2. **Pay the egg cost:** 1 egg from your existing birds for each bird already in that habitat row
3. **Place the bird** in the leftmost empty slot of the chosen habitat
4. **Gain any bonus** shown in the space (like drawing bonus cards)
5. **Activate "when played" power** if the bird has a white power

### 2. Forest - Gain Food
1. **Gain food** from the birdfeeder up to the number of dice shown on the exposed action space
2. For each food, take a die showing that food type from the birdfeeder
3. **Activate brown powers** (right to left) on all birds in your forest habitat
4. **Special rule:** If all remaining dice show the same food, you may first re-roll all 5 dice

### 3. Grassland - Lay Eggs
1. **Lay eggs** equal to the number shown on the exposed action space
2. Distribute eggs among your birds in any habitat (respecting nest capacity limits)
3. **Activate brown powers** (right to left) on all birds in your grassland habitat

### 4. Wetland - Draw Cards
1. **Draw bird cards** equal to the number shown on the exposed action space
2. Choose each card from either the face-up bird tray OR the top of the deck
3. After drawing, refill the bird tray to 3 cards
4. **Activate brown powers** (right to left) on all birds in your wetland habitat

**Important:** Once you use all your action cubes, you're done for the round.
      `.trim(),
      tags: ['actions', 'turn'],
    },
    {
      id: 'bird-powers',
      title: 'Bird Powers',
      order: 4,
      content: `
# Bird Powers

Birds have different colored power boxes indicating when they activate:

## Brown Powers - "When Activated"
- Trigger every time you take that habitat's action
- Activate from right to left (in the order birds were played)
- Each brown power activates once per action
- Optional: You may choose not to activate a brown power

**Example:** If you have 3 birds in your forest and take the "gain food" action, you gain food from the action space, then activate each brown bird power from right to left.

## Pink Powers - "Once Between Turns"
- Can be activated once between your turns (on other players' turns)
- Activate when the specified condition is met
- Reset at the start of your next turn (whether used or not)
- Optional: You may choose not to activate a pink power

**Example:** "When another player plays a bird, draw 1 card" activates during opponents' turns.

## White Powers - "When Played"
- Trigger immediately and only once when you play the bird
- Activate after paying costs and placing the bird
- Not optional: Must resolve if able

## No Power (Tan/No Box)
- Some birds have no powers
- Often have high point values, useful nests, or low food costs
- Still valuable for engine building

**Important:** All powers are optional unless specifically stated. Powers that say "may" are always optional.
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
        'Yes! Your bonus card is private information that you keep secret from other players. You can look at it anytime during the game.',
    },
    {
      id: 'faq-2',
      question: 'What if all dice show the same food in the birdfeeder?',
      answer:
        'If all remaining dice show the same food type, you may reset the birdfeeder by re-rolling all 5 dice before taking food. This is the only time you can re-roll the birdfeeder.',
    },
    {
      id: 'faq-3',
      question: 'Can eggs exceed a bird\'s nest capacity?',
      answer:
        'No. Each bird has a maximum nest capacity shown on the card (usually 2-6 eggs). You cannot place more eggs than the capacity allows. Star nests have unlimited capacity.',
    },
    {
      id: 'faq-4',
      question: 'Do pink powers reset if I don\'t use them?',
      answer:
        'Yes. Pink "once between turns" powers reset at the start of your turn whether or not you used them since your last turn.',
    },
    {
      id: 'faq-5',
      question: 'Can I play a bird with no food cost for free?',
      answer:
        'You still must pay the egg cost (1 egg per bird already in that habitat), but yes, the food cost is 0 for some birds. You pay only eggs in that case.',
    },
    {
      id: 'faq-6',
      question: 'What happens if the bird deck runs out?',
      answer:
        'Shuffle the discard pile to create a new deck. If there are no cards in the discard either, you simply cannot draw more cards.',
    },
    {
      id: 'faq-7',
      question: 'Can I activate bird powers in a different order?',
      answer:
        'No. Brown "when activated" powers must be activated from right to left (newest birds to oldest) in the order they were played in that habitat.',
    },
    {
      id: 'faq-8',
      question: 'How do I tie-break round goals?',
      answer:
        'Ties are broken by the player whose action cube is lowest on the goal board (placed there first in earlier rounds). In round 1, all tied players receive the same points.',
    },
    {
      id: 'faq-9',
      question: 'Can I mix drawing from the tray and deck when drawing multiple cards?',
      answer:
        'Yes! When drawing multiple bird cards (like "draw 2 cards"), you can choose each card independently from either the face-up tray or the top of the deck.',
    },
    {
      id: 'faq-10',
      question: 'What is a "wild" food or nest type (star symbol)?',
      answer:
        'Wild (star) symbols can count as any type. A wild food can be any of the 5 food types. A wild nest can count as any nest type and has no egg capacity limit.',
    },
    {
      id: 'faq-11',
      question: 'Do I have to play a bird on my turn?',
      answer:
        'No. Playing a bird is one of four action choices. You can instead choose to gain food, lay eggs, or draw cards by placing your action cube in the appropriate habitat.',
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
    cardCover: {
      image: 'game://wingspan/card-cover.jpg',
      tagline: 'Attract the Finest Birds',
      themeIcon: 'bird',
    },
  },
};
