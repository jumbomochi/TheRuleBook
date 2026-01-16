import { useGameStore } from '../stores/gameStore';
import { Game } from '../types';

/**
 * Hook to access the game library store
 * Provides access to all games and search
 */
export const useGames = () => {
  const games = useGameStore((state) => state.games);
  const searchQuery = useGameStore((state) => state.searchQuery);
  const filteredGames = useGameStore((state) => state.filteredGames);

  const setSearchQuery = useGameStore((state) => state.setSearchQuery);
  const loadGames = useGameStore((state) => state.loadGames);
  const selectGame = useGameStore((state) => state.selectGame);

  return {
    games,
    searchQuery,
    filteredGames,
    setSearchQuery,
    loadGames,
    selectGame,
  };
};

/**
 * Hook to access the game library - alias for compatibility
 */
export const useGameLibrary = () => {
  const games = useGameStore((state) => state.games);
  const filteredGames = useGameStore((state) => state.filteredGames);
  const loadGames = useGameStore((state) => state.loadGames);
  const selectGame = useGameStore((state) => state.selectGame);

  const getGameById = (gameId: string): Game | undefined => {
    return games.find((g) => g.id === gameId);
  };

  return {
    games,
    filteredGames,
    loadGames,
    selectGame,
    getGameById,
  };
};

/**
 * Hook to get a single game by ID
 */
export const useGame = (gameId: string): Game | undefined => {
  return useGameStore((state) => state.games.find((g) => g.id === gameId));
};

/**
 * Hook to get filtered games based on search
 */
export const useFilteredGames = () => {
  return useGameStore((state) => state.filteredGames);
};
