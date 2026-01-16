import { Game } from '../../../types/game';
import { ColorPalette } from '../../../types/assets';

const terraformingMarsPalette: ColorPalette = {
  primary: '#C1440E',
  secondary: '#1B5E20',
  accent: '#0D47A1',
  background: '#1A0F0A',
  surface: '#2D1F1A',
  text: '#FFFFFF',
  textSecondary: '#D7CCC8',
};

export const terraformingMars: Game = {
  id: 'terraforming-mars',
  name: 'Terraforming Mars',
  bggId: 167791,
  publisher: 'FryxGames',
  playerCount: { min: 1, max: 5 },
  playTime: { min: 120, max: 180 },
  complexity: 3.2,
  categories: ['Economic', 'Environmental', 'Industry', 'Science Fiction', 'Space Exploration'],
  mechanics: ['Card Drafting', 'Hand Management', 'Tile Placement', 'Engine Building'],

  rules: [
    {
      id: 'overview',
      title: 'Overview',
      order: 1,
      content: `
# Game Overview

In Terraforming Mars, you play as a corporation working to make Mars habitable. You'll increase the oxygen level, temperature, and create ocean tiles to earn Terraform Rating (TR), which represents both victory points and income.

**Goal:** Have the most victory points when Mars is fully terraformed (oxygen at 14%, temperature at +8°C, and 9 ocean tiles placed).

**Key Concept:** Your Terraform Rating (TR) serves dual purposes:
- It's your income level (you gain TR in MegaCredits each generation)
- It counts as victory points at game end (1 TR = 1 VP)
      `.trim(),
    },
    {
      id: 'setup',
      title: 'Setup',
      order: 2,
      content: `
# Setup

1. **Place the game board** in center with global parameters at starting positions:
   - Temperature: -30°C
   - Oxygen: 0%
   - Ocean tiles: 0/9

2. **Each player receives:**
   - Player board
   - Player markers (for TR track, production tracks)
   - Starting resources: 1 cube on each production track
   - Draw 2 corporation cards (choose 1 or play as "Beginner Corporation")
   - Draw 10 project cards (buy any for 3 M€ each)

3. **Starting positions:**
   - Place TR marker at 20 (or corporation's starting TR)
   - Set all production to corporation's starting levels
   - Take starting resources shown on corporation

4. **First Generation:**
   - Determine starting player randomly
   - Play proceeds clockwise
      `.trim(),
      tags: ['setup'],
    },
    {
      id: 'generation-structure',
      title: 'Generation Structure',
      order: 3,
      content: `
# Generation (Round) Structure

Each generation has 4 phases:

## 1. Player Order
Shift the first player marker clockwise.

## 2. Research Phase
- All players draft cards (or draw 4 cards without drafting)
- Buy any cards for 3 M€ each
- Discard unbought cards

## 3. Action Phase
Players take turns performing 1-2 actions (or pass):

**Available Actions:**
- **Play a card** from hand (pay cost, apply effects)
- **Use a standard project** (build city, greenery, etc.)
- **Use blue action cards** (once per generation)
- **Claim a milestone** (max 3 per game, 8 M€ each)
- **Fund an award** (increasing cost: 8/14/20 M€)
- **Convert plants** (8 plants → 1 greenery tile + oxygen)
- **Convert heat** (8 heat → temperature +1)

**Passing:** Once you pass, you're out for the generation.

## 4. Production Phase
All players simultaneously:
1. Convert all energy to heat
2. Gain resources equal to production values:
   - M€ (MegaCredits) = TR + M€ production
   - Steel, Titanium, Plants, Energy, Heat = respective production values
      `.trim(),
      tags: ['generation', 'round', 'turn'],
    },
    {
      id: 'global-parameters',
      title: 'Global Parameters',
      order: 4,
      content: `
# Global Parameters & Terraform Rating

The three global parameters must all reach maximum to end the game:

## Temperature
- Range: -30°C to +8°C (increase by 2°C steps)
- Raising temperature: +1 TR
- Ocean placement may be triggered

## Oxygen
- Range: 0% to 14% (increase by 1% steps)
- Raising oxygen: +1 TR
- Enables some card plays

## Oceans
- 9 ocean tiles total
- Placing ocean: +1 TR, gain 2 M€ if adjacent to your tile

**Important:** Only the player who raises a parameter gains the TR increase and benefits.
      `.trim(),
      tags: ['parameters', 'terraform'],
    },
    {
      id: 'resources',
      title: 'Resources & Production',
      order: 5,
      content: `
# Resources & Production

You track 6 types of resources on your player board:

## MegaCredits (M€)
- Universal currency
- Income = TR + M€ production

## Steel
- Worth 2 M€ when building cards with building tag
- Produced via production track

## Titanium
- Worth 3 M€ when playing space cards
- Produced via production track

## Plants
- Convert 8 plants → place greenery tile + raise oxygen
- Vulnerable to attack effects

## Energy
- Converts to heat every production phase (even if unused)
- Used for various card effects

## Heat
- Convert 8 heat → raise temperature by 1 step
- Accumulates from converted energy

**Production:** The number on your production track determines how many resources you gain each generation.
      `.trim(),
      tags: ['resources', 'production'],
    },
    {
      id: 'cards',
      title: 'Cards & Tags',
      order: 6,
      content: `
# Project Cards

Cards have three colors indicating when they're played:

## Green Cards (Automated)
- Play immediately for effect
- Discard after resolving
- Cost shown in top-left

## Blue Cards (Active)
- Remain in play
- Provide ongoing effects or actions
- Can use action once per generation

## Red Cards (Events)
- Play for immediate effect
- Discard after resolving
- Often affect opponents

**Tags:** Cards have tags (Building, Space, Science, Energy, Earth, Jovian, Venus, Microbe, Animal, Plant, City, Event) that matter for card requirements and synergies.

**Requirements:** Some cards need specific parameter levels, tags, or resources to play.
      `.trim(),
      tags: ['cards', 'tags'],
    },
    {
      id: 'standard-projects',
      title: 'Standard Projects',
      order: 7,
      content: `
# Standard Projects

Always available actions (no cards needed):

1. **Sell Patents:** Discard any number of cards, gain 1 M€ each
2. **Power Plant:** 11 M€ → increase energy production by 1
3. **Asteroid:** 14 M€ → raise temperature by 1
4. **Aquifer:** 18 M€ → place ocean tile
5. **Greenery:** 23 M€ → place greenery tile (raise oxygen if not at max)
6. **City:** 25 M€ → place city tile

**Note:** Standard projects are more expensive than cards but guarantee you can contribute to terraforming.
      `.trim(),
      tags: ['actions', 'standard-projects'],
    },
    {
      id: 'milestones-awards',
      title: 'Milestones & Awards',
      order: 8,
      content: `
# Milestones & Awards

## Milestones
Claim by paying 8 M€ when you meet the requirement (max 3 total):
- **Terraformer:** TR 35+
- **Mayor:** 3+ city tiles
- **Gardener:** 3+ greenery tiles
- **Builder:** 8+ building tags
- **Planner:** 16+ cards in hand

Worth 5 VP at game end.

## Awards
Fund by paying 8/14/20 M€ (increasing cost):
- **Landlord:** Most tiles in play
- **Banker:** Highest M€ production
- **Scientist:** Most science tags
- **Thermalist:** Most heat resources
- **Miner:** Most steel/titanium resources

At game end: 1st place = 5 VP, 2nd place = 2 VP
      `.trim(),
      tags: ['milestones', 'awards', 'scoring'],
    },
    {
      id: 'end-game',
      title: 'End of Game',
      order: 9,
      content: `
# End of Game Scoring

Game ends immediately when all three global parameters are maxed:
- Temperature: +8°C
- Oxygen: 14%
- Oceans: 9 tiles

**Final Scoring:**
1. **Terraform Rating:** Your current TR (1 TR = 1 VP)
2. **Milestones:** 5 VP each claimed
3. **Awards:** 5 VP for 1st, 2 VP for 2nd in each funded award
4. **Greenery Tiles:** 1 VP per greenery you placed
5. **City Tiles:** 1 VP per greenery adjacent to your cities
6. **Cards:** VP shown on cards (green and blue cards you've played)

**Winner:** Most total victory points.

**Tiebreaker:** Most M€ remaining.
      `.trim(),
      tags: ['end-game', 'scoring'],
    },
  ],

  quickReference: [
    {
      id: 'generation-phases',
      title: 'Generation Phases',
      category: 'Game Flow',
      items: [
        { value: '1. Player Order (shift first player)' },
        { value: '2. Research (draft/buy cards)' },
        { value: '3. Action Phase (play cards/actions)' },
        { value: '4. Production (gain resources)' },
      ],
    },
    {
      id: 'actions',
      title: 'Available Actions',
      category: 'Turn',
      items: [
        { value: 'Play a card from hand' },
        { value: 'Use standard project' },
        { value: 'Use blue card action' },
        { value: 'Claim milestone (8 M€)' },
        { value: 'Fund award (8/14/20 M€)' },
        { value: 'Convert 8 plants → greenery' },
        { value: 'Convert 8 heat → temp +1' },
        { value: 'Pass (end your turn)' },
      ],
    },
    {
      id: 'resources',
      title: 'Resource Values',
      category: 'Resources',
      items: [
        { label: 'M€', value: 'Universal currency' },
        { label: 'Steel', value: '2 M€ for building tags' },
        { label: 'Titanium', value: '3 M€ for space tags' },
        { label: 'Plants', value: '8 → greenery tile' },
        { label: 'Heat', value: '8 → temp +1' },
        { label: 'Energy', value: 'Converts to heat' },
      ],
    },
    {
      id: 'parameters',
      title: 'Global Parameters',
      category: 'Terraform',
      items: [
        { label: 'Temp', value: '-30°C to +8°C (+1 TR each)' },
        { label: 'O₂', value: '0% to 14% (+1 TR each)' },
        { label: 'Ocean', value: '0 to 9 tiles (+1 TR each)' },
      ],
    },
    {
      id: 'scoring',
      title: 'Victory Points',
      category: 'End Game',
      items: [
        { value: 'Terraform Rating (TR)' },
        { value: '5 VP per milestone' },
        { value: '5 VP (1st) / 2 VP (2nd) per award' },
        { value: '1 VP per greenery' },
        { value: '1 VP per greenery by cities' },
        { value: 'VP on cards' },
      ],
    },
  ],

  faq: [
    {
      id: 'faq-1',
      question: 'Can I raise a parameter that is already maxed?',
      answer:
        'No. Once a parameter reaches maximum (oxygen 14%, temp +8°C, or 9 oceans), it cannot be raised further. Effects that would raise it are ignored.',
    },
    {
      id: 'faq-2',
      question: 'What happens to energy at the end of the generation?',
      answer:
        'ALL energy converts to heat during the production phase, even if you had plans to use it. Plan accordingly.',
    },
    {
      id: 'faq-3',
      question: 'Can I use steel/titanium to pay for any card?',
      answer:
        'No. Steel can only be used for cards with building tags. Titanium can only be used for cards with space tags. Check the card for these tags.',
    },
    {
      id: 'faq-4',
      question: 'Do I get TR for placing greenery from plants?',
      answer:
        'You gain TR when oxygen increases. If oxygen is already at 14%, you still place the greenery but don\'t gain TR.',
    },
    {
      id: 'faq-5',
      question: 'Can I claim multiple milestones in one generation?',
      answer:
        'Yes, if you meet the requirements and pay 8 M€ for each. But only 3 milestones total can be claimed across all players.',
    },
    {
      id: 'faq-6',
      question: 'What if I don\'t have room for ocean tiles I need to place?',
      answer:
        'Ocean tiles must be placed on designated ocean spaces. If all 9 are filled, the effect is ignored.',
    },
    {
      id: 'faq-7',
      question: 'Can I play a card without meeting its requirements?',
      answer:
        'No. Requirements (temperature, oxygen, tags, etc.) shown in the top-left must be met to play the card.',
    },
    {
      id: 'faq-8',
      question: 'Do city tiles give me VP by themselves?',
      answer:
        'No. Cities give you VP based on adjacent greenery tiles (1 VP per adjacent greenery). They also give M€ production bonuses.',
    },
    {
      id: 'faq-9',
      question: 'Can I raise my production tracks above 10?',
      answer:
        'Production tracks go beyond 10 if you flip the cube to the red side (showing 10+). Some games include markers for tracking higher amounts.',
    },
  ],

  turnStructure: [
    {
      id: 'research',
      name: 'Research Phase',
      description: 'Draft or draw cards, buy any for 3 M€ each',
      order: 1,
    },
    {
      id: 'action-phase',
      name: 'Action Phase',
      description: 'Take turns performing 1-2 actions or pass',
      order: 2,
      actions: [
        'Play card',
        'Standard project',
        'Blue card action',
        'Claim milestone',
        'Fund award',
        'Convert plants/heat',
      ],
    },
    {
      id: 'production',
      name: 'Production Phase',
      description: 'Convert energy to heat, gain resources from production',
      order: 3,
    },
  ],

  phases: [
    {
      id: 'generation',
      name: 'Generation',
      order: 1,
      description: 'Repeating round structure',
    },
  ],

  scoring: {
    categories: [
      {
        id: 'terraform-rating',
        name: 'Terraform Rating',
        icon: 'globe',
        description: '1 VP per TR at game end',
      },
      {
        id: 'milestones',
        name: 'Milestones',
        icon: 'flag',
        description: '5 VP per claimed milestone',
        step: 5,
      },
      {
        id: 'awards',
        name: 'Awards',
        icon: 'trophy',
        description: '5 VP (1st) or 2 VP (2nd) per funded award',
      },
      {
        id: 'greenery',
        name: 'Greenery Tiles',
        icon: 'tree',
        description: '1 VP per greenery tile you placed',
      },
      {
        id: 'city',
        name: 'City Adjacency',
        icon: 'city',
        description: '1 VP per greenery adjacent to your cities',
      },
      {
        id: 'cards',
        name: 'Card Points',
        icon: 'card',
        description: 'VP shown on played cards',
      },
    ],
    finalScoringOnly: true,
    trackDuringGame: false,
  },

  resources: [
    {
      id: 'megacredits',
      name: 'MegaCredits',
      icon: 'currency',
      color: '#FDD835',
      perPlayer: true,
    },
    {
      id: 'steel',
      name: 'Steel',
      icon: 'steel',
      color: '#795548',
      perPlayer: true,
    },
    {
      id: 'titanium',
      name: 'Titanium',
      icon: 'titanium',
      color: '#424242',
      perPlayer: true,
    },
    {
      id: 'plants',
      name: 'Plants',
      icon: 'plant',
      color: '#4CAF50',
      perPlayer: true,
    },
    {
      id: 'energy',
      name: 'Energy',
      icon: 'lightning',
      color: '#9C27B0',
      perPlayer: true,
    },
    {
      id: 'heat',
      name: 'Heat',
      icon: 'fire',
      color: '#F44336',
      perPlayer: true,
    },
    {
      id: 'terraform-rating',
      name: 'Terraform Rating',
      icon: 'star',
      color: '#FF9800',
      perPlayer: true,
    },
  ],

  assets: {
    icon: 'terraforming-mars-icon',
    colorScheme: terraformingMarsPalette,
  },
};
