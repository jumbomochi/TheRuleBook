import { Game } from '../../../types/game';
import { ColorPalette } from '../../../types/assets';

const splendorPalette: ColorPalette = {
  primary: '#8B4513',
  secondary: '#DAA520',
  accent: '#228B22',
  background: '#1A1A1A',
  surface: '#2D2D2D',
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
};

export const splendor: Game = {
  id: 'splendor',
  name: 'Splendor',
  bggId: 148228,
  publisher: 'Space Cowboys',
  playerCount: { min: 2, max: 4 },
  playTime: { min: 30, max: 30 },
  complexity: 1.8,
  categories: ['Card Game', 'Economic', 'Renaissance'],
  mechanics: ['Card Drafting', 'Set Collection', 'Engine Building'],

  rules: [
    {
      id: 'overview',
      title: 'Overview',
      order: 1,
      content: `
# Game Overview

In Splendor, you are a wealthy Renaissance merchant acquiring gem mines, transportation, and artisans to transform raw gems into beautiful jewels.

**Goal:** Be the first player to reach **15 prestige points**.

**Game End:** When a player reaches 15 points, finish the current round so all players have equal turns, then the player with the most points wins.
      `.trim(),
    },
    {
      id: 'setup',
      title: 'Setup',
      order: 2,
      content: `
# Setup

1. **Shuffle** each of the three development card decks separately
2. **Place** them in a column in the center of the table (Level 1 at bottom, Level 3 at top)
3. **Reveal** 4 cards from each level, placing them in a row next to their deck
4. **Shuffle** the noble tiles and reveal as many as players + 1:
   - 2 players: 3 nobles
   - 3 players: 4 nobles
   - 4 players: 5 nobles
5. **Sort** the gem tokens by color and place them in piles:
   - 2 players: 4 of each gem color
   - 3 players: 5 of each gem color
   - 4 players: 7 of each gem color
   - Gold (wild): Always 5
6. **Determine** first player randomly
      `.trim(),
      tags: ['setup'],
    },
    {
      id: 'turn-structure',
      title: 'Turn Structure',
      order: 3,
      content: `
# On Your Turn

Choose **ONE** of the following four actions:

## 1. Take 3 Gem Tokens
Take 3 gem tokens of **different colors**.

*Restriction: You cannot take gold this way.*

## 2. Take 2 Gem Tokens
Take 2 gem tokens of the **same color**.

*Restriction: Only allowed if there are 4+ tokens of that color available.*

## 3. Reserve 1 Development Card
Take a development card from the table (or top of a deck) and add it to your hand. Also take 1 gold token.

*Restrictions:*
- Maximum 3 reserved cards in hand
- Gold is taken even if none available (you just don't get one)

## 4. Purchase 1 Development Card
Buy a face-up card from the table OR a card from your reserved hand.

Pay the gem cost shown on the card. Your owned development cards provide permanent gem bonuses that reduce costs.

---

**Token Limit:** You may never have more than **10 tokens** (including gold). If you exceed 10, return tokens until you have 10.
      `.trim(),
      tags: ['actions', 'turn'],
    },
    {
      id: 'nobles',
      title: 'Nobles',
      order: 4,
      content: `
# Noble Visits

At the **end of your turn**, if you have enough development card bonuses to meet a noble's requirements, that noble visits you.

- Noble visits are **automatic** - you cannot refuse
- If you qualify for multiple nobles, **choose one**
- The noble tile is placed in front of you and worth **3 prestige points**
- Each noble can only visit one player
      `.trim(),
      tags: ['nobles', 'scoring'],
    },
    {
      id: 'end-game',
      title: 'End of Game',
      order: 5,
      content: `
# End of Game

The game ends when a player reaches **15 or more prestige points**.

**Important:** Complete the current round so all players have an equal number of turns.

**Winner:** The player with the most prestige points wins.

**Tiebreaker:** If tied, the player with fewer development cards wins.
      `.trim(),
      tags: ['end-game', 'scoring'],
    },
  ],

  quickReference: [
    {
      id: 'actions',
      title: 'Available Actions',
      category: 'Turn',
      content: `**Choose ONE:**
• Take 3 different gems
• Take 2 same gems (if 4+ available)
• Reserve 1 card + take 1 gold
• Purchase 1 card`,
    },
    {
      id: 'limits',
      title: 'Limits',
      category: 'Rules',
      content: `• Max 10 tokens in hand
• Max 3 reserved cards
• Gold: always 5 available`,
    },
    {
      id: 'nobles',
      title: 'Nobles',
      category: 'Scoring',
      content: `• Visit at end of turn (automatic)
• Require card bonuses, not gems
• Worth 3 prestige points each`,
    },
    {
      id: 'winning',
      title: 'Winning',
      category: 'End Game',
      content: `• First to 15+ points triggers end
• Finish the round
• Most points wins
• Tiebreaker: fewer cards`,
    },
  ],

  faq: [
    {
      id: 'faq-1',
      question: 'Can I take 2 gems of the same color if there are only 3 left?',
      answer:
        'No. To take 2 gems of the same color, there must be at least 4 tokens of that color available before you take them.',
    },
    {
      id: 'faq-2',
      question: 'Can I use gold tokens as any gem?',
      answer:
        'Yes! Gold tokens are wild and can substitute for any gem color when purchasing cards.',
    },
    {
      id: 'faq-3',
      question: 'What if I qualify for multiple nobles on the same turn?',
      answer:
        'You choose which noble visits you. The other noble(s) remain available for future turns.',
    },
    {
      id: 'faq-4',
      question: 'Do my development card bonuses count as tokens?',
      answer:
        'No. Card bonuses are permanent discounts and do not count toward your 10-token limit.',
    },
    {
      id: 'faq-5',
      question: 'Can I reserve a card from the top of a deck without looking?',
      answer:
        'Yes! You can reserve the top card of any deck without revealing it to other players.',
    },
    {
      id: 'faq-6',
      question: 'What happens if a gem pile runs out?',
      answer:
        "You cannot take gems that aren't available. If a pile is empty, choose different gems.",
    },
  ],

  turnStructure: [
    {
      id: 'action',
      name: 'Take Action',
      description: 'Perform one of the four available actions',
      order: 1,
      actions: [
        'Take 3 different gems',
        'Take 2 same gems',
        'Reserve a card',
        'Purchase a card',
      ],
    },
    {
      id: 'check-tokens',
      name: 'Check Token Limit',
      description: 'Return gems if you have more than 10',
      order: 2,
      optional: true,
    },
    {
      id: 'noble-visit',
      name: 'Noble Visit',
      description: 'Receive a noble if you qualify',
      order: 3,
      optional: true,
    },
  ],

  scoring: {
    categories: [
      {
        id: 'cards',
        name: 'Development Cards',
        icon: 'card',
        description: 'Points from purchased development cards',
      },
      {
        id: 'nobles',
        name: 'Nobles',
        icon: 'crown',
        description: '3 points per noble tile',
        step: 3,
      },
    ],
    finalScoringOnly: false,
    trackDuringGame: true,
  },

  resources: [
    {
      id: 'diamond',
      name: 'Diamond (White)',
      icon: 'gem',
      color: '#FFFFFF',
      perPlayer: true,
    },
    {
      id: 'sapphire',
      name: 'Sapphire (Blue)',
      icon: 'gem',
      color: '#1E88E5',
      perPlayer: true,
    },
    {
      id: 'emerald',
      name: 'Emerald (Green)',
      icon: 'gem',
      color: '#43A047',
      perPlayer: true,
    },
    {
      id: 'ruby',
      name: 'Ruby (Red)',
      icon: 'gem',
      color: '#E53935',
      perPlayer: true,
    },
    {
      id: 'onyx',
      name: 'Onyx (Black)',
      icon: 'gem',
      color: '#424242',
      perPlayer: true,
    },
    {
      id: 'gold',
      name: 'Gold (Wild)',
      icon: 'star',
      color: '#FDD835',
      perPlayer: true,
    },
  ],

  assets: {
    icon: 'splendor-icon',
    colorScheme: splendorPalette,
  },
};
