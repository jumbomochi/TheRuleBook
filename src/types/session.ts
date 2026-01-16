// Game session and player types

export interface GameSession {
  id: string;
  gameId: string;
  players: Player[];
  scores: PlayerScores;
  currentPlayerIndex: number;
  currentPhase?: string;
  turnNumber: number;
  roundNumber?: number;
  startedAt: Date;
  lastUpdatedAt: Date;
  completedAt?: Date;
  resources?: PlayerResources;
  notes?: string;
  winner?: string; // Player ID
}

export interface Player {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

export type PlayerColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'teal'
  | 'white'
  | 'black';

export const PLAYER_COLORS: Record<PlayerColor, string> = {
  red: '#E53935',
  blue: '#1E88E5',
  green: '#43A047',
  yellow: '#FDD835',
  purple: '#8E24AA',
  orange: '#FB8C00',
  pink: '#D81B60',
  teal: '#00897B',
  white: '#F5F5F5',
  black: '#424242',
};

// Scores per player - array of score entries
export type PlayerScores = Record<string, ScoreEntry[]>;

export interface ScoreEntry {
  points: number;
  category?: string;
  timestamp: Date;
}

// Resources per player
// { playerId: { resourceId: currentValue } }
export type PlayerResources = Record<string, Record<string, number>>;

export interface SavedSession {
  session: GameSession;
  gameName: string;
  savedAt: Date;
}

export interface PlayerProfile {
  id: string;
  name: string;
  preferredColor: PlayerColor;
  avatar?: string;
  stats: PlayerStats;
  createdAt: Date;
}

export interface PlayerStats {
  gamesPlayed: number;
  wins: number;
  favoriteGame?: string;
  lastPlayedAt?: Date;
}

// Timer types for turn/game timers
export interface TimerState {
  isRunning: boolean;
  elapsedMs: number;
  perTurnMs?: number;
  totalGameMs?: number;
  playerTimes?: Record<string, number>; // Time per player
}
