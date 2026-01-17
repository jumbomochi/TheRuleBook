// Asset Management Service
// Handles game assets, caching, and color theming

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LegacyFileSystem from 'expo-file-system/legacy';
import { Paths } from 'expo-file-system';
import { GameAssets, ColorPalette, ComponentPhoto } from '../types/assets';
import { getBGGGameInfo, KNOWN_BGG_IDS } from './bggService';

const ASSETS_CACHE_KEY = '@TheRuleBook:assets';
const getAssetsDir = () => Paths.document.uri + 'assets/';

// Default color palettes for games (extracted from box art or manually set)
const DEFAULT_PALETTES: Record<string, ColorPalette> = {
  splendor: {
    primary: '#8B4513',
    secondary: '#DAA520',
    accent: '#228B22',
    background: '#1A1A1A',
    surface: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  },
  wingspan: {
    primary: '#4A90A4',
    secondary: '#E8D5B7',
    accent: '#7CB342',
    background: '#1A1A1A',
    surface: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  },
  'terraforming-mars': {
    primary: '#C84B31',
    secondary: '#ECDBBA',
    accent: '#2D4263',
    background: '#1A1A1A',
    surface: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  },
  'ticket-to-ride': {
    primary: '#1E88E5',
    secondary: '#FFC107',
    accent: '#E53935',
    background: '#1A1A1A',
    surface: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  },
};

const DEFAULT_PALETTE: ColorPalette = {
  primary: '#6366F1',
  secondary: '#A5B4FC',
  accent: '#F59E0B',
  background: '#1A1A1A',
  surface: '#2D2D2D',
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
};

interface CachedAssets {
  [gameId: string]: {
    boxArtUri?: string;
    thumbnailUri?: string;
    fetchedAt: number;
  };
}

let assetsCache: CachedAssets = {};

/**
 * Initialize the asset service
 */
export async function initAssetService(): Promise<void> {
  try {
    // Ensure assets directory exists
    const dirInfo = await LegacyFileSystem.getInfoAsync(getAssetsDir());
    if (!dirInfo.exists) {
      await LegacyFileSystem.makeDirectoryAsync(getAssetsDir(), { intermediates: true });
    }

    // Load cached asset metadata
    const cached = await AsyncStorage.getItem(ASSETS_CACHE_KEY);
    if (cached) {
      assetsCache = JSON.parse(cached);
    }
  } catch (error) {
    console.error('Failed to init asset service:', error);
  }
}

/**
 * Get assets for a game, fetching from BGG if needed
 * This is the main entry point for accessing game assets
 */
export async function getGameAssets(gameId: string, bggId?: number): Promise<GameAssets> {
  const palette = DEFAULT_PALETTES[gameId] ?? DEFAULT_PALETTE;

  const assets: GameAssets = {
    icon: `game-icon-${gameId}`,
    colorScheme: palette,
  };

  // Check if we have cached assets
  const cached = assetsCache[gameId];
  if (cached?.boxArtUri) {
    assets.boxArt = cached.boxArtUri;
    assets.boxArtThumbnail = cached.thumbnailUri;
    return assets;
  }

  // Try to fetch from BGG
  const resolvedBggId = bggId ?? KNOWN_BGG_IDS[gameId];
  if (resolvedBggId) {
    try {
      const bggInfo = await getBGGGameInfo(resolvedBggId);
      if (bggInfo) {
        // Download and cache the box art
        if (bggInfo.image) {
          const localUri = await cacheRemoteImage(gameId, bggInfo.image, 'boxart');
          if (localUri) {
            assets.boxArt = localUri;
            assetsCache[gameId] = {
              ...assetsCache[gameId],
              boxArtUri: localUri,
              fetchedAt: Date.now(),
            };
          }
        }

        if (bggInfo.thumbnail) {
          const thumbUri = await cacheRemoteImage(gameId, bggInfo.thumbnail, 'thumb');
          if (thumbUri) {
            assets.boxArtThumbnail = thumbUri;
            assetsCache[gameId] = {
              ...assetsCache[gameId],
              thumbnailUri: thumbUri,
              fetchedAt: Date.now(),
            };
          }
        }

        // Persist cache
        await AsyncStorage.setItem(ASSETS_CACHE_KEY, JSON.stringify(assetsCache));
      }
    } catch (error) {
      console.error(`Failed to fetch BGG assets for ${gameId}:`, error);
    }
  }

  return assets;
}

/**
 * Prefetch assets for multiple games (useful for library loading)
 */
export async function prefetchGameAssets(games: Array<{ id: string; bggId?: number }>): Promise<void> {
  const promises = games.map(game => getGameAssets(game.id, game.bggId));
  await Promise.all(promises);
}

/**
 * Download and cache a remote image
 */
async function cacheRemoteImage(
  gameId: string,
  remoteUri: string,
  type: string
): Promise<string | null> {
  try {
    const gameDir = getAssetsDir() + gameId + '/';
    const dirInfo = await LegacyFileSystem.getInfoAsync(gameDir);
    if (!dirInfo.exists) {
      await LegacyFileSystem.makeDirectoryAsync(gameDir, { intermediates: true });
    }

    const ext = remoteUri.split('.').pop()?.split('?')[0] ?? 'jpg';
    const localPath = gameDir + `${type}.${ext}`;

    const downloadResult = await LegacyFileSystem.downloadAsync(remoteUri, localPath);

    if (downloadResult.status === 200) {
      return downloadResult.uri;
    }

    return null;
  } catch (error) {
    console.error('Failed to cache image:', error);
    return null;
  }
}

/**
 * Get color palette for a game
 */
export function getGamePalette(gameId: string): ColorPalette {
  return DEFAULT_PALETTES[gameId] ?? DEFAULT_PALETTE;
}

/**
 * Save a user photo for a game component
 */
export async function saveUserPhoto(
  gameId: string,
  photoUri: string,
  componentType: string,
  label: string
): Promise<ComponentPhoto | null> {
  try {
    const userDir = getAssetsDir() + 'user/' + gameId + '/';
    const dirInfo = await LegacyFileSystem.getInfoAsync(userDir);
    if (!dirInfo.exists) {
      await LegacyFileSystem.makeDirectoryAsync(userDir, { intermediates: true });
    }

    const id = `${componentType}-${Date.now()}`;
    const ext = photoUri.split('.').pop() ?? 'jpg';
    const localPath = userDir + `${id}.${ext}`;

    await LegacyFileSystem.copyAsync({
      from: photoUri,
      to: localPath,
    });

    return {
      id,
      type: componentType as any,
      label,
      uri: localPath,
      source: 'user',
    };
  } catch (error) {
    console.error('Failed to save user photo:', error);
    return null;
  }
}

/**
 * Clear cached assets for a game
 */
export async function clearGameAssets(gameId: string): Promise<void> {
  try {
    const gameDir = getAssetsDir() + gameId + '/';
    const dirInfo = await LegacyFileSystem.getInfoAsync(gameDir);
    if (dirInfo.exists) {
      await LegacyFileSystem.deleteAsync(gameDir, { idempotent: true });
    }

    delete assetsCache[gameId];
    await AsyncStorage.setItem(ASSETS_CACHE_KEY, JSON.stringify(assetsCache));
  } catch (error) {
    console.error('Failed to clear game assets:', error);
  }
}

/**
 * Get total size of cached assets
 * Note: This is an estimate - expo-file-system doesn't provide directory size directly
 */
export async function getCacheSize(): Promise<number> {
  try {
    const dirInfo = await LegacyFileSystem.getInfoAsync(getAssetsDir());
    if (!dirInfo.exists) return 0;
    // Size calculation would require recursively checking all files
    // For now, return a placeholder or implement custom calculation
    return 0;
  } catch (error) {
    return 0;
  }
}
