import { create } from 'zustand';
import { PlayerProfile } from '../types/playerProfile';
import { playerProfileService } from '../services/playerProfileService';

interface PlayerProfileStore {
  profiles: PlayerProfile[];
  isLoading: boolean;

  // Actions
  loadProfiles: () => Promise<void>;
  createProfile: (name: string, favoriteColor: string) => Promise<PlayerProfile>;
  updateProfile: (
    profileId: string,
    updates: Partial<Omit<PlayerProfile, 'id' | 'createdAt'>>
  ) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
  getProfile: (profileId: string) => PlayerProfile | undefined;
  searchProfiles: (query: string) => PlayerProfile[];
}

export const usePlayerProfileStore = create<PlayerProfileStore>((set, get) => ({
  profiles: [],
  isLoading: false,

  loadProfiles: async () => {
    set({ isLoading: true });
    try {
      const profiles = await playerProfileService.getAllProfiles();
      set({ profiles });
    } catch (error) {
      console.error('Failed to load profiles:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  createProfile: async (name: string, favoriteColor: string) => {
    const profile = await playerProfileService.createProfile(name, favoriteColor);
    set((state) => ({
      profiles: [...state.profiles, profile],
    }));
    return profile;
  },

  updateProfile: async (profileId, updates) => {
    await playerProfileService.updateProfile(profileId, updates);
    set((state) => ({
      profiles: state.profiles.map((p) =>
        p.id === profileId ? { ...p, ...updates } : p
      ),
    }));
  },

  deleteProfile: async (profileId) => {
    await playerProfileService.deleteProfile(profileId);
    set((state) => ({
      profiles: state.profiles.filter((p) => p.id !== profileId),
    }));
  },

  getProfile: (profileId) => {
    return get().profiles.find((p) => p.id === profileId);
  },

  searchProfiles: (query) => {
    const profiles = get().profiles;
    const lowerQuery = query.toLowerCase();
    return profiles.filter((p) => p.name.toLowerCase().includes(lowerQuery));
  },
}));
