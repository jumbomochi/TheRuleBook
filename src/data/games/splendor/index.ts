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

You are a wealthy Renaissance merchant traveling the Silk Road. Your goal is to acquire gem mines, transportation methods, and artisans to transform raw gems into beautiful jewels. The more you develop your commercial empire, the more prestige you gain.

On your turn, you may:
- Take gems from the common pool
- Purchase and build a development card
- Reserve a development card for the future

**Goal:** Be the first player to reach **15 prestige points**. Once a player reaches this threshold, complete the current round to give all players an equal number of turns.

**Winner:** The player with the most prestige points. In case of a tie, the player with the fewest development cards wins.
      `.trim(),
    },
    {
      id: 'setup',
      title: 'Setup',
      order: 2,
      content: `
# Setup

1. **Shuffle** each of the three development card decks (Level 1, 2, and 3) separately and place them in a column in the center of the table
2. **Reveal** 4 cards from each level, placing them face-up in a row next to their respective deck
3. **Shuffle** the noble tiles and reveal a number equal to the number of players + 1:
   - 2 players: 3 nobles
   - 3 players: 4 nobles
   - 4 players: 5 nobles
4. **Sort** the gem tokens by color and place them in piles within reach of all players:
   - 2 players: 4 of each gem color (Diamond, Sapphire, Emerald, Ruby, Onyx)
   - 3 players: 5 of each gem color
   - 4 players: 7 of each gem color
   - Gold tokens (wild): Always 5 regardless of player count
5. **Determine** the first player randomly (youngest player or by mutual agreement)

![Setup Example](game://splendor/setup-board.jpg)
      `.trim(),
      tags: ['setup'],
      illustrations: [
        {
          id: 'setup-board',
          uri: 'game://splendor/setup-board.jpg',
          caption: 'Example of a properly set up Splendor game board',
          altText: 'Splendor game board setup showing card decks, nobles, and gem tokens',
        },
      ],
    },
    {
      id: 'turn-structure',
      title: 'Turn Structure',
      order: 3,
      content: `
# On Your Turn

Choose **ONE** of the following four actions:

## 1. Take 3 Different Gem Tokens
Take 3 gem tokens of **different colors** from the common pool.

**Important:** You cannot take gold tokens with this action.

## 2. Take 2 Identical Gem Tokens
Take 2 gem tokens of the **same color** from the common pool.

**Restriction:** This action is only allowed if there are **at least 4 tokens** of that color available in the pool before you take them.

## 3. Reserve 1 Development Card and Take 1 Gold Token
- Take a face-up development card from the table OR the top card of any deck (without revealing it to other players)
- Add it to your hand (face-down, kept secret)
- Take 1 gold token from the pool

**Restrictions:**
- You may never have more than **3 reserved cards** at a time
- If there are no gold tokens left, you still reserve the card but don't get a gold token

## 4. Purchase 1 Development Card
Purchase one face-up development card from the table OR one of your previously reserved cards:
- Pay the cost shown on the card using your gem tokens
- Your development card bonuses (from previously purchased cards) act as permanent discounts
- Place the purchased card face-up in front of you
- Return spent gems to the common pool
- Immediately gain the prestige points and permanent bonus shown on the card

![Development Cards](game://splendor/development-cards.jpg)

**Gold Tokens:** Gold tokens are wild and can substitute for any gem color.

---

**Token Limit:** You may never have more than **10 tokens** total (including gold). If an action would cause you to exceed this limit, you must return tokens until you have exactly 10 before the end of your turn.
      `.trim(),
      tags: ['actions', 'turn'],
      illustrations: [
        {
          id: 'development-cards',
          uri: 'game://splendor/development-cards.jpg',
          caption: 'Development cards showing gem costs and bonuses',
          altText: 'Three development cards from Splendor showing different levels and gem requirements',
        },
      ],
    },
    {
      id: 'nobles',
      title: 'Nobles',
      order: 4,
      content: `
# Noble Visits

Nobles are attracted to powerful merchants. At the **end of your turn**, check if you meet the requirements shown on any noble tile.

**Requirements:** Nobles require specific numbers of development card bonuses (NOT gem tokens). For example, a noble might require 4 red bonuses and 4 black bonuses from your purchased cards.

**When You Qualify:**
- If you meet a noble's requirements, that noble **automatically visits** you
- Noble visits happen at the end of your turn, after all other actions
- You cannot refuse a noble visit
- If you qualify for **multiple nobles** at once, you **choose one**
- Place the noble tile in front of you - it is immediately worth **3 prestige points**

**Important Notes:**
- Each noble can only visit one player (first come, first served)
- Only your development card bonuses count, not your gem tokens
- You don't spend or lose anything when a noble visits
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
      items: [
        { label: 'Option 1', value: 'Take 3 different gems' },
        { label: 'Option 2', value: 'Take 2 same gems (if 4+ available)' },
        { label: 'Option 3', value: 'Reserve 1 card + take 1 gold' },
        { label: 'Option 4', value: 'Purchase 1 card' },
      ],
    },
    {
      id: 'limits',
      title: 'Limits',
      category: 'Rules',
      items: [
        { label: 'Tokens', value: 'Max 10 tokens in hand' },
        { label: 'Reserved', value: 'Max 3 reserved cards' },
        { label: 'Gold', value: 'Always 5 available' },
      ],
    },
    {
      id: 'nobles',
      title: 'Nobles',
      category: 'Scoring',
      items: [
        { value: 'Visit at end of turn (automatic)' },
        { value: 'Require card bonuses, not gems' },
        { value: 'Worth 3 prestige points each' },
      ],
    },
    {
      id: 'winning',
      title: 'Winning',
      category: 'End Game',
      items: [
        { value: 'First to 15+ points triggers end' },
        { value: 'Finish the round' },
        { value: 'Most points wins' },
        { value: 'Tiebreaker: fewer cards' },
      ],
    },
  ],

  faq: [
    {
      id: 'faq-1',
      question: 'Can I take 2 gems of the same color if there are only 3 left?',
      answer:
        'No. To take 2 gems of the same color, there must be at least 4 tokens of that color available in the pool BEFORE you take them.',
    },
    {
      id: 'faq-2',
      question: 'Can I use gold tokens as any gem?',
      answer:
        'Yes! Gold tokens are wild and can substitute for any gem color when purchasing cards. They are the only way to obtain wild gems.',
    },
    {
      id: 'faq-3',
      question: 'What if I qualify for multiple nobles on the same turn?',
      answer:
        'You choose which noble visits you. The other noble(s) remain available for you or other players in future turns.',
    },
    {
      id: 'faq-4',
      question: 'Do my development card bonuses count as tokens?',
      answer:
        'No. Card bonuses are permanent discounts and do not count toward your 10-token limit. Only physical gem and gold tokens count.',
    },
    {
      id: 'faq-5',
      question: 'Can I reserve a card from the top of a deck without looking?',
      answer:
        'Yes! You can reserve the top card of any deck without revealing it to other players. This is useful for denying cards or when you need a gold token.',
    },
    {
      id: 'faq-6',
      question: 'What happens if a gem pile runs out?',
      answer:
        "You cannot take gems that aren't available. If a pile is empty, you must choose a different action or different gems.",
    },
    {
      id: 'faq-7',
      question: 'Can I purchase a card if I can\'t afford it with my gems and bonuses?',
      answer:
        'No. You must be able to pay the full cost shown on the card. Your development bonuses reduce the cost, and gold tokens can fill any gaps, but you must pay completely.',
    },
    {
      id: 'faq-8',
      question: 'When do I check for nobles - before or after replacing cards?',
      answer:
        'Noble visits happen at the very end of your turn, after all cards have been replaced and your turn is complete. Only your development bonuses at that moment matter.',
    },
    {
      id: 'faq-9',
      question: 'Can I take 1 or 0 gems on my turn?',
      answer:
        'No. If you choose to take gems, you must take either exactly 3 different gems OR exactly 2 identical gems (if 4+ available). Taking fewer gems is not a legal action.',
    },
    {
      id: 'faq-10',
      question: 'Do I have to spend my gems when purchasing a card if my bonuses cover the cost?',
      answer:
        'If your development bonuses are sufficient to meet or exceed the card\'s cost, you don\'t need to spend any gem tokens at all.',
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
    cardCover: {
      image: 'game://splendor/card-cover.jpg',
      tagline: 'Renaissance Gem Trading',
      themeIcon: 'diamond',
    },
  },
};
