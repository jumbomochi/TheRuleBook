# TheRuleBook Implementation Plan
**Date**: January 17, 2026
**Status**: Post-Phase 4 - Quality & Expansion
**Document Version**: 1.0

---

## Executive Summary

TheRuleBook has successfully completed all four planned development phases (Foundation, Rule System, Game Companion, Polish). The app now provides working functionality for rules viewing, scoring, player management, timers, and session persistence across 4 implemented board games (Splendor, Wingspan, Terraforming Mars, Ticket to Ride).

This document outlines the remaining work to transform the current MVP into a production-ready, scalable, and robust application. The focus areas are:

1. **Quality & Reliability** - Testing infrastructure and SQLite implementation
2. **Integration & Expansion** - BGG API and additional game content
3. **User Experience** - Theme switching and UI refinements
4. **Deployment Readiness** - Physical device testing

---

## Current Project Status

### Completed Work

**Phase 1: Foundation** ✅
- React Native with Expo setup
- TypeScript configuration
- Core navigation with Expo Router
- Tab-based navigation structure
- Basic game data schema

**Phase 2: Rule System** ✅
- Markdown-based rule content rendering
- Quick reference card display
- FAQ sections
- Rule navigation and structure
- Bookmark capability (via player profiles)

**Phase 3: Game Companion** ✅
- Score tracking with history
- Player management (add/remove/reorder)
- Turn tracking with current player indicator
- Three timer types (game, turn, sand)
- Resource counters
- Session persistence with AsyncStorage
- Player profile system

**Phase 4: Polish** ✅
- 4 complete game implementations
- Asset service with BGG integration scaffolding
- Component library (EmptyState, HeroImage, StarRating, ThemedGameCard, etc.)
- Rulebook components with illustrations
- Visual theming per game

### Codebase Metrics

- **Total TypeScript Files**: 65 files in `/src`
- **Lines of Code**: ~10,761 (estimated)
- **Games Implemented**: 4 (Splendor, Wingspan, Terraforming Mars, Ticket to Ride)
- **Core Features**: Rules viewer, scoring, player mgmt, timers, sessions
- **State Management**: Zustand (3 stores: gameStore, sessionStore, playerProfileStore)
- **Storage**: AsyncStorage only (SQLite planned but not implemented)

### Known Gaps & Technical Debt

1. **No unit tests** (Issue #2) - Zero test coverage outside node_modules
2. **AsyncStorage only** (Issue #3) - SQLite integration incomplete despite original plans
3. **BGG API partial** (Issue #4) - Service exists but integration not fully functional
4. **Dark mode incomplete** (Issue #5) - No theme toggle or light mode support
5. **Limited game library** (Issue #6) - Only 4 games, need more content
6. **iPad testing needed** (Issue #7) - Development on simulator only

### Uncommitted Work

The following new components and changes are currently staged but uncommitted:
- New common components: `EmptyState`, `GameCardSkeleton`, `HeroImage`, `StarRating`, `ThemedGameCard`
- New game components directory
- `RulebookComponents.tsx` with illustration support
- Updates to existing components and layouts
- Play tab implementation (`app/(tabs)/play.tsx`)
- `app/(tabs)/index.tsx` (new home screen)

**Action Required**: Commit these changes before beginning new work.

---

## Implementation Priority & Dependencies

### Priority Matrix

| Priority | Focus Area | Impact | Effort | Risk |
|----------|-----------|--------|--------|------|
| **P0** | Unit Testing Infrastructure | High | Medium | Low |
| **P0** | Commit Uncommitted Work | Medium | Low | Low |
| **P1** | SQLite Migration | High | High | Medium |
| **P1** | BGG API Integration | Medium | Medium | Medium |
| **P2** | Dark Mode Theme Toggle | Medium | Low | Low |
| **P3** | Additional Games Content | High | High | Low |
| **P3** | iPad Device Testing | Medium | Medium | Low |

### Dependency Graph

```
Commit Uncommitted Work (P0)
    └─> Unit Testing Infrastructure (P0)
            ├─> SQLite Migration (P1)
            │       └─> Additional Games Content (P3)
            │
            ├─> BGG API Integration (P1)
            │       └─> Additional Games Content (P3)
            │
            └─> Dark Mode Theme Toggle (P2)
                    └─> iPad Device Testing (P3)
```

**Key Insights**:
- Testing infrastructure should be established BEFORE making architectural changes
- SQLite migration is a foundational change that impacts future game additions
- BGG integration can proceed in parallel with SQLite work
- Dark mode is independent and can be tackled anytime after testing
- Device testing should happen after UI features are stable

---

## Recommended Implementation Order

### Stage 1: Foundation & Cleanup (P0)
**Goal**: Clean slate and testing infrastructure

1. Commit uncommitted work
2. Establish unit testing infrastructure
3. Write critical path tests

### Stage 2: Architectural Improvements (P1)
**Goal**: Scalable data layer and content pipeline

4. Migrate from AsyncStorage to SQLite
5. Complete BGG API integration
6. Implement asset caching improvements

### Stage 3: User Experience (P2)
**Goal**: Polish and accessibility

7. Implement dark/light theme toggle
8. Add theme persistence
9. Refine iPad-specific layouts

### Stage 4: Content & Validation (P3)
**Goal**: Expand library and validate on hardware

10. Add 3-5 additional board games
11. Conduct iPad device testing
12. Performance profiling and optimization

---

## Detailed Task Breakdown

---

## Task 1: Commit Uncommitted Work

**Issue**: N/A (housekeeping)
**Priority**: P0
**Dependencies**: None

### Context

Multiple new components and changes are currently uncommitted. These include significant functionality that should be saved before proceeding with new work.

### Files Affected

Uncommitted changes:
- `app/(tabs)/play.tsx` (modified)
- `package.json`, `package-lock.json` (dependencies)
- `src/app/(tabs)/_layout.tsx` (modified)
- `src/app/(tabs)/library.tsx` (deleted - needs investigation)
- Multiple component updates
- New components: `EmptyState`, `HeroImage`, `StarRating`, `ThemedGameCard`, `GameCardSkeleton`
- New `src/components/game/` directory
- `src/components/rules/RulebookComponents.tsx`

Untracked files:
- `rulebooks/` directory
- `src/app/(tabs)/index.tsx`
- Multiple new components

### Steps

1. **Review Changes**
   - Run `git status` and `git diff` to review all modifications
   - Verify no accidental debug code or sensitive data
   - Check that deleted files (`library.tsx`) are intentional

2. **Stage Files**
   - Stage all modified files
   - Add new untracked files (components, rulebooks)
   - Verify `.gitignore` is correctly excluding build artifacts

3. **Create Commit**
   - Write descriptive commit message covering:
     - Phase 4 completion
     - New component library additions
     - Rulebook support enhancements
     - Play tab implementation
   - Include co-author attribution if using AI assistance

4. **Verify**
   - Run `git status` to ensure clean working tree
   - Check `git log` to verify commit message quality

### Success Criteria

- [ ] Clean working directory (`git status` shows nothing to commit)
- [ ] All functionality from Phase 4 is committed
- [ ] Commit history is clean and descriptive
- [ ] No build errors after commit

### Notes

- This is a prerequisite for all other tasks
- Ensure the app still runs after committing: `npm start`
- Consider running a quick smoke test on key features

---

## Task 2: Unit Testing Infrastructure (Issue #2)

**Issue**: #2
**Priority**: P0
**Dependencies**: Task 1 (commit work)

### Context

The project currently has zero unit test coverage. Before making architectural changes (SQLite migration) or adding more features, establishing a robust testing infrastructure is critical. This ensures:
- Regression prevention during refactoring
- Confidence when modifying core logic
- Documentation of expected behavior
- Faster debugging cycles

### Test Strategy

**Testing Pyramid**:
- **Unit Tests** (majority): Pure functions, utilities, store logic
- **Component Tests**: React component behavior with Testing Library
- **Integration Tests**: Store + service interactions
- **E2E Tests** (future): Critical user flows with Detox or Maestro

### Tools & Dependencies

Add testing dependencies:
```json
{
  "devDependencies": {
    "@testing-library/react-native": "^12.4.0",
    "@testing-library/jest-native": "^5.4.3",
    "jest": "^29.7.0",
    "jest-expo": "~54.0.0",
    "@types/jest": "^29.5.11"
  }
}
```

Configure Jest in `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "preset": "jest-expo",
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ]
  }
}
```

### Priority Test Coverage

**Phase 1: Core Business Logic (Week 1)**

1. **Store Tests**
   - `src/stores/gameStore.ts`
     - Game loading and retrieval
     - Favorites management
     - Recently played tracking
   - `src/stores/sessionStore.ts`
     - Session creation and persistence
     - Player scoring operations
     - Turn advancement logic
     - Resource tracking
   - `src/stores/playerProfileStore.ts`
     - Profile CRUD operations
     - Bookmark management

2. **Utility Tests**
   - Timer logic utilities
   - Score calculation helpers
   - Date/time formatting
   - Data validation functions

3. **Service Tests**
   - `src/services/assetService.ts`
     - Asset retrieval and caching
     - Color palette generation
     - User photo management
   - `src/services/storageService.ts`
     - AsyncStorage read/write operations
     - Data serialization/deserialization

**Phase 2: Component Tests (Week 2)**

4. **UI Component Tests**
   - `src/components/common/StarRating.tsx`
     - Renders correct number of stars
     - Handles interactive vs display mode
   - `src/components/common/EmptyState.tsx`
     - Shows correct message and icon
     - Action button triggers callback
   - `src/components/scoring/ScoreCard.tsx`
     - Score increment/decrement
     - History tracking display

5. **Integration Tests**
   - Session creation flow (store + storage)
   - Score update flow (UI → store → storage)
   - Game loading with assets (store + asset service)

### Test File Structure

```
src/
├── stores/
│   ├── gameStore.ts
│   ├── gameStore.test.ts
│   ├── sessionStore.ts
│   └── sessionStore.test.ts
├── services/
│   ├── assetService.ts
│   ├── assetService.test.ts
│   ├── storageService.ts
│   └── storageService.test.ts
├── components/
│   ├── common/
│   │   ├── StarRating.tsx
│   │   └── StarRating.test.tsx
│   └── scoring/
│       ├── ScoreCard.tsx
│       └── ScoreCard.test.tsx
└── utils/
    ├── calculations.ts
    └── calculations.test.ts
```

### Steps

1. **Setup Testing Infrastructure**
   - Install Jest, Testing Library, and related dependencies
   - Configure `jest.config.js` or inline config in `package.json`
   - Create test setup file with necessary mocks (AsyncStorage, expo modules)
   - Verify tests run: `npm test`

2. **Write Store Tests**
   - Start with `sessionStore.ts` (most critical business logic)
   - Test state initialization, action creators, computed values
   - Mock AsyncStorage interactions
   - Aim for 80%+ coverage on stores

3. **Write Service Tests**
   - Test `assetService.ts` with mocked file system and network calls
   - Test storage service serialization logic
   - Verify error handling paths

4. **Write Component Tests**
   - Test common components first (StarRating, EmptyState, etc.)
   - Use Testing Library's `render`, `fireEvent`, `waitFor`
   - Focus on user-visible behavior, not implementation details

5. **Setup CI Integration (Future)**
   - Run tests on every commit
   - Block PRs with failing tests
   - Generate coverage reports

### Success Criteria

- [ ] Jest runs successfully with `npm test`
- [ ] All 3 Zustand stores have unit tests with 80%+ coverage
- [ ] Core services (assetService, storageService) have tests
- [ ] At least 5 UI components have component tests
- [ ] Test suite runs in under 30 seconds
- [ ] Documentation on writing/running tests added to README

### Testing Best Practices

- **Arrange-Act-Assert** pattern for clarity
- **Mock external dependencies** (file system, network, AsyncStorage)
- **Test user behavior**, not implementation details
- **Avoid snapshot tests** for complex components (they're brittle)
- **Use descriptive test names**: `it('should increment score when plus button is pressed')`

### Example Test

```typescript
// src/stores/sessionStore.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { useSessionStore } from './sessionStore';

describe('sessionStore', () => {
  beforeEach(() => {
    // Reset store state between tests
    useSessionStore.setState({ sessions: [], currentSession: null });
  });

  it('should create a new session with players', () => {
    const { result } = renderHook(() => useSessionStore());

    act(() => {
      result.current.createSession('splendor', ['Alice', 'Bob']);
    });

    expect(result.current.currentSession).toBeDefined();
    expect(result.current.currentSession?.players).toHaveLength(2);
    expect(result.current.currentSession?.gameId).toBe('splendor');
  });

  it('should advance to next player on turn end', () => {
    const { result } = renderHook(() => useSessionStore());

    act(() => {
      result.current.createSession('splendor', ['Alice', 'Bob']);
      result.current.advanceTurn();
    });

    expect(result.current.currentSession?.currentPlayerIndex).toBe(1);
  });
});
```

---

## Task 3: SQLite Migration (Issue #3)

**Issue**: #3
**Priority**: P1
**Dependencies**: Task 2 (testing infrastructure)

### Context

The original architecture document specified SQLite for game data storage, but the implementation currently uses only AsyncStorage. While AsyncStorage works for simple key-value storage, SQLite provides:
- **Structured queries** for filtering/sorting games
- **Better performance** for large datasets (100+ games)
- **Relational data** for sessions, players, scores
- **Transaction support** for data integrity
- **Indexing** for fast lookups

As the game library grows, AsyncStorage's limitations will become apparent. Migrating to SQLite now prevents painful refactoring later.

### Architecture Decision

**Hybrid Approach** (Recommended):
- **SQLite**: Game metadata, sessions, player profiles, scores
- **AsyncStorage**: User preferences, UI state, cache metadata

This leverages SQLite's strengths for structured data while keeping AsyncStorage for simple settings.

### Data Schema Design

**Games Table**
```sql
CREATE TABLE games (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bgg_id INTEGER,
  publisher TEXT,
  min_players INTEGER NOT NULL,
  max_players INTEGER NOT NULL,
  min_play_time INTEGER,
  max_play_time INTEGER,
  complexity REAL,
  categories TEXT, -- JSON array
  mechanics TEXT, -- JSON array
  is_favorite INTEGER DEFAULT 0,
  last_played_at INTEGER,
  times_played INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX idx_games_favorite ON games(is_favorite);
CREATE INDEX idx_games_last_played ON games(last_played_at);
CREATE INDEX idx_games_name ON games(name);
```

**Sessions Table**
```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,
  current_player_index INTEGER DEFAULT 0,
  current_phase TEXT,
  turn_number INTEGER DEFAULT 1,
  started_at INTEGER NOT NULL,
  last_updated_at INTEGER NOT NULL,
  ended_at INTEGER,
  winner_player_id TEXT,
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_game_id ON sessions(game_id);
CREATE INDEX idx_sessions_started_at ON sessions(started_at);
```

**Session Players Table**
```sql
CREATE TABLE session_players (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  player_profile_id TEXT,
  player_name TEXT NOT NULL,
  player_color TEXT,
  turn_order INTEGER NOT NULL,
  final_score INTEGER,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (player_profile_id) REFERENCES player_profiles(id) ON DELETE SET NULL
);

CREATE INDEX idx_session_players_session ON session_players(session_id);
```

**Scores Table**
```sql
CREATE TABLE scores (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  player_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  value INTEGER NOT NULL,
  round INTEGER,
  recorded_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (player_id) REFERENCES session_players(id) ON DELETE CASCADE
);

CREATE INDEX idx_scores_session_player ON scores(session_id, player_id);
```

**Player Profiles Table**
```sql
CREATE TABLE player_profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  avatar TEXT,
  preferred_color TEXT,
  games_played INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX idx_player_profiles_name ON player_profiles(name);
```

**Bookmarks Table**
```sql
CREATE TABLE bookmarks (
  id TEXT PRIMARY KEY,
  player_profile_id TEXT NOT NULL,
  game_id TEXT NOT NULL,
  rule_section_id TEXT NOT NULL,
  note TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (player_profile_id) REFERENCES player_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
  UNIQUE(player_profile_id, game_id, rule_section_id)
);

CREATE INDEX idx_bookmarks_player_game ON bookmarks(player_profile_id, game_id);
```

### Implementation Steps

**Step 1: Add SQLite Dependencies**

Install expo-sqlite:
```bash
npm install expo-sqlite
```

Update `app.json` to include SQLite plugin.

**Step 2: Create Database Service**

Create `src/services/database.ts`:
```typescript
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'therulebook.db';
const DB_VERSION = 1;

let db: SQLite.SQLiteDatabase | null = null;

export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  db = await SQLite.openDatabaseAsync(DB_NAME);

  await runMigrations(db);

  return db;
}

async function runMigrations(database: SQLite.SQLiteDatabase): Promise<void> {
  // Check current version
  const result = await database.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion < 1) {
    await applyMigration1(database);
  }

  // Future migrations: if (currentVersion < 2) { ... }
}

async function applyMigration1(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    -- Create tables (schema from above)
    CREATE TABLE IF NOT EXISTS games (...);
    CREATE TABLE IF NOT EXISTS sessions (...);
    -- etc.

    PRAGMA user_version = 1;
  `);
}

export function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) throw new Error('Database not initialized');
  return db;
}
```

**Step 3: Create Repository Layer**

Create `src/repositories/` directory with repository classes:

- `GameRepository.ts`: CRUD operations for games
- `SessionRepository.ts`: Session management
- `PlayerProfileRepository.ts`: Player profile operations
- `BookmarkRepository.ts`: Bookmark operations

Example:
```typescript
// src/repositories/GameRepository.ts
import { getDatabase } from '../services/database';
import { Game } from '../types/game';

export class GameRepository {
  async getAllGames(): Promise<Game[]> {
    const db = getDatabase();
    const rows = await db.getAllAsync('SELECT * FROM games ORDER BY name');
    return rows.map(row => this.mapRowToGame(row));
  }

  async getGameById(id: string): Promise<Game | null> {
    const db = getDatabase();
    const row = await db.getFirstAsync('SELECT * FROM games WHERE id = ?', [id]);
    return row ? this.mapRowToGame(row) : null;
  }

  async toggleFavorite(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      'UPDATE games SET is_favorite = NOT is_favorite WHERE id = ?',
      [id]
    );
  }

  private mapRowToGame(row: any): Game {
    // Map SQL row to Game type
    // Parse JSON fields (categories, mechanics)
    // Load rules/FAQ/etc. from static data files
  }
}
```

**Step 4: Update Zustand Stores**

Modify stores to use repositories instead of AsyncStorage:

```typescript
// src/stores/gameStore.ts (updated)
import { GameRepository } from '../repositories/GameRepository';

const gameRepository = new GameRepository();

export const useGameStore = create<GameStore>((set, get) => ({
  games: [],

  async loadGames() {
    const games = await gameRepository.getAllGames();
    set({ games });
  },

  async toggleFavorite(gameId: string) {
    await gameRepository.toggleFavorite(gameId);
    await get().loadGames(); // Refresh
  },

  // ... other methods
}));
```

**Step 5: Data Migration**

Create migration script to move existing AsyncStorage data to SQLite:

```typescript
// src/services/dataMigration.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameRepository } from '../repositories/GameRepository';

export async function migrateFromAsyncStorage(): Promise<void> {
  const migrationKey = '@TheRuleBook:migrated_to_sqlite';
  const alreadyMigrated = await AsyncStorage.getItem(migrationKey);

  if (alreadyMigrated) return;

  // Load existing data from AsyncStorage
  const sessionsJson = await AsyncStorage.getItem('@TheRuleBook:sessions');
  const profilesJson = await AsyncStorage.getItem('@TheRuleBook:profiles');

  if (sessionsJson) {
    const sessions = JSON.parse(sessionsJson);
    // Insert into SQLite...
  }

  if (profilesJson) {
    const profiles = JSON.parse(profilesJson);
    // Insert into SQLite...
  }

  // Mark as migrated
  await AsyncStorage.setItem(migrationKey, 'true');
}
```

**Step 6: Update App Initialization**

Modify `src/app/_layout.tsx` to initialize database:

```typescript
import { initDatabase } from '../services/database';
import { migrateFromAsyncStorage } from '../services/dataMigration';

export default function RootLayout() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await initDatabase();
      await migrateFromAsyncStorage();
      setDbReady(true);
    }
    prepare();
  }, []);

  if (!dbReady) return <SplashScreen />;

  return <MainApp />;
}
```

**Step 7: Write Tests**

Write unit tests for:
- Database initialization
- Each repository method
- Data migration logic
- Store integration with repositories

**Step 8: Populate Game Data**

Create seed script to populate games table from existing game definitions:

```typescript
// scripts/seedGames.ts
import { GameRepository } from '../src/repositories/GameRepository';
import splendor from '../src/data/games/splendor';
import wingspan from '../src/data/games/wingspan';
// ... other games

export async function seedGames() {
  const repo = new GameRepository();

  await repo.insertGame(splendor);
  await repo.insertGame(wingspan);
  // ...
}
```

### Steps Summary

1. Install `expo-sqlite` dependency
2. Create database service with schema and migrations
3. Implement repository layer (GameRepository, SessionRepository, etc.)
4. Update Zustand stores to use repositories
5. Create AsyncStorage → SQLite migration script
6. Update app initialization to prepare database
7. Write unit tests for database layer
8. Seed initial game data
9. Remove old AsyncStorage-based persistence code
10. Test thoroughly on iOS simulator and device

### Success Criteria

- [ ] SQLite database initializes on app start
- [ ] All game metadata stored in `games` table
- [ ] Sessions and scores persist across app restarts
- [ ] Player profiles stored in `player_profiles` table
- [ ] Existing AsyncStorage data migrates successfully
- [ ] All repository methods have unit tests
- [ ] Performance is equal or better than AsyncStorage
- [ ] No data loss during migration

### Migration Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data loss during migration | High | Implement backup mechanism, test migration extensively |
| Performance degradation | Medium | Profile queries, add appropriate indexes |
| Expo SQLite bugs/limitations | Medium | Test early, have fallback to AsyncStorage if needed |
| Schema changes needed later | Low | Design migrations system from start |

### Notes

- Keep game rule content (markdown) in static files, not SQLite
- Only store metadata and relational data in SQLite
- Maintain AsyncStorage for simple settings (theme preference, etc.)
- Consider using an ORM like Drizzle for type safety (optional)

---

## Task 4: BGG API Integration (Issue #4)

**Issue**: #4
**Priority**: P1
**Dependencies**: Task 2 (testing), can run parallel to Task 3

### Context

BoardGameGeek (BGG) is the authoritative source for board game metadata, box art, and community content. The app has a `bggService.ts` file with scaffolding, but the integration is incomplete. Completing this enables:
- **Automatic metadata** for new games (player count, play time, complexity)
- **Box art download** for visual appeal
- **Search functionality** to discover games to add
- **Community ratings** and rankings

### BGG XML API Overview

BGG provides an XML API (no official REST API):
- **Thing API**: `/xmlapi2/thing?id={bggId}&stats=1` - Game details
- **Search API**: `/xmlapi2/search?query={name}&type=boardgame` - Find games
- **Rate Limiting**: Max 2 requests per second, respect 202 status (retry after delay)

Example Thing API response:
```xml
<items>
  <item type="boardgame" id="13">
    <name value="Catan" />
    <image>https://cf.geekdo-images.com/.../pic123.jpg</image>
    <thumbnail>https://cf.geekdo-images.com/.../pic123_t.jpg</thumbnail>
    <minplayers>3</minplayers>
    <maxplayers>4</maxplayers>
    <playingtime>120</playingtime>
    <yearpublished>1995</yearpublished>
    <statistics>
      <ratings>
        <average>7.19</average>
        <bayesaverage>7.15</bayesaverage>
      </ratings>
    </statistics>
  </item>
</items>
```

### Current Implementation Status

Existing file: `src/services/bggService.ts`

Current functionality:
- `getBGGGameInfo(bggId)` - Fetch game details
- `KNOWN_BGG_IDS` - Hardcoded mapping for implemented games
- Basic error handling

Missing:
- XML parsing (currently returns placeholder data)
- Search functionality
- Rate limiting and retry logic
- Caching to avoid redundant requests
- Error recovery for network failures

### Implementation Steps

**Step 1: Add XML Parsing**

Install XML parser:
```bash
npm install fast-xml-parser
```

Update `bggService.ts` to parse XML responses:
```typescript
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_'
});

export async function getBGGGameInfo(bggId: number): Promise<BGGGameInfo | null> {
  try {
    const url = `https://boardgamegeek.com/xmlapi2/thing?id=${bggId}&stats=1`;
    const response = await fetch(url);

    if (response.status === 202) {
      // BGG is processing request, retry after delay
      await delay(2000);
      return getBGGGameInfo(bggId);
    }

    if (!response.ok) {
      console.error(`BGG API error: ${response.status}`);
      return null;
    }

    const xml = await response.text();
    const parsed = parser.parse(xml);

    const item = parsed.items?.item;
    if (!item) return null;

    return {
      id: bggId,
      name: extractName(item),
      image: item.image,
      thumbnail: item.thumbnail,
      minPlayers: parseInt(item.minplayers?.['@_value'] ?? '1'),
      maxPlayers: parseInt(item.maxplayers?.['@_value'] ?? '4'),
      playingTime: parseInt(item.playingtime?.['@_value'] ?? '60'),
      yearPublished: parseInt(item.yearpublished?.['@_value'] ?? '2000'),
      rating: parseFloat(item.statistics?.ratings?.average?.['@_value'] ?? '0'),
      weight: parseFloat(item.statistics?.ratings?.averageweight?.['@_value'] ?? '0'),
    };
  } catch (error) {
    console.error('BGG fetch failed:', error);
    return null;
  }
}

function extractName(item: any): string {
  const names = Array.isArray(item.name) ? item.name : [item.name];
  const primaryName = names.find((n: any) => n['@_type'] === 'primary');
  return primaryName?.['@_value'] ?? names[0]?.['@_value'] ?? 'Unknown';
}
```

**Step 2: Implement Search**

Add search functionality:
```typescript
export async function searchBGGGames(query: string): Promise<BGGSearchResult[]> {
  try {
    const url = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`;
    const response = await fetch(url);

    if (!response.ok) return [];

    const xml = await response.text();
    const parsed = parser.parse(xml);

    const items = parsed.items?.item;
    if (!items) return [];

    const results = Array.isArray(items) ? items : [items];

    return results.map(item => ({
      id: parseInt(item['@_id']),
      name: item.name?.['@_value'] ?? 'Unknown',
      yearPublished: parseInt(item.yearpublished?.['@_value'] ?? '0'),
    }));
  } catch (error) {
    console.error('BGG search failed:', error);
    return [];
  }
}
```

**Step 3: Add Rate Limiting**

Implement request queue to respect BGG's rate limits:
```typescript
class BGGRateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private lastRequestTime = 0;
  private minInterval = 500; // 2 requests per second

  async enqueue<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      const elapsed = now - this.lastRequestTime;

      if (elapsed < this.minInterval) {
        await delay(this.minInterval - elapsed);
      }

      const request = this.queue.shift();
      if (request) {
        this.lastRequestTime = Date.now();
        await request();
      }
    }

    this.processing = false;
  }
}

const rateLimiter = new BGGRateLimiter();

// Wrap API calls
export function getBGGGameInfo(bggId: number): Promise<BGGGameInfo | null> {
  return rateLimiter.enqueue(() => fetchBGGGameInfo(bggId));
}
```

**Step 4: Add Response Caching**

Implement caching to avoid redundant API calls:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const BGG_CACHE_KEY = '@TheRuleBook:bgg_cache';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheEntry {
  data: any;
  fetchedAt: number;
}

async function getCachedData(key: string): Promise<any | null> {
  try {
    const cacheJson = await AsyncStorage.getItem(BGG_CACHE_KEY);
    if (!cacheJson) return null;

    const cache: Record<string, CacheEntry> = JSON.parse(cacheJson);
    const entry = cache[key];

    if (!entry) return null;

    const age = Date.now() - entry.fetchedAt;
    if (age > CACHE_TTL) {
      delete cache[key];
      await AsyncStorage.setItem(BGG_CACHE_KEY, JSON.stringify(cache));
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

async function setCachedData(key: string, data: any): Promise<void> {
  try {
    const cacheJson = await AsyncStorage.getItem(BGG_CACHE_KEY);
    const cache: Record<string, CacheEntry> = cacheJson ? JSON.parse(cacheJson) : {};

    cache[key] = {
      data,
      fetchedAt: Date.now(),
    };

    await AsyncStorage.setItem(BGG_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to cache BGG data:', error);
  }
}

// Use in API functions
export async function getBGGGameInfo(bggId: number): Promise<BGGGameInfo | null> {
  const cacheKey = `game_${bggId}`;

  const cached = await getCachedData(cacheKey);
  if (cached) return cached;

  const data = await rateLimiter.enqueue(() => fetchBGGGameInfo(bggId));

  if (data) {
    await setCachedData(cacheKey, data);
  }

  return data;
}
```

**Step 5: Integrate with Asset Service**

Update `assetService.ts` to use BGG data:
```typescript
// src/services/assetService.ts (already partially implemented)

// Enhance getGameAssets to use real BGG data
export async function getGameAssets(gameId: string, bggId?: number): Promise<GameAssets> {
  // ... existing code ...

  const resolvedBggId = bggId ?? KNOWN_BGG_IDS[gameId];
  if (resolvedBggId) {
    const bggInfo = await getBGGGameInfo(resolvedBggId);
    if (bggInfo?.image) {
      const localUri = await cacheRemoteImage(gameId, bggInfo.image, 'boxart');
      if (localUri) {
        assets.boxArt = localUri;
      }
    }
  }

  return assets;
}
```

**Step 6: Add BGG Search UI (Optional Enhancement)**

Create a game search screen for users to browse and add games:
```typescript
// src/app/search.tsx
import { searchBGGGames } from '../services/bggService';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BGGSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    const games = await searchBGGGames(query);
    setResults(games);
    setLoading(false);
  }

  return (
    <View>
      <SearchBar value={query} onChangeText={setQuery} onSubmit={handleSearch} />
      {loading ? <ActivityIndicator /> : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <GameSearchResult game={item} onAdd={handleAddGame} />
          )}
        />
      )}
    </View>
  );
}
```

**Step 7: Write Tests**

Test coverage:
- XML parsing with sample BGG responses
- Rate limiter behavior
- Cache hit/miss scenarios
- Error handling (network failures, malformed XML)
- Search result parsing

### Steps Summary

1. Install `fast-xml-parser`
2. Implement XML parsing for BGG Thing API
3. Implement BGG Search API
4. Add rate limiting with request queue
5. Implement response caching (7-day TTL)
6. Integrate with existing `assetService.ts`
7. Write unit tests for all BGG service functions
8. (Optional) Create UI for game search and addition
9. Update documentation with BGG integration details

### Success Criteria

- [ ] `getBGGGameInfo()` returns real data from BGG API
- [ ] `searchBGGGames()` returns search results
- [ ] Rate limiting prevents API abuse (max 2 req/sec)
- [ ] BGG responses cached for 7 days
- [ ] Box art downloads successfully from BGG
- [ ] All BGG service functions have unit tests
- [ ] Error handling gracefully handles network failures
- [ ] No app crashes due to malformed BGG responses

### BGG API Considerations

**Rate Limits**:
- BGG enforces ~2 requests per second
- 202 status means "processing, retry later"
- Implement exponential backoff for 202 responses

**Data Quality**:
- BGG data can be inconsistent (missing fields, multiple names)
- Always validate and provide fallbacks
- Some games have no image/thumbnail

**Legal**:
- BGG ToS allows API usage for non-commercial apps
- Attribute BGG as data source in the app
- Cache responses to reduce server load

**Future Enhancements**:
- Fetch expansion data
- Display BGG ratings and rankings
- Link to BGG forums/discussions
- Community-contributed variants and house rules

---

## Task 5: Dark Mode Theme Toggle (Issue #5)

**Issue**: #5
**Priority**: P2
**Dependencies**: Task 2 (testing)

### Context

The app currently uses a dark theme by default (appropriate for game tables), but lacks:
- User-selectable light/dark mode toggle
- System theme detection
- Theme persistence across app restarts

Adding proper theme support improves accessibility and user preference accommodation.

### Current Theme Implementation

The app uses React Native Paper for UI components, which has built-in theming support. Current approach:
- Hardcoded dark theme in `src/app/_layout.tsx`
- Per-game color palettes in `assetService.ts`
- No theme toggle UI

### Implementation Approach

**Use React Native Paper's theme system** with:
1. System theme detection (light/dark)
2. Manual theme override
3. Persistent theme preference
4. Per-game color overlays

### Steps

**Step 1: Create Theme Store**

Create `src/stores/themeStore.ts`:
```typescript
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeStore {
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  setMode: (mode: ThemeMode) => Promise<void>;
  initialize: () => Promise<void>;
}

const THEME_KEY = '@TheRuleBook:theme_mode';

export const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: 'auto',
  effectiveTheme: 'dark',

  async setMode(mode: ThemeMode) {
    await AsyncStorage.setItem(THEME_KEY, mode);
    set({ mode });
    get().updateEffectiveTheme();
  },

  async initialize() {
    const saved = await AsyncStorage.getItem(THEME_KEY);
    const mode = (saved as ThemeMode) ?? 'auto';
    set({ mode });
    get().updateEffectiveTheme();
  },

  updateEffectiveTheme() {
    const { mode } = get();
    const systemTheme = useColorScheme() ?? 'dark';
    const effective = mode === 'auto' ? systemTheme : mode;
    set({ effectiveTheme: effective });
  },
}));
```

**Step 2: Define Light and Dark Themes**

Update theme definitions in `src/constants/theme.ts`:
```typescript
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6366F1',
    secondary: '#A5B4FC',
    accent: '#F59E0B',
    background: '#1A1A1A',
    surface: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  },
};

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4F46E5',
    secondary: '#818CF8',
    accent: '#F59E0B',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
  },
};
```

**Step 3: Apply Theme in Root Layout**

Update `src/app/_layout.tsx`:
```typescript
import { PaperProvider } from 'react-native-paper';
import { useThemeStore } from '../stores/themeStore';
import { DarkTheme, LightTheme } from '../constants/theme';

export default function RootLayout() {
  const { effectiveTheme, initialize } = useThemeStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await initialize();
      setReady(true);
    }
    prepare();
  }, []);

  if (!ready) return <SplashScreen />;

  const theme = effectiveTheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack />
    </PaperProvider>
  );
}
```

**Step 4: Create Theme Toggle UI**

Add theme toggle to settings screen:
```typescript
// src/app/(tabs)/settings.tsx
import { useThemeStore } from '../../stores/themeStore';
import { SegmentedButtons } from 'react-native-paper';

export default function SettingsScreen() {
  const { mode, setMode } = useThemeStore();

  return (
    <ScrollView>
      <Text variant="titleMedium">Appearance</Text>
      <SegmentedButtons
        value={mode}
        onValueChange={(value) => setMode(value as ThemeMode)}
        buttons={[
          { value: 'light', label: 'Light', icon: 'white-balance-sunny' },
          { value: 'dark', label: 'Dark', icon: 'moon-waning-crescent' },
          { value: 'auto', label: 'Auto', icon: 'theme-light-dark' },
        ]}
      />
    </ScrollView>
  );
}
```

**Step 5: Handle Game-Specific Themes**

Update game screens to overlay game colors on base theme:
```typescript
// src/app/game/[id]/index.tsx
import { useThemeStore } from '../../../stores/themeStore';
import { getGamePalette } from '../../../services/assetService';

export default function GameDetailScreen() {
  const { id } = useLocalSearchParams();
  const { effectiveTheme } = useThemeStore();
  const gamePalette = getGamePalette(id as string);

  // Merge game colors with base theme
  const gameTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      primary: gamePalette.primary,
      secondary: gamePalette.secondary,
      accent: gamePalette.accent,
    },
  };

  return (
    <PaperProvider theme={gameTheme}>
      {/* Game content */}
    </PaperProvider>
  );
}
```

**Step 6: Update Per-Game Color Palettes**

Extend `assetService.ts` color palettes to include light variants:
```typescript
const DEFAULT_PALETTES: Record<string, { light: ColorPalette; dark: ColorPalette }> = {
  splendor: {
    dark: {
      primary: '#8B4513',
      secondary: '#DAA520',
      accent: '#228B22',
      background: '#1A1A1A',
      surface: '#2D2D2D',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
    },
    light: {
      primary: '#A0522D',
      secondary: '#FFD700',
      accent: '#32CD32',
      background: '#FAF9F6',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
    },
  },
  // ... other games
};

export function getGamePalette(gameId: string, theme: 'light' | 'dark'): ColorPalette {
  return DEFAULT_PALETTES[gameId]?.[theme] ?? DEFAULT_PALETTE[theme];
}
```

**Step 7: Test Theme Switching**

- Verify theme persists across app restarts
- Test 'auto' mode responds to system theme changes
- Check all screens render correctly in both themes
- Ensure game-specific colors work in light and dark modes

**Step 8: Update Component Styles**

Review all custom styles to ensure they work in both themes. Use theme colors instead of hardcoded values:

Before:
```typescript
<View style={{ backgroundColor: '#1A1A1A' }}>
```

After:
```typescript
const theme = useTheme();
<View style={{ backgroundColor: theme.colors.background }}>
```

### Steps Summary

1. Create `themeStore.ts` with theme mode management
2. Define light and dark theme objects
3. Apply theme in root layout with PaperProvider
4. Add theme toggle UI in settings screen
5. Handle game-specific color overlays
6. Extend color palettes for light mode
7. Test theme switching and persistence
8. Update hardcoded colors to use theme values
9. Write tests for theme store logic

### Success Criteria

- [ ] Theme toggle UI in settings screen
- [ ] Three modes work: light, dark, auto
- [ ] Theme preference persists across restarts
- [ ] Auto mode follows system theme
- [ ] All screens render correctly in both themes
- [ ] Game-specific colors overlay properly
- [ ] No hardcoded color values in components
- [ ] Theme store has unit tests

### Design Considerations

**Light Mode Color Strategy**:
- Lighter backgrounds (#F9FAFB, #FFFFFF)
- Darker text (#1F2937, #6B7280)
- Adjust game colors for light backgrounds (increase contrast)
- Test readability of all text elements

**Accessibility**:
- Ensure WCAG AA contrast ratios (4.5:1 for normal text)
- Test with iOS/Android accessibility tools
- Support system accessibility settings (increase contrast, reduce transparency)

**Performance**:
- Theme switching should be instant (no re-rendering delays)
- Use memoization for theme-dependent styles
- Avoid inline style objects that recreate on every render

---

## Task 6: Additional Games Content (Issue #6)

**Issue**: #6
**Priority**: P3
**Dependencies**: Tasks 3 (SQLite), 4 (BGG integration)

### Context

The app currently supports 4 games (Splendor, Wingspan, Terraforming Mars, Ticket to Ride). To provide real value, the library needs expansion. Target: 10-15 popular games covering diverse mechanics and complexity levels.

### Game Selection Criteria

Choose games that:
1. **Popularity**: Top 100 on BGG, widely played
2. **Diversity**: Cover different mechanics (worker placement, deck-building, area control, etc.)
3. **Complexity Range**: Mix of light (2.0), medium (2.5-3.5), and heavy (4.0+)
4. **Data Availability**: Rules accessible online, BGG data available
5. **Community Need**: Games with complex scoring or frequent rule lookups

### Recommended Game Additions

| Game | BGG Rank | Complexity | Why Include |
|------|----------|------------|-------------|
| **7 Wonders** | ~35 | 2.3 | Popular card drafting, simple scoring |
| **Agricola** | ~47 | 3.6 | Worker placement, complex end scoring |
| **Azul** | ~106 | 1.9 | Abstract, tile placement, pattern building |
| **Brass: Birmingham** | ~5 | 3.9 | Heavy economic, complex scoring |
| **Carcassonne** | ~157 | 1.9 | Light family game, tile placement |
| **Dominion** | ~141 | 2.3 | Deck-building pioneer, simple rules |
| **Gloomhaven** | ~9 | 3.9 | Campaign, resource management |
| **Pandemic** | ~153 | 2.4 | Cooperative, disease management |
| **Puerto Rico** | ~38 | 3.3 | Role selection, production |
| **Root** | ~24 | 3.6 | Asymmetric, area control |
| **Scythe** | ~34 | 3.4 | Engine building, area control |

Select 6-8 from this list based on community demand and data availability.

### Game Definition Effort Estimate

Per game, creating a complete definition requires:

1. **Metadata** (30 min)
   - Name, publisher, player count, play time
   - BGG ID, categories, mechanics
   - Complexity rating

2. **Rules Content** (2-4 hours)
   - Summarize rulebook into sections
   - Write quick reference cards
   - Create FAQ from BGG forums
   - Identify common rule mistakes

3. **Scoring Config** (1 hour)
   - Define scoring categories
   - Specify calculation rules
   - Set up end-game scoring if applicable

4. **Resources & Phases** (30 min)
   - Define trackable resources
   - List game phases/rounds
   - Specify turn structure

5. **Assets** (30 min)
   - Download box art from BGG (via API)
   - Extract color palette
   - Create icon placeholder

6. **Testing** (1 hour)
   - Verify rules display correctly
   - Test scoring calculations
   - Ensure all data fields populated

**Total per game**: 5-7 hours

### Implementation Approach

**Phase 1: Infrastructure** (Prerequisites)
- Complete SQLite migration (Task 3)
- Complete BGG integration (Task 4)
- Create game definition template/schema

**Phase 2: Content Creation** (Parallel work)
- Select 6 games to add
- Create game definition files (can be done in parallel)
- Fetch BGG data and box art
- Write rules summaries and FAQs

**Phase 3: Testing & Refinement**
- Playtest each game companion
- Verify scoring calculations
- Gather user feedback on rule clarity

### Steps

**Step 1: Create Game Definition Template**

Create `docs/game-template.md` with guidelines:
```markdown
# Game Definition Template

## Metadata
- ID: lowercase-hyphenated-name
- BGG ID: [find on BoardGameGeek]
- Player count, play time, complexity
- Categories, mechanics

## Rules Structure
- Break into logical sections (Setup, Gameplay, Scoring)
- Use markdown for formatting
- Include examples where helpful
- Cross-reference related rules

## Quick Reference Cards
- Turn structure summary
- Common actions
- End game triggers
- Scoring overview

## FAQ
- Source from BGG forums
- Address common rule confusion
- Link to official rulings if available

## Scoring Configuration
- List all scoring categories
- Specify how points are calculated
- Note timing (during game vs end game)

## Resources (if applicable)
- Define trackable resources (coins, VP tokens, etc.)
- Starting values
- Min/max constraints

## Phases
- List game phases/rounds
- Describe turn structure
```

**Step 2: Select Initial Batch**

Based on community needs and data availability, select 6 games:
1. **Azul** (light, beautiful, simple scoring)
2. **7 Wonders** (medium, card drafting, popular)
3. **Pandemic** (cooperative, different from competitive games)
4. **Carcassonne** (family-friendly, tile placement)
5. **Scythe** (heavy, engine building, asymmetric)
6. **Dominion** (deck-building, straightforward rules)

**Step 3: Create Game Definitions**

For each game:
1. Create directory: `src/data/games/{game-id}/`
2. Create `index.ts` with full game definition
3. Create `rules/` subdirectory with markdown files
4. Add BGG ID to `bggService.ts` KNOWN_BGG_IDS mapping

Example structure:
```
src/data/games/azul/
├── index.ts
└── rules/
    ├── setup.md
    ├── gameplay.md
    ├── scoring.md
    └── faq.md
```

**Step 4: Implement Game Data**

Follow existing pattern from Splendor:
```typescript
// src/data/games/azul/index.ts
import { Game } from '../../../types/game';

const azul: Game = {
  id: 'azul',
  name: 'Azul',
  bggId: 230802,
  publisher: 'Next Move Games',
  playerCount: { min: 2, max: 4 },
  playTime: { min: 30, max: 45 },
  complexity: 1.9,
  categories: ['Abstract', 'Puzzle'],
  mechanics: ['Pattern Building', 'Set Collection', 'Tile Placement'],

  rules: [
    // Rule sections...
  ],

  quickReference: [
    {
      id: 'turn-structure',
      title: 'Turn Structure',
      category: 'Gameplay',
      items: [
        { value: '1. Take tiles from factory or center' },
        { value: '2. Place tiles on pattern line' },
        { value: '3. Score when row complete' },
      ],
    },
  ],

  faq: [
    // FAQ items from BGG...
  ],

  scoring: {
    categories: [
      { id: 'tiles', name: 'Tile Placement', step: 1 },
      { id: 'rows', name: 'Complete Rows', step: 2 },
      { id: 'columns', name: 'Complete Columns', step: 7 },
      { id: 'colors', name: 'All 5 Colors', step: 10 },
      { id: 'penalties', name: 'Floor Penalties', step: -1 },
    ],
    trackDuringGame: true,
  },

  resources: [
    {
      id: 'floor-tiles',
      name: 'Floor Tiles',
      icon: 'tile',
      min: 0,
      max: 7,
      perPlayer: true,
    },
  ],

  phases: [
    { id: 'factory', name: 'Factory Offer', order: 1 },
    { id: 'wall-tiling', name: 'Wall Tiling', order: 2 },
    { id: 'prepare-next', name: 'Prepare Next Round', order: 3 },
  ],

  assets: {
    icon: 'game-icon-azul',
    colorScheme: {
      primary: '#1E88E5',
      secondary: '#FFC107',
      accent: '#E53935',
      background: '#1A1A1A',
      surface: '#2D2D2D',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
    },
  },
};

export default azul;
```

**Step 5: Register New Games**

Update game registry:
```typescript
// src/data/games/index.ts
import splendor from './splendor';
import wingspan from './wingspan';
import terraformingMars from './terraforming-mars';
import ticketToRide from './ticket-to-ride';
import azul from './azul';
import sevenWonders from './7-wonders';
// ... other new games

export const ALL_GAMES = [
  splendor,
  wingspan,
  terraformingMars,
  ticketToRide,
  azul,
  sevenWonders,
  // ... other new games
];
```

**Step 6: Seed Database**

If using SQLite (Task 3), seed new games:
```typescript
// scripts/seedGames.ts
import { GameRepository } from '../src/repositories/GameRepository';
import { ALL_GAMES } from '../src/data/games';

export async function seedAllGames() {
  const repo = new GameRepository();

  for (const game of ALL_GAMES) {
    await repo.upsertGame(game);
  }

  console.log(`Seeded ${ALL_GAMES.length} games`);
}
```

**Step 7: Fetch BGG Assets**

Run asset prefetch for new games:
```typescript
import { prefetchGameAssets } from '../src/services/assetService';
import { ALL_GAMES } from '../src/data/games';

async function downloadAllAssets() {
  await prefetchGameAssets(ALL_GAMES.map(g => ({ id: g.id, bggId: g.bggId })));
}
```

**Step 8: Test Each Game**

For each new game:
1. Navigate to game detail screen
2. Verify rules display correctly
3. Test quick reference cards
4. Read through FAQ
5. Create test session with scoring
6. Verify all scoring categories work
7. Test resource tracking (if applicable)
8. Check turn/phase tracking

**Step 9: Gather Feedback**

- Share with beta testers or board game community
- Collect feedback on rule accuracy
- Identify missing content or confusing sections
- Prioritize fixes based on impact

### Steps Summary

1. Create game definition template document
2. Select 6 games for initial batch
3. Create game definition files for each
4. Write rules content (summaries, quick ref, FAQ)
5. Define scoring and resource configurations
6. Register new games in game registry
7. Seed database with new game data
8. Fetch BGG assets (box art, metadata)
9. Test each game's companion features
10. Gather user feedback and iterate

### Success Criteria

- [ ] 6-8 new games added (total 10-12 games)
- [ ] Each game has complete rules content
- [ ] Quick reference cards for all games
- [ ] FAQ sections populated (5+ items per game)
- [ ] Scoring configurations tested and working
- [ ] BGG box art fetched and displayed
- [ ] Color palettes extracted for theming
- [ ] All games tested with real gameplay sessions

### Content Quality Guidelines

**Rules Content**:
- Concise but complete (not a full rulebook replacement)
- Focus on frequent lookups (turn structure, scoring, special cases)
- Use examples to clarify complex rules
- Link to official rulebook PDF if available

**Quick Reference**:
- One-page summary of turn structure
- Common actions and their effects
- End game triggers and final scoring
- Setup reminders

**FAQ**:
- Address genuinely confusing rules
- Source from BGG forums, official FAQ, or common player mistakes
- Provide clear, authoritative answers
- Include page references to rulebook when possible

### Maintenance Plan

**Ongoing**:
- Monitor BGG forums for new rule clarifications
- Update FAQ as common questions emerge
- Add expansions as separate game definitions or variants
- Refresh box art if BGG updates images

**Community Contributions** (Future):
- Allow users to submit rule corrections
- Crowdsource FAQ entries
- Community-voted game priorities for addition

---

## Task 7: iPad Device Testing (Issue #7)

**Issue**: #7
**Priority**: P3
**Dependencies**: Tasks 2 (testing), 5 (dark mode)

### Context

All development so far has been on iOS Simulator. Real device testing is critical to validate:
- Touch target sizes and ergonomics
- Performance on actual hardware
- Orientation handling (landscape/portrait)
- Gesture interactions
- Font sizes and readability at table distance
- Offline functionality
- Storage and memory usage
- Battery impact during long game sessions

### Testing Scope

**Devices to Test**:
- **iPad Pro 12.9"** (large, high resolution)
- **iPad Air 10.9"** (mid-size, most common)
- **iPad Mini 8.3"** (smallest supported size)

If access is limited, prioritize iPad Air as the most representative device.

**iOS Versions**:
- Latest stable iOS (iOS 18.x as of Jan 2026)
- Previous major version (iOS 17.x) for compatibility

### Test Plan

**Phase 1: Build and Deploy**

1. **Configure Development Build**
   - Ensure bundle identifier is set
   - Configure signing with Apple Developer account
   - Set up provisioning profile for device testing
   - Build development version: `npx expo run:ios --device`

2. **Install on Device**
   - Connect iPad via USB or use wireless debugging
   - Install app via Xcode or Expo Go
   - Verify app launches and doesn't crash

**Phase 2: Functional Testing**

Test all core user flows on device:

1. **First Launch Experience**
   - App launches successfully
   - Splash screen displays correctly
   - Initial data loads
   - No crash on first open

2. **Game Library**
   - Browse all games
   - Search functionality works
   - Tap to view game details
   - Toggle favorites
   - Box art loads and displays

3. **Rules Viewer**
   - Navigate rule sections
   - Scroll performance smooth
   - Quick reference cards readable
   - FAQ search works
   - Markdown formatting correct

4. **Game Session**
   - Create new session
   - Add/remove/reorder players
   - Increment/decrement scores
   - Advance turns
   - Track resources
   - Use timers (game, turn, sand)
   - Save and resume session

5. **Settings**
   - Theme toggle works
   - Preferences persist across restarts
   - About/credits display

**Phase 3: UI/UX Validation**

Test user experience aspects:

1. **Touch Targets**
   - All buttons at least 44x44pt (Apple HIG minimum)
   - Easy to tap without precision
   - No accidental taps on adjacent elements
   - Swipe gestures feel natural

2. **Typography**
   - Text readable from 2-3 feet (typical table distance)
   - Hierarchy clear (headings vs body)
   - No truncation or overflow
   - Font weights provide sufficient contrast

3. **Layout & Spacing**
   - Content doesn't feel cramped
   - Generous whitespace between sections
   - Symmetrical padding and margins
   - Consistent alignment

4. **Orientation**
   - Portrait mode works correctly
   - Landscape mode (primary for iPad) optimal
   - Rotation transitions smooth
   - No layout breaks during rotation

5. **Colors & Contrast**
   - Readable in bright light (outdoors, near window)
   - Readable in dim light (game night setting)
   - Contrast meets WCAG AA standards
   - Game-specific colors don't clash

**Phase 4: Performance Testing**

Measure performance metrics:

1. **App Launch Time**
   - Cold start: < 2 seconds
   - Warm start: < 1 second

2. **Navigation Speed**
   - Screen transitions: < 300ms
   - No jank or stuttering
   - Smooth 60fps scrolling

3. **Memory Usage**
   - Monitor with Xcode Instruments
   - Check for memory leaks
   - Verify memory stable during long sessions

4. **Battery Impact**
   - Monitor battery drain over 2-hour session
   - Check for excessive background activity
   - Verify timers don't prevent idle sleep

5. **Storage**
   - App bundle size < 100MB
   - Cached assets reasonable (< 50MB for 10 games)
   - Database size grows predictably

**Phase 5: Edge Cases & Stress Testing**

Test uncommon scenarios:

1. **Network Conditions**
   - App works fully offline
   - BGG API failure handled gracefully
   - No crashes when network unavailable

2. **Data Limits**
   - Session with maximum players (8-10)
   - Long game session (50+ turns)
   - 100+ games in library (when expanded)
   - Large score values (1000+)

3. **Interruptions**
   - Phone call or notification arrives
   - App backgrounded mid-session
   - Device locked during active timer
   - Low battery warning appears

4. **Fresh Install**
   - Uninstall and reinstall app
   - All data cleared correctly
   - First launch experience works

**Phase 6: Accessibility Testing**

Test with accessibility features enabled:

1. **VoiceOver**
   - Navigate entire app with VoiceOver
   - All interactive elements labeled
   - Proper reading order
   - Gestures work with VoiceOver

2. **Dynamic Type**
   - Enable larger text sizes in iOS Settings
   - UI adapts without breaking
   - Text doesn't truncate or overlap

3. **Reduce Motion**
   - Enable Reduce Motion in iOS Settings
   - Animations respect preference
   - No disorienting effects

4. **Increase Contrast**
   - Enable Increase Contrast
   - Text remains readable
   - Colors adjust appropriately

### Test Documentation

**Create Test Report Template**:
```markdown
# iPad Device Test Report

**Date**: YYYY-MM-DD
**Device**: iPad [Model]
**iOS Version**: X.X.X
**App Version**: X.X.X
**Tester**: [Name]

## Functional Tests
- [ ] Game library browsing
- [ ] Rules viewer navigation
- [ ] Session creation and management
- [ ] Scoring operations
- [ ] Timer functionality
- [ ] Settings and theme toggle

## UI/UX Validation
- [ ] Touch targets adequate
- [ ] Typography readable
- [ ] Layout spacing comfortable
- [ ] Orientation handling correct
- [ ] Colors and contrast appropriate

## Performance
- [ ] App launch time: ___ seconds
- [ ] Navigation smooth (60fps)
- [ ] Memory usage stable
- [ ] Battery drain acceptable

## Issues Found
1. [Issue description]
   - Severity: Critical / High / Medium / Low
   - Steps to reproduce
   - Expected vs actual behavior

## Overall Assessment
[Summary of findings and recommendations]
```

### Steps

1. **Prepare Test Build**
   - Configure signing and provisioning
   - Build development version
   - Install on iPad device(s)

2. **Execute Functional Tests**
   - Follow test plan Phase 2
   - Document any failures or issues

3. **Validate UI/UX**
   - Follow test plan Phase 3
   - Take screenshots of issues
   - Note improvement opportunities

4. **Run Performance Tests**
   - Use Xcode Instruments
   - Measure metrics from Phase 4
   - Document results

5. **Test Edge Cases**
   - Execute Phase 5 scenarios
   - Verify error handling

6. **Accessibility Testing**
   - Enable accessibility features
   - Test with VoiceOver
   - Verify Dynamic Type support

7. **Document Findings**
   - Fill out test report template
   - Prioritize issues found
   - Create GitHub issues for bugs

8. **Fix Critical Issues**
   - Address showstopper bugs
   - Retest on device
   - Iterate until stable

9. **Repeat on Multiple Devices**
   - Test on different iPad sizes
   - Compare experiences
   - Optimize for each form factor

### Success Criteria

- [ ] App installs and launches on physical iPad
- [ ] All functional tests pass
- [ ] No critical or high severity bugs
- [ ] Touch targets meet Apple HIG standards (44x44pt minimum)
- [ ] App runs smoothly at 60fps
- [ ] Memory usage stable over 1-hour session
- [ ] Battery drain < 5% per hour of active use
- [ ] Offline functionality works perfectly
- [ ] Accessibility features supported (VoiceOver, Dynamic Type)
- [ ] Test report completed and documented

### Common iPad-Specific Issues to Watch For

1. **Touch Issues**
   - Buttons too small for finger taps
   - Gestures conflict with system gestures
   - Multi-touch not handled correctly

2. **Layout Problems**
   - Elements positioned based on iPhone dimensions
   - Poor use of large screen real estate
   - Content too small or too spread out

3. **Performance**
   - Animations jank on older iPads
   - Slow rendering with large datasets
   - Memory pressure on iPad Mini

4. **Orientation**
   - Layout breaks in landscape
   - Forced portrait when landscape preferred
   - Status bar or home indicator overlap

5. **Simulator vs Device Differences**
   - Gestures feel different
   - Performance slower on device
   - Font rendering differs
   - Network conditions more realistic

### Post-Testing Actions

**Based on findings**:
1. Create GitHub issues for all bugs
2. Prioritize fixes (P0 for critical, P1 for high, etc.)
3. Implement fixes in order
4. Retest on device to verify
5. Update app for TestFlight or App Store submission

**Continuous Testing**:
- Test on device after major feature additions
- Keep a physical iPad connected for quick testing
- Use TestFlight for beta testing with real users

---

## Project Roadmap Summary

### Immediate Next Steps (Weeks 1-2)

1. **Commit uncommitted work** (1 day)
2. **Setup testing infrastructure** (2-3 days)
3. **Write core tests** (5-7 days)

### Short Term (Weeks 3-6)

4. **SQLite migration** (1-2 weeks)
5. **BGG API integration** (1 week)
6. **Dark mode toggle** (2-3 days)

### Medium Term (Weeks 7-10)

7. **Add 6 new games** (3-4 weeks, parallelizable)
8. **iPad device testing** (1 week)
9. **Fix issues from testing** (varies)

### Long Term (Months 3-6)

10. **Expand to 20+ games**
11. **Add social features** (share sessions, leaderboards)
12. **Implement rule search** (full-text search across all games)
13. **Add expansion support**
14. **Build community contribution system**
15. **Explore publisher partnerships** for official content

---

## Dependencies Visualization

```
START
  │
  ├─> [1] Commit Work (P0) ──┐
  │                           │
  └─> [2] Testing Infra (P0) ─┴─┬─> [3] SQLite (P1) ──┬─> [6] Games (P3)
                                 │                      │
                                 ├─> [4] BGG API (P1) ──┤
                                 │                      │
                                 └─> [5] Dark Mode (P2) ─┴─> [7] iPad Test (P3)
                                                                   │
                                                                   └─> COMPLETE
```

**Critical Path**: 1 → 2 → 3 → 6
**Parallel Path**: 2 → 4 → 6
**Independent Path**: 2 → 5 → 7

---

## Success Metrics

### Code Quality
- **Test Coverage**: > 70% overall, > 90% for critical paths
- **TypeScript Strict**: No `any` types outside of necessary exceptions
- **Lint Clean**: Zero ESLint errors or warnings
- **Performance**: 60fps scrolling, < 2s app launch

### User Experience
- **Completeness**: 10+ fully implemented games
- **Accessibility**: VoiceOver support, Dynamic Type, WCAG AA contrast
- **Offline-First**: 100% functionality without internet
- **Visual Polish**: Professional design, consistent theming

### Technical Foundation
- **Scalability**: SQLite supports 100+ games without performance degradation
- **Maintainability**: Clear code structure, documented patterns, testing coverage
- **Reliability**: No crashes, graceful error handling, data integrity

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| SQLite migration breaks existing data | Medium | High | Thorough testing, backup mechanism, migration script validation |
| BGG API rate limiting issues | Medium | Low | Implement robust caching and rate limiter |
| iPad testing reveals major UI issues | High | Medium | Prioritize device testing early, iterative fixes |
| Game content creation takes longer than expected | High | Low | Start with fewer games, parallelize work |
| Test infrastructure setup complex | Medium | Medium | Use established tools (Jest, Testing Library), start simple |

---

## Notes

**On Prioritization**:
- Testing (P0) must come before architectural changes to prevent regressions
- SQLite and BGG (P1) are foundational for scaling game library
- Dark mode (P2) is polish that can happen anytime
- Game expansion (P3) benefits from completed infrastructure

**On Execution**:
- Work in batches (3 tasks), pause for review
- Use subagents for parallel work (e.g., multiple game definitions)
- Stop immediately when blocked, don't guess or force through
- Maintain test coverage as code grows

**On Quality**:
- Every feature addition must include tests
- UI changes must be tested on device
- Documentation updated alongside code
- User feedback incorporated continuously

---

## Appendix: Useful Commands

```bash
# Development
npm start                    # Start Expo dev server
npm run ios                  # Run on iOS simulator
npm test                     # Run Jest tests
npm run test:watch           # Run tests in watch mode
npm run test:coverage        # Generate coverage report

# Database
npm run db:migrate           # Run database migrations (to be created)
npm run db:seed             # Seed database with games (to be created)

# Build
npx expo run:ios --device    # Build and run on connected iPad
npx expo prebuild            # Generate native iOS project for debugging

# Debugging
npx react-native log-ios     # View iOS device logs
npx expo-doctor              # Check for common Expo issues
```

---

## Conclusion

TheRuleBook has a solid foundation with all core features implemented. The next phase focuses on:
1. **Quality & Testing** - Establish robust test coverage
2. **Scalability** - Migrate to SQLite for performance
3. **Content Pipeline** - Complete BGG integration and add games
4. **Polish** - Theme switching, device testing, refinements

By following this plan systematically, TheRuleBook will evolve from a functional MVP into a production-ready app that board gamers love and rely on.

---

**Document Prepared By**: Project Manager Agent
**Next Review Date**: After completion of Stage 1 (Testing Infrastructure)
