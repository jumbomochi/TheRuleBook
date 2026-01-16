import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PlayerProfile, PlayerStats } from '../types/playerProfile';

const PROFILES_STORAGE_KEY = '@therulebook:player_profiles';

export const playerProfileService = {
  /**
   * Get all player profiles
   */
  async getAllProfiles(): Promise<PlayerProfile[]> {
    try {
      const profilesData = await AsyncStorage.getItem(PROFILES_STORAGE_KEY);
      if (!profilesData) return [];

      const profiles: PlayerProfile[] = JSON.parse(profilesData);
      return profiles.map((profile) => ({
        ...profile,
        createdAt: new Date(profile.createdAt),
        lastPlayedAt: profile.lastPlayedAt
          ? new Date(profile.lastPlayedAt)
          : undefined,
      }));
    } catch (error) {
      console.error('Failed to get all profiles:', error);
      throw error;
    }
  },

  /**
   * Get a specific player profile by ID
   */
  async getProfile(profileId: string): Promise<PlayerProfile | null> {
    try {
      const profiles = await this.getAllProfiles();
      return profiles.find((p) => p.id === profileId) || null;
    } catch (error) {
      console.error('Failed to get profile:', error);
      throw error;
    }
  },

  /**
   * Create a new player profile
   */
  async createProfile(
    name: string,
    favoriteColor: string
  ): Promise<PlayerProfile> {
    try {
      const profile: PlayerProfile = {
        id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        favoriteColor,
        stats: {
          gamesPlayed: 0,
          gamesWon: 0,
          totalScore: 0,
          favoriteGames: [],
        },
        createdAt: new Date(),
      };

      const profiles = await this.getAllProfiles();
      profiles.push(profile);

      await AsyncStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));

      return profile;
    } catch (error) {
      console.error('Failed to create profile:', error);
      throw error;
    }
  },

  /**
   * Update a player profile
   */
  async updateProfile(
    profileId: string,
    updates: Partial<Omit<PlayerProfile, 'id' | 'createdAt'>>
  ): Promise<void> {
    try {
      const profiles = await this.getAllProfiles();
      const index = profiles.findIndex((p) => p.id === profileId);

      if (index === -1) {
        throw new Error(`Profile not found: ${profileId}`);
      }

      profiles[index] = {
        ...profiles[index],
        ...updates,
      };

      await AsyncStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },

  /**
   * Delete a player profile
   */
  async deleteProfile(profileId: string): Promise<void> {
    try {
      const profiles = await this.getAllProfiles();
      const filtered = profiles.filter((p) => p.id !== profileId);

      await AsyncStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete profile:', error);
      throw error;
    }
  },

  /**
   * Update player stats after a game
   */
  async updateStatsAfterGame(
    profileId: string,
    gameId: string,
    score: number,
    won: boolean
  ): Promise<void> {
    try {
      const profile = await this.getProfile(profileId);
      if (!profile) return;

      const stats: PlayerStats = {
        gamesPlayed: profile.stats.gamesPlayed + 1,
        gamesWon: profile.stats.gamesWon + (won ? 1 : 0),
        totalScore: profile.stats.totalScore + score,
        favoriteGames: profile.stats.favoriteGames,
      };

      // Add to favorite games if not already there
      if (!stats.favoriteGames.includes(gameId)) {
        stats.favoriteGames.push(gameId);
      }

      await this.updateProfile(profileId, {
        stats,
        lastPlayedAt: new Date(),
      });
    } catch (error) {
      console.error('Failed to update stats:', error);
      throw error;
    }
  },

  /**
   * Search profiles by name
   */
  async searchProfiles(query: string): Promise<PlayerProfile[]> {
    try {
      const profiles = await this.getAllProfiles();
      const lowerQuery = query.toLowerCase();
      return profiles.filter((p) =>
        p.name.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Failed to search profiles:', error);
      throw error;
    }
  },
};
