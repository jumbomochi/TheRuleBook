import { create } from 'zustand';
import { Game } from '../types/game';
import { getAllGames, getGame, searchGames } from '../data/games';

interface GameStore {
  games: Game[];
  selectedGame: Game | null;
  searchQuery: string;
  filteredGames: Game[];

  // Actions
  loadGames: () => void;
  selectGame: (gameId: string) => void;
  setSearchQuery: (query: string) => void;
  clearSelection: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  games: [],
  selectedGame: null,
  searchQuery: '',
  filteredGames: [],

  loadGames: () => {
    const games = getAllGames();
    set({ games, filteredGames: games });
  },

  selectGame: (gameId: string) => {
    const game = getGame(gameId);
    set({ selectedGame: game || null });
  },

  setSearchQuery: (query: string) => {
    const { games } = get();
    const filteredGames =
      query.trim() === '' ? games : searchGames(query);
    set({ searchQuery: query, filteredGames });
  },

  clearSelection: () => {
    set({ selectedGame: null });
  },
}));
