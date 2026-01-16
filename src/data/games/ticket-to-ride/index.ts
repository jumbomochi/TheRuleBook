import { Game } from '../../../types/game';
import { ColorPalette } from '../../../types/assets';

const ticketToRidePalette: ColorPalette = {
  primary: '#1565C0',
  secondary: '#D32F2F',
  accent: '#F9A825',
  background: '#1A1A1A',
  surface: '#2D2D2D',
  text: '#FFFFFF',
  textSecondary: '#BDBDBD',
};

export const ticketToRide: Game = {
  id: 'ticket-to-ride',
  name: 'Ticket to Ride',
  bggId: 9209,
  publisher: 'Days of Wonder',
  playerCount: { min: 2, max: 5 },
  playTime: { min: 30, max: 60 },
  complexity: 1.9,
  categories: ['Trains', 'Travel', 'Route Building'],
  mechanics: ['Set Collection', 'Hand Management', 'Route Building', 'Network Building'],

  rules: [
    {
      id: 'overview',
      title: 'Overview',
      order: 1,
      content: `
# Game Overview

Ticket to Ride is a cross-country train adventure where players collect train cards to claim railway routes connecting cities across North America. The longer the routes, the more points they earn.

**Goal:** Score the most points by claiming routes, completing destination tickets, and building the longest continuous path.

**Game End:** When any player has 2 or fewer train pieces left at the end of their turn, each player (including that player) takes one final turn, then the game ends.
      `.trim(),
    },
    {
      id: 'setup',
      title: 'Setup',
      order: 2,
      content: `
# Setup

1. **Place the game board** in the center showing the map of North America

2. **Each player receives:**
   - 45 colored train pieces
   - 4 train car cards
   - 3 destination ticket cards (keep at least 2, may keep all 3)
   - 1 scoring marker (place on start space)

3. **Setup card decks:**
   - Shuffle train car deck, deal 4 cards to each player
   - Turn 5 train car cards face-up next to deck
   - Shuffle destination ticket deck, place near board

4. **Determine first player:** The most experienced traveler goes first (or choose randomly)

5. **Play proceeds clockwise** from the first player
      `.trim(),
      tags: ['setup'],
    },
    {
      id: 'turn-structure',
      title: 'Turn Structure',
      order: 3,
      content: `
# On Your Turn

Choose **ONE** of the following three actions:

## 1. Draw Train Car Cards

**Option A:** Draw 2 cards from the face-down deck
**Option B:** Take 1 face-up card and 1 from deck (or 2 face-up)

**Locomotive (Wild) Rule:** Locomotives are wild cards. If you take a face-up locomotive, that's your entire turn (you don't draw a second card).

**Refill:** After drawing, refill face-up cards to 5. If 3+ are locomotives, discard all 5 and draw 5 new ones.

## 2. Claim a Route

Play a set of train car cards matching the route's color and length to claim that route:

1. **Play cards** from your hand matching:
   - The route's **color** (or gray/any color for gray routes)
   - The route's **length** (number of spaces)
2. **Place your train pieces** on all spaces of that route
3. **Score points** immediately based on route length:
   - 1 train: 1 point
   - 2 trains: 2 points
   - 3 trains: 4 points
   - 4 trains: 7 points
   - 5 trains: 10 points
   - 6 trains: 15 points
4. **Discard** the played cards

**Locomotives:** Can substitute for any color.

## 3. Draw Destination Tickets

Draw 3 destination ticket cards from the deck. Keep at least 1, return unwanted cards to the bottom of the deck.

**Important:** Completed tickets are worth points at game end. Uncompleted tickets are negative points.
      `.trim(),
      tags: ['actions', 'turn'],
    },
    {
      id: 'routes',
      title: 'Routes & Special Cases',
      order: 4,
      content: `
# Claiming Routes

## Route Colors
- **Colored routes:** Must play cards of that color (or locomotives)
- **Gray routes:** Can play any single color (all cards must match)

## Double Routes
Some cities are connected by two parallel routes:
- **In 2-3 player games:** Only ONE route can be claimed between cities
- **In 4-5 player games:** Both routes can be claimed by different players
- **Rule:** The same player can never claim both routes between cities

## Locomotives
- Wild cards that can substitute for any color
- Worth more when drawing (taking face-up locomotive = entire turn)
- Essential for claiming certain routes

## Ferries
Routes with locomotive symbols require you to play that many locomotives as part of the set. Example: A 4-space ferry with 1 locomotive symbol needs 1 locomotive + 3 matching color cards.
      `.trim(),
      tags: ['routes', 'rules'],
    },
    {
      id: 'destination-tickets',
      title: 'Destination Tickets',
      order: 5,
      content: `
# Destination Tickets

Destination tickets show two cities and a point value. At game end:
- **Completed** (cities connected by your routes): **+** points
- **Incomplete** (cities not connected): **−** points

## Connecting Cities
Cities are connected if you can trace a continuous path of your train pieces between them. The path can go through multiple routes you've claimed.

## Strategy Tips
- Keep tickets you can realistically complete
- Longer routes = more points, but harder to complete
- You can draw more tickets during the game
- Initial tickets: Must keep at least 2 of 3
- Later tickets: Must keep at least 1 of 3

## Revealing Tickets
Keep your destination tickets secret until final scoring.
      `.trim(),
      tags: ['destinations', 'scoring'],
    },
    {
      id: 'end-game',
      title: 'End of Game',
      order: 6,
      content: `
# End of Game Scoring

The game ends when a player has **2 or fewer train pieces** remaining at the end of their turn. Each player, including that player, gets one final turn.

**Final Scoring:**

1. **Route Points:** Sum of points from claimed routes (already scored during game)

2. **Destination Tickets:**
   - Completed tickets: **Add** points shown on ticket
   - Incomplete tickets: **Subtract** points shown on ticket

3. **Longest Continuous Path Bonus:**
   - Player(s) with the longest continuous path of routes: **+10 points**
   - Continuous path = connected routes of your color
   - Does not need to match destination tickets
   - Multiple players can tie and all receive bonus

**Winner:** The player with the most total points wins.

**Tiebreaker:**
1. Most completed destination tickets
2. Longest continuous path bonus (if not already tied)
      `.trim(),
      tags: ['end-game', 'scoring'],
    },
    {
      id: 'longest-path',
      title: 'Longest Continuous Path',
      order: 7,
      content: `
# Calculating Longest Path

A continuous path is a series of routes you've claimed where each route connects to the next.

**Rules:**
- Count the total number of train pieces in your longest path
- Routes must connect end-to-end (can't branch and count both branches)
- You can visit the same city multiple times
- Loops are allowed

**Example:**
If you claimed Seattle-Portland (3) and Portland-San Francisco (5), you could count 8 trains in that path. If you also claimed San Francisco-Los Angeles (3), your longest path could be 11.

**Tip:** Don't count your total trains placed - only the longest single continuous path.
      `.trim(),
      tags: ['longest-path', 'scoring'],
    },
  ],

  quickReference: [
    {
      id: 'actions',
      title: 'Available Actions',
      category: 'Turn',
      items: [
        { label: 'Option 1', value: 'Draw 2 train cards' },
        { label: 'Option 2', value: 'Claim a route' },
        { label: 'Option 3', value: 'Draw 3 destination tickets (keep 1+)' },
      ],
    },
    {
      id: 'route-points',
      title: 'Route Scoring',
      category: 'Scoring',
      items: [
        { label: '1 train', value: '1 point' },
        { label: '2 trains', value: '2 points' },
        { label: '3 trains', value: '4 points' },
        { label: '4 trains', value: '7 points' },
        { label: '5 trains', value: '10 points' },
        { label: '6 trains', value: '15 points' },
      ],
    },
    {
      id: 'rules',
      title: 'Key Rules',
      category: 'Rules',
      items: [
        { value: 'Taking face-up locomotive = whole turn' },
        { value: 'Gray routes = any single color' },
        { value: 'Double routes: 1 per player' },
        { value: 'Locomotives are wild cards' },
      ],
    },
    {
      id: 'destinations',
      title: 'Destination Tickets',
      category: 'Tickets',
      items: [
        { value: 'Initial: Keep 2-3 of 3 drawn' },
        { value: 'Later: Keep 1+ of 3 drawn' },
        { value: 'Completed: + points' },
        { value: 'Incomplete: − points' },
      ],
    },
    {
      id: 'end-game',
      title: 'End Game',
      category: 'Scoring',
      items: [
        { value: 'Trigger: 2 or fewer trains left' },
        { value: 'Each player gets 1 final turn' },
        { value: 'Longest path: +10 points' },
        { value: 'Tiebreaker: Most tickets completed' },
      ],
    },
  ],

  faq: [
    {
      id: 'faq-1',
      question: 'Can I claim a route with locomotives only?',
      answer:
        'Yes! Locomotives are wild and can be used for any color. You can claim any route using only locomotives if you have enough.',
    },
    {
      id: 'faq-2',
      question: 'What happens if I draw tickets and can\'t keep any?',
      answer:
        'You must keep at least 1 ticket whenever you draw. Choose the one that seems most achievable or worth the most points.',
    },
    {
      id: 'faq-3',
      question: 'Can I claim both routes between two cities?',
      answer:
        'No. A single player can never claim both parallel routes between the same two cities.',
    },
    {
      id: 'faq-4',
      question: 'Do my destination tickets have to use the shortest path?',
      answer:
        'No! As long as your routes create a continuous connection between the two cities, the ticket is completed. You can take the long way.',
    },
    {
      id: 'faq-5',
      question: 'What if the train card deck runs out?',
      answer:
        'Shuffle the discarded train cards to create a new deck. If there are no discards, you cannot draw from the deck (can only take face-up cards).',
    },
    {
      id: 'faq-6',
      question: 'Can I claim a 1-train route to block my opponent?',
      answer:
        'Yes! Claiming short routes to block opponents is a valid strategy, though it may not earn many points.',
    },
    {
      id: 'faq-7',
      question: 'If all face-up cards are locomotives, can I take 2?',
      answer:
        'No. The moment 3 or more face-up cards are locomotives, discard all 5 and draw 5 new ones. Then you can take face-up cards normally.',
    },
    {
      id: 'faq-8',
      question: 'Does the longest path have to connect to my destination tickets?',
      answer:
        'No. The longest continuous path bonus is separate from destination tickets. It\'s simply your longest chain of connected routes.',
    },
    {
      id: 'faq-9',
      question: 'Can multiple players win the longest path bonus?',
      answer:
        'Yes! If multiple players tie for the longest path, they all receive the +10 point bonus.',
    },
  ],

  turnStructure: [
    {
      id: 'choose-action',
      name: 'Choose Action',
      description: 'Select one of three possible actions',
      order: 1,
      actions: [
        'Draw train car cards',
        'Claim a route',
        'Draw destination tickets',
      ],
    },
    {
      id: 'execute-action',
      name: 'Execute Action',
      description: 'Perform the chosen action completely',
      order: 2,
    },
    {
      id: 'check-end',
      name: 'Check Game End',
      description: 'If you have 2 or fewer trains, game ends after this round',
      order: 3,
      optional: true,
    },
  ],

  phases: [
    {
      id: 'game-play',
      name: 'Game Play',
      order: 1,
      description: 'Players take turns until someone has 2 or fewer trains',
    },
    {
      id: 'final-round',
      name: 'Final Round',
      order: 2,
      description: 'Each player takes one final turn',
    },
    {
      id: 'final-scoring',
      name: 'Final Scoring',
      order: 3,
      description: 'Reveal tickets, calculate longest path, determine winner',
    },
  ],

  scoring: {
    categories: [
      {
        id: 'routes',
        name: 'Claimed Routes',
        icon: 'train',
        description: 'Points from routes claimed during the game',
      },
      {
        id: 'destinations-completed',
        name: 'Completed Destinations',
        icon: 'ticket',
        description: 'Points from completed destination tickets',
      },
      {
        id: 'destinations-failed',
        name: 'Failed Destinations',
        icon: 'close',
        description: 'Negative points from incomplete tickets',
      },
      {
        id: 'longest-path',
        name: 'Longest Path Bonus',
        icon: 'route',
        description: '10 points for longest continuous path',
        step: 10,
      },
    ],
    finalScoringOnly: false,
    trackDuringGame: true,
  },

  resources: [
    {
      id: 'train-pieces',
      name: 'Train Pieces',
      icon: 'train',
      color: '#424242',
      perPlayer: true,
    },
    {
      id: 'pink-cards',
      name: 'Pink Train Cards',
      icon: 'card',
      color: '#E91E63',
      perPlayer: false,
    },
    {
      id: 'white-cards',
      name: 'White Train Cards',
      icon: 'card',
      color: '#FFFFFF',
      perPlayer: false,
    },
    {
      id: 'blue-cards',
      name: 'Blue Train Cards',
      icon: 'card',
      color: '#2196F3',
      perPlayer: false,
    },
    {
      id: 'yellow-cards',
      name: 'Yellow Train Cards',
      icon: 'card',
      color: '#FDD835',
      perPlayer: false,
    },
    {
      id: 'orange-cards',
      name: 'Orange Train Cards',
      icon: 'card',
      color: '#FF9800',
      perPlayer: false,
    },
    {
      id: 'black-cards',
      name: 'Black Train Cards',
      icon: 'card',
      color: '#212121',
      perPlayer: false,
    },
    {
      id: 'red-cards',
      name: 'Red Train Cards',
      icon: 'card',
      color: '#F44336',
      perPlayer: false,
    },
    {
      id: 'green-cards',
      name: 'Green Train Cards',
      icon: 'card',
      color: '#4CAF50',
      perPlayer: false,
    },
    {
      id: 'locomotive-cards',
      name: 'Locomotive Cards (Wild)',
      icon: 'star',
      color: '#9C27B0',
      perPlayer: false,
    },
  ],

  assets: {
    icon: 'ticket-to-ride-icon',
    colorScheme: ticketToRidePalette,
  },
};
