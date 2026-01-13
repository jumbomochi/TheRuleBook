# TheRuleBook - Board Game Companion App

## Project Overview

A mobile companion app for euro-style board games, targeting iPad as the primary platform. The app serves two main purposes:
1. **Rule Explainer** - Quick access to game rules, FAQs, and visual guides
2. **Game Companion** - Scoring, turn tracking, timers, and resource management

## Tech Stack

- **Framework**: React Native with Expo (cross-platform, iPad-optimized)
- **Language**: TypeScript
- **State Management**: Zustand (lightweight, simple)
- **Local Storage**: AsyncStorage + SQLite for game data
- **UI Components**: React Native Paper or Tamagui (Material Design / customizable)
- **Navigation**: React Navigation

## Core Features

### Rule Explainer
- Searchable rules database per game
- Quick reference cards for common rules
- Turn order/phase summaries
- Visual diagrams and examples
- FAQ sections with common questions
- Bookmark/favorite frequently accessed rules

### Game Companion
- **Score Tracking**: Per-player scoring with history
- **Turn Tracker**: Current player indicator, turn order management
- **Timers**: Per-turn timers, game timers, sand timer replacements
- **Resource Counters**: Track in-game resources, money, VP tokens
- **Player Management**: Add/remove players, assign colors, save player profiles
- **Game State**: Save/resume games in progress

### Game Library
- Browse available games
- Search and filter by game type, player count, complexity
- Favorites list
- Recently played

## Data Architecture

### Game Definition Schema
```typescript
interface Game {
  id: string;
  name: string;
  bggId?: number; // BoardGameGeek ID
  playerCount: { min: number; max: number };
  playTime: { min: number; max: number };
  complexity: number; // 1-5 scale
  categories: string[];

  // Rule content
  rules: RuleSection[];
  quickReference: QuickRefCard[];
  faq: FAQItem[];

  // Companion config
  scoring: ScoringConfig;
  resources?: ResourceConfig[];
  phases?: GamePhase[];
}
```

### Session Schema
```typescript
interface GameSession {
  id: string;
  gameId: string;
  players: Player[];
  scores: Record<string, number[]>;
  currentPlayerIndex: number;
  currentPhase?: string;
  turnNumber: number;
  startedAt: Date;
  lastUpdatedAt: Date;
  resources?: Record<string, Record<string, number>>;
}
```

## Directory Structure

```
src/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Main tab navigation
│   │   ├── library.tsx    # Game library
│   │   ├── play.tsx       # Active game session
│   │   └── settings.tsx   # App settings
│   ├── game/[id]/         # Game detail screens
│   │   ├── rules.tsx      # Rules viewer
│   │   ├── setup.tsx      # Game setup
│   │   └── play.tsx       # Active gameplay
│   └── _layout.tsx
├── components/
│   ├── rules/             # Rule display components
│   ├── scoring/           # Score tracking components
│   ├── players/           # Player management
│   └── common/            # Shared UI components
├── data/
│   └── games/             # Game definition JSON files
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
├── services/              # Data access, storage
├── types/                 # TypeScript definitions
└── utils/                 # Helper functions
```

## Design Principles

1. **Offline-First**: All game data available without internet
2. **Large Touch Targets**: Optimized for iPad, usable during gameplay
3. **Dark Mode**: Reduce glare at game tables
4. **Quick Access**: Minimize taps to reach common information
5. **Non-Intrusive**: Complement the physical game, don't replace it

## Initial Games to Support

Start with a few well-known games to establish patterns:
- **Splendor** - Simple scoring, resource tracking
- **Wingspan** - Multi-category scoring, round tracking
- **Terraforming Mars** - Complex scoring, resource management
- **Ticket to Ride** - Route scoring, destination tracking

## Asset Strategy

### Tiered Asset System

The app uses a tiered approach to game visuals:

```typescript
interface GameAssets {
  // Tier 1: Always available (app-provided)
  icon: string;              // App-generated icon or placeholder
  colorScheme: ColorPalette; // Colors extracted/inspired by game

  // Tier 2: Sourced externally (BGG, press kits)
  boxArt?: string;           // Box cover image
  componentPhotos?: string[]; // Board, cards, tokens

  // Tier 3: User-provided
  userPhotos?: string[];     // User's own component photos

  // Tier 4: Licensed (future)
  officialAssets?: OfficialAssetPack;
}
```

### Asset Sources

| Source | Usage | Legal Status |
|--------|-------|--------------|
| BoardGameGeek API | Box art, thumbnails | Check ToS, attribution required |
| Publisher Press Kits | Marketing images | Usually permitted for fan apps |
| User Photos | Personal game components | User owns their photos |
| Original Designs | UI elements, icons | Fully owned |
| Licensed Assets | Full game artwork | Requires publisher agreement |

### Visual Design Approach

1. **Color Extraction**: Extract dominant colors from box art to theme each game's UI
2. **Component Templates**: Provide styled templates users can populate with photos
3. **Iconography**: Create a consistent icon set for game mechanics (VP, resources, etc.)
4. **Typography**: Use fonts that complement board game aesthetics (clean, readable)

### Asset Pipeline

```
assets/
├── games/
│   └── [game-id]/
│       ├── meta.json        # Color scheme, icon config
│       ├── icon.svg         # App-generated icon
│       ├── box-art.jpg      # Cached from BGG/press kit
│       └── components/      # Component images
├── shared/
│   ├── icons/              # Mechanic icons (VP, coins, etc.)
│   ├── backgrounds/        # Textured backgrounds
│   └── templates/          # Score sheet templates
└── user/
    └── [game-id]/          # User-uploaded photos
```

### Caching Strategy

- Box art cached on first view
- User photos stored locally
- Offline bundle includes essential icons and templates
- Optional "download all assets" for full offline use

### Future: Publisher Partnerships

Structure the asset system to support official asset packs:

```typescript
interface OfficialAssetPack {
  publisher: string;
  version: string;
  assets: {
    cards?: CardAsset[];
    tokens?: TokenAsset[];
    boards?: BoardAsset[];
    rulebook?: string; // PDF or structured content
  };
  license: LicenseInfo;
}
```

## Development Phases

### Phase 1: Foundation
- Project setup with Expo
- Core navigation structure
- Basic game data schema
- Single game implementation (Splendor)

### Phase 2: Rule System
- Rule content rendering (markdown support)
- Search functionality
- Quick reference cards
- Bookmarking

### Phase 3: Game Companion
- Score tracking
- Player management
- Turn/phase tracking
- Session save/resume

### Phase 4: Polish
- Additional games
- iPad-specific optimizations
- Animations and transitions
- Offline sync improvements

## Commands

```bash
# Development
npm start              # Start Expo dev server
npm run ios            # Run on iOS simulator
npm run lint           # Run ESLint
npm run typecheck      # Run TypeScript checks

# Testing
npm test               # Run Jest tests
```

## Code Style

- Use functional components with hooks
- Prefer named exports
- Keep components small and focused
- Co-locate tests with components
- Use TypeScript strict mode
