// BoardGameGeek API Service
// Fetches game information and images from BGG

import { BGGGameInfo } from '../types/assets';

const BGG_API_BASE = 'https://boardgamegeek.com/xmlapi2';

interface BGGSearchResult {
  id: number;
  name: string;
  yearPublished?: number;
}

/**
 * Search for games on BoardGameGeek
 */
export async function searchBGG(query: string): Promise<BGGSearchResult[]> {
  try {
    const response = await fetch(
      `${BGG_API_BASE}/search?query=${encodeURIComponent(query)}&type=boardgame`
    );
    const text = await response.text();
    return parseBGGSearchResults(text);
  } catch (error) {
    console.error('BGG search error:', error);
    return [];
  }
}

/**
 * Get detailed game info from BGG by ID
 */
export async function getBGGGameInfo(bggId: number): Promise<BGGGameInfo | null> {
  try {
    const response = await fetch(
      `${BGG_API_BASE}/thing?id=${bggId}&stats=1`
    );
    const text = await response.text();
    return parseBGGGameInfo(text);
  } catch (error) {
    console.error('BGG game info error:', error);
    return null;
  }
}

/**
 * Get multiple games info at once (batch request)
 */
export async function getBGGGamesInfo(bggIds: number[]): Promise<BGGGameInfo[]> {
  if (bggIds.length === 0) return [];

  try {
    const idsParam = bggIds.join(',');
    const response = await fetch(
      `${BGG_API_BASE}/thing?id=${idsParam}&stats=1`
    );
    const text = await response.text();
    return parseBGGGamesInfo(text);
  } catch (error) {
    console.error('BGG batch info error:', error);
    return [];
  }
}

// XML Parsing helpers (BGG returns XML)
function parseBGGSearchResults(xml: string): BGGSearchResult[] {
  const results: BGGSearchResult[] = [];

  // Simple regex-based XML parsing for search results
  const itemRegex = /<item type="boardgame" id="(\d+)">/g;
  const nameRegex = /<name type="primary" value="([^"]+)"/;
  const yearRegex = /<yearpublished value="(\d+)"/;

  const items = xml.split('</item>');
  for (const item of items) {
    const idMatch = item.match(/<item type="boardgame" id="(\d+)">/);
    const nameMatch = item.match(nameRegex);

    if (idMatch && nameMatch) {
      const yearMatch = item.match(yearRegex);
      results.push({
        id: parseInt(idMatch[1], 10),
        name: decodeXMLEntities(nameMatch[1]),
        yearPublished: yearMatch ? parseInt(yearMatch[1], 10) : undefined,
      });
    }
  }

  return results;
}

function parseBGGGameInfo(xml: string): BGGGameInfo | null {
  const games = parseBGGGamesInfo(xml);
  return games[0] ?? null;
}

function parseBGGGamesInfo(xml: string): BGGGameInfo[] {
  const games: BGGGameInfo[] = [];

  const items = xml.split('</item>');
  for (const item of items) {
    const idMatch = item.match(/<item type="boardgame" id="(\d+)">/);
    if (!idMatch) continue;

    const getValue = (pattern: RegExp): string => {
      const match = item.match(pattern);
      return match ? decodeXMLEntities(match[1]) : '';
    };

    const getNumValue = (pattern: RegExp): number => {
      const match = item.match(pattern);
      return match ? parseFloat(match[1]) : 0;
    };

    games.push({
      id: parseInt(idMatch[1], 10),
      name: getValue(/<name type="primary" value="([^"]+)"/),
      thumbnail: getValue(/<thumbnail>([^<]+)<\/thumbnail>/),
      image: getValue(/<image>([^<]+)<\/image>/),
      description: getValue(/<description>([^<]*)<\/description>/),
      yearPublished: getNumValue(/<yearpublished value="(\d+)"/),
      minPlayers: getNumValue(/<minplayers value="(\d+)"/),
      maxPlayers: getNumValue(/<maxplayers value="(\d+)"/),
      playingTime: getNumValue(/<playingtime value="(\d+)"/),
      minPlayTime: getNumValue(/<minplaytime value="(\d+)"/),
      maxPlayTime: getNumValue(/<maxplaytime value="(\d+)"/),
      averageWeight: getNumValue(/<averageweight value="([\d.]+)"/),
    });
  }

  return games;
}

function decodeXMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#10;/g, '\n')
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
}

// Known BGG IDs for initial games
export const KNOWN_BGG_IDS: Record<string, number> = {
  splendor: 148228,
  wingspan: 266192,
  'terraforming-mars': 167791,
  'ticket-to-ride': 9209,
  catan: 13,
  azul: 230802,
  '7-wonders': 68448,
  'pandemic': 30549,
  'twilight-imperium': 233078, // 4th edition
};
