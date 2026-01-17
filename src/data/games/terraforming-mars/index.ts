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

In the 2400s, mankind begins to terraform the planet Mars. Giant corporations, sponsored by the World Government on Earth, initiate huge projects to raise the temperature, oxygen level, and ocean coverage until the environment is habitable.

As one of these corporations, you work together to terraform Mars—but you compete for getting the most victory points through contributing the most to the terraforming process. Victory points are awarded not only for your contribution to the terraforming, but also for advancing human infrastructure throughout the solar system and doing other commendable things.

**Goal:** Have the most victory points when Mars is fully terraformed.

**Game End Condition:** The game ends when all three global parameters are maxed out:
- **Oxygen:** 14%
- **Temperature:** +8°C
- **Oceans:** 9 tiles placed

**Key Concept - Terraform Rating (TR):**
Your Terraform Rating represents both your contribution to terraforming and your victory points:
- Every time you raise a global parameter, your TR increases by 1
- Your TR determines your MegaCredit income each generation
- At game end, TR = Victory Points (1 TR = 1 VP)
      `.trim(),
    },
    {
      id: 'setup',
      title: 'Setup',
      order: 2,
      content: `
# Setup

1. **Place the game board** in the center with global parameters at starting positions:
   - **Temperature track:** Place white marker at -30°C
   - **Oxygen track:** Place white marker at 0%
   - **Oceans:** 0 placed (9 reserved ocean tiles nearby)

2. **Each player receives:**
   - 1 player board (for tracking production and resources)
   - Player markers in your chosen color
   - 1 player marker placed on space 20 of the TR track (or 1 if playing as Beginner Corporation)

3. **Corporation selection:**
   - **Standard game:** Each player draws 2 corporation cards, chooses 1 to play, and discards the other
   - **Beginner variant:** Play without corporations (start with 0 production on everything, TR 20, 42 M€)

4. **Initial card draft:**
   - Each player draws 10 project cards from the deck
   - Each player may **buy** any of these cards for **3 M€ each**
   - You start with M€ equal to your corporation's starting M€ (or 42 for Beginner Corp)
   - Discard unbought cards

5. **Production setup:**
   - Set your production tracks according to your corporation card
   - Place resource cubes on your player board for starting resources shown on your corporation

6. **First Generation:**
   - Determine starting player randomly
   - Play proceeds clockwise
   - **Note:** In the first generation, skip the Research Phase
      `.trim(),
      tags: ['setup'],
    },
    {
      id: 'generation-structure',
      title: 'Generation Structure',
      order: 3,
      content: `
# Generation (Round) Structure

Each generation (round) consists of 4 phases that all players go through:

## Phase 1: Player Order
Move the first player marker clockwise to the next player. That player will start the action phase.

## Phase 2: Research Phase
*(Skip this phase in the first generation)*

All players simultaneously draw 4 project cards from the deck and decide which to buy:
- Look at all 4 cards
- Buy any you want for **3 M€ each**
- Add bought cards to your hand
- Discard unbought cards face-down

**Optional Variant - Drafting:** Instead of drawing individually, draft cards:
1. All players draw 4 cards
2. Choose 1 card to keep, pass the rest to the left
3. Repeat until all cards are chosen
4. Buy any of your 4 cards for 3 M€ each

## Phase 3: Action Phase
Starting with the first player and going clockwise, players take turns performing **1 or 2 actions** (or pass).

**Available Actions:**
1. **Play a card** from your hand (pay its cost, apply its effects immediately)
2. **Use a standard project** (always available actions like building cities)
3. **Claim a milestone** (8 M€, max 3 milestones total in the game)
4. **Fund an award** (8 M€ for first, 14 M€ for second, 20 M€ for third)
5. **Use a blue card action** (activate a blue card's action once per generation)
6. **Convert 8 plants into a greenery tile** (place greenery, raise oxygen if not maxed)
7. **Convert 8 heat to raise temperature** (increase temperature by 1 step if not maxed)

**Important:**
- You may perform 1 or 2 actions per turn (your choice)
- Once you **pass**, you take no more turns this generation
- When all players have passed, move to Production Phase

## Phase 4: Production Phase
All players simultaneously:
1. **Energy → Heat:** All energy cubes convert to heat cubes (move them over)
2. **Gain resources based on production:**
   - **M€:** Gain M€ equal to your TR + your M€ production
   - **Steel, Titanium, Plants, Energy, Heat:** Gain resources equal to your production level

After production, if all three global parameters are maxed, the game ends. Otherwise, start a new generation.
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

Milestones and awards provide additional ways to score victory points at the end of the game.

## Milestones
**Claiming:** Pay **8 M€** as an action when you meet the requirement

**Limit:** Only **3 milestones total** can be claimed in the entire game (by any players)

**Available Milestones:**
- **Terraformer:** Have a TR of at least 35
- **Mayor:** Own at least 3 city tiles
- **Gardener:** Own at least 3 greenery tiles
- **Builder:** Have at least 8 building tags in play
- **Planner:** Have at least 16 cards in hand when you claim this

**Scoring:** Each milestone you claimed is worth **5 VP** at game end.

**Timing:** You must meet the requirement at the moment you claim it. Once claimed, a milestone is yours even if you later fall below the requirement.

## Awards
**Funding:** Pay M€ as an action to fund an award (you don't need to qualify for it)

**Cost:**
- First award funded: **8 M€**
- Second award funded: **14 M€**
- Third award funded: **20 M€**

**Limit:** Maximum **3 awards** can be funded in a game (by any players)

**Available Awards:**
- **Landlord:** Most tiles in play (cities, greeneries, special tiles)
- **Banker:** Highest M€ production
- **Scientist:** Most science tags in play
- **Thermalist:** Most heat resource cubes
- **Miner:** Most combined steel and titanium resource cubes

**Scoring (at game end):**
- **1st place:** 5 VP
- **2nd place:** 2 VP
- Ties: All tied players get the points for that position

**Important:** You can fund an award you might not win. Funding is strategic—it can force opponents to compete in that category or let you score if you're ahead.
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
      question: 'Can I raise a global parameter that is already maxed out?',
      answer:
        'No. Once a parameter reaches maximum (oxygen 14%, temperature +8°C, or 9 ocean tiles placed), it cannot be raised further. Any effects that would raise it are simply ignored, and you don\'t gain TR.',
    },
    {
      id: 'faq-2',
      question: 'What happens to my energy at the end of the generation?',
      answer:
        'ALL energy converts to heat during the production phase automatically. Even if you had plans to use it, it converts. This is mandatory, not optional. Plan accordingly!',
    },
    {
      id: 'faq-3',
      question: 'Can I use steel or titanium to pay for any card?',
      answer:
        'No. Steel (worth 2 M€) can ONLY be used for cards with building tags. Titanium (worth 3 M€) can ONLY be used for cards with space tags. Check the tags on the card before using these resources.',
    },
    {
      id: 'faq-4',
      question: 'Do I get TR when placing a greenery from converting plants?',
      answer:
        'You gain +1 TR only if the oxygen level increases when you place the greenery. If oxygen is already at 14%, you still place the greenery tile but don\'t gain TR.',
    },
    {
      id: 'faq-5',
      question: 'Can I claim multiple milestones in one generation?',
      answer:
        'Yes, if you meet the requirements and pay 8 M€ for each as separate actions. However, only 3 milestones total can be claimed in the entire game across all players.',
    },
    {
      id: 'faq-6',
      question: 'What if there are no ocean spaces left when I need to place an ocean?',
      answer:
        'Ocean tiles must be placed on the 9 designated ocean spaces on the board. If all 9 are filled, any effects that would place oceans are ignored.',
    },
    {
      id: 'faq-7',
      question: 'Can I play a card without meeting its requirements?',
      answer:
        'No. Requirements shown in the top-left of cards (temperature, oxygen level, number of tags, etc.) must be met at the time you play the card. You cannot play cards if you don\'t meet the requirements.',
    },
    {
      id: 'faq-8',
      question: 'Do city tiles give me victory points by themselves?',
      answer:
        'No. Cities themselves don\'t give VP. However, at the end of the game, you score 1 VP for each greenery tile (yours or anyone\'s) adjacent to your city tiles. Cities also provide M€ production bonuses when placed.',
    },
    {
      id: 'faq-9',
      question: 'Can my production tracks go above 10?',
      answer:
        'Yes! Production tracks can go beyond 10. Flip the cube to the red side or use additional markers. Some editions include higher-value cubes for this purpose.',
    },
    {
      id: 'faq-10',
      question: 'Can I take 0 actions and just pass immediately on my turn?',
      answer:
        'Yes. You can pass without taking any actions. Once you pass, you take no more turns this generation. You still participate in the production phase.',
    },
    {
      id: 'faq-11',
      question: 'Do I have to use my blue card actions every generation?',
      answer:
        'No. Blue card actions are optional. You can choose not to use them, and they don\'t carry over to the next generation.',
    },
    {
      id: 'faq-12',
      question: 'Can I fund an award for a category I\'m losing in?',
      answer:
        'Yes! You can fund any award regardless of whether you\'re winning that category. This can be a strategic way to spend M€ and force competition.',
    },
    {
      id: 'faq-13',
      question: 'What happens if the deck of project cards runs out?',
      answer:
        'Shuffle the discard pile to create a new deck. If there are no cards in the discard pile either, no more cards can be drawn.',
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
    cardCover: {
      image: 'game://terraforming-mars/card-cover.jpg',
      tagline: 'Transform the Red Planet',
      themeIcon: 'planet-outline',
    },
  },
};
