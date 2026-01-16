import { Game } from '../../types/game';
import { splendor } from './splendor';
import { wingspan } from './wingspan';
import { terraformingMars } from './terraforming-mars';
import { ticketToRide } from './ticket-to-ride';

// All available games
export const games: Record<string, Game> = {
  splendor,
  wingspan,
  'terraforming-mars': terraformingMars,
  'ticket-to-ride': ticketToRide,
};

// Get a game by ID
export function getGame(id: string): Game | undefined {
  return games[id];
}

// Get all games as an array
export function getAllGames(): Game[] {
  return Object.values(games);
}

// Search games by name
export function searchGames(query: string): Game[] {
  const lowerQuery = query.toLowerCase();
  return getAllGames().filter(
    (game) =>
      game.name.toLowerCase().includes(lowerQuery) ||
      game.categories.some((cat) => cat.toLowerCase().includes(lowerQuery)) ||
      game.mechanics.some((mech) => mech.toLowerCase().includes(lowerQuery))
  );
}
