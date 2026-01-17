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

**October 2, 1900** — 28 years to the day since the London eccentric Phileas Fogg accepted and won a £20,000 bet that he could travel around the world in 80 days. Now, at the dawn of the 20th century, some old friends have gathered to celebrate Fogg's impetuous and lucrative gamble—and to make a new wager of their own.

The stakes: $1 million in a winner-takes-all competition. The objective: to see which of them can travel by rail to the most cities in North America in just 7 days.

**Goal:** Score the most points by:
- Claiming railway routes between cities
- Completing your destination ticket connections
- Building the longest continuous path of routes

**Game End:** When any player has 2 or fewer train pieces left at the end of their turn, each player (including that player) takes one final turn. Then the game ends and final scoring occurs.
      `.trim(),
    },
    {
      id: 'setup',
      title: 'Setup',
      order: 2,
      content: `
# Setup

1. **Place the game board** in the center of the table showing the map of North America with its many colored routes

2. **Each player takes:**
   - 45 colored train pieces of their chosen color and places them in front of them
   - 1 matching scoring marker, placed on the start space (0) of the scoring track
   - 4 train car cards drawn randomly from the shuffled deck

3. **Setup the train car cards:**
   - Shuffle the 110 train car cards thoroughly
   - Deal 4 cards to each player (already given above)
   - Place the remaining cards face-down as a draw pile
   - Turn 5 cards from the top of the deck face-up next to the draw pile

4. **Setup destination tickets:**
   - Shuffle the 30 destination ticket cards
   - Deal 3 destination tickets to each player
   - Each player looks at their tickets and must keep at least 2 (may keep all 3)
   - Return any discarded tickets to the bottom of the deck
   - Place the destination ticket deck near the board

5. **Determine first player:** The most experienced traveler (or choose randomly). Play proceeds clockwise.
      `.trim(),
      tags: ['setup'],
    },
    {
      id: 'turn-structure',
      title: 'Turn Structure',
      order: 3,
      content: `
# On Your Turn

On your turn, you must perform **ONE and ONLY ONE** of these three actions:

## 1. Draw Train Car Cards

You may draw **2 train car cards** using one of these methods:

**Drawing Face-Down:**
- Draw 2 cards from the top of the face-down deck (you don't know what you're getting)

**Drawing Face-Up:**
- Take any 1 face-up card, then draw 1 more card (either face-up or face-down)
- OR take 2 face-up cards

**Special Locomotive Rule:**
- **Locomotives are wild cards** that can be any color
- If you take a **face-up locomotive**, that is your entire turn—you don't get a second card
- If you draw a locomotive from the face-down deck (blind), you still get to draw a second card

**Refilling Face-Up Cards:**
- After you finish drawing, replace any taken face-up cards from the deck
- If 3 or more of the face-up cards are locomotives, immediately discard all 5 and deal 5 new cards

## 2. Claim a Route

To claim a route between two adjacent cities:

1. **Play train car cards** from your hand matching:
   - The **number of spaces** on the route (e.g., 3 spaces = play 3 cards)
   - The **color** of the route (all cards must match the route color)
   - For **gray routes**, play any single color of your choice (all cards still must match each other)
   - **Locomotives (wild)** can substitute for any color

2. **Place your train pieces** on each space of the route

3. **Score points immediately** by moving your marker on the scoring track:
   - 1 space: 1 point
   - 2 spaces: 2 points
   - 3 spaces: 4 points
   - 4 spaces: 7 points
   - 5 spaces: 10 points
   - 6 spaces: 15 points

4. **Discard the played cards** to the discard pile

## 3. Draw Destination Tickets

1. Draw **3 destination ticket cards** from the top of the destination ticket deck
2. Look at all three tickets
3. **Keep at least 1** of the 3 tickets (you may keep 2 or all 3 if you wish)
4. Return any unwanted tickets to the **bottom** of the destination ticket deck

**Important:** Destination tickets show two cities and a point value. At game end:
- **Completed tickets** (cities connected by your routes): **Add** points
- **Incomplete tickets** (cities not connected): **Subtract** points
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
      question: 'What happens if I draw tickets and can\'t complete any?',
      answer:
        'You must keep at least 1 ticket whenever you draw destination tickets. Choose the one that seems most achievable or worth the most points, even if it\'s risky.',
    },
    {
      id: 'faq-3',
      question: 'Can I claim both routes between two cities?',
      answer:
        'No. A single player can never claim both parallel routes between the same two cities. In 2-3 player games, only one of the two routes can be claimed by anyone.',
    },
    {
      id: 'faq-4',
      question: 'Do my destination tickets have to use the shortest path?',
      answer:
        'No! As long as your routes create a continuous connection between the two cities, the ticket is completed. You can take the long way around the entire map if needed.',
    },
    {
      id: 'faq-5',
      question: 'What if the train card deck runs out?',
      answer:
        'Shuffle the discarded train car cards to create a new deck. If there are no discarded cards and the deck is empty, you can only draw from available face-up cards.',
    },
    {
      id: 'faq-6',
      question: 'Can I claim a 1-train route just to block my opponent?',
      answer:
        'Yes! Claiming short routes to block opponents is a valid (if somewhat mean) strategy, though it won\'t earn many points.',
    },
    {
      id: 'faq-7',
      question: 'If 3 or more face-up cards are locomotives, what happens?',
      answer:
        'Immediately discard all 5 face-up cards and deal 5 new ones before any player draws. This prevents the face-up row from having too many locomotives.',
    },
    {
      id: 'faq-8',
      question: 'Does the longest path have to connect to my destination tickets?',
      answer:
        'No. The longest continuous path bonus is completely separate from destination tickets. It\'s simply your longest chain of connected routes, regardless of your tickets.',
    },
    {
      id: 'faq-9',
      question: 'Can multiple players win the longest path bonus?',
      answer:
        'Yes! If multiple players tie for the longest continuous path, they all receive the +10 point bonus.',
    },
    {
      id: 'faq-10',
      question: 'Can I draw a face-up locomotive as my second card?',
      answer:
        'No. If you want to take a face-up locomotive, it must be the only card you draw that turn (it counts as both your cards). You cannot take it as a second card.',
    },
    {
      id: 'faq-11',
      question: 'In a 2-3 player game, which double route can be claimed?',
      answer:
        'Only one of the two parallel routes can be claimed between any two cities. Whoever claims one first blocks the other route for the rest of the game.',
    },
    {
      id: 'faq-12',
      question: 'Can I look at my destination tickets during the game?',
      answer:
        'Yes! Your destination tickets are private information. You can look at them anytime and should keep them secret from other players until final scoring.',
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
    cardCover: {
      image: 'game://ticket-to-ride/card-cover.jpg',
      tagline: 'Cross-Country Train Adventure',
      themeIcon: 'train',
    },
  },
};
