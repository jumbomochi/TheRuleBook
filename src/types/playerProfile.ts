export interface PlayerProfile {
  id: string;
  name: string;
  favoriteColor: string;
  stats: PlayerStats;
  createdAt: Date;
  lastPlayedAt?: Date;
}

export interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  favoriteGames: string[]; // Game IDs
}
