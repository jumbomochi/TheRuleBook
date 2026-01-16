import { usePlayerProfileStore } from '../stores/playerProfileStore';
import { PlayerProfile } from '../types/playerProfile';

/**
 * Hook to access player profile management
 */
export const usePlayerProfiles = () => {
  const profiles = usePlayerProfileStore((state) => state.profiles);
  const isLoading = usePlayerProfileStore((state) => state.isLoading);
  const loadProfiles = usePlayerProfileStore((state) => state.loadProfiles);
  const createProfile = usePlayerProfileStore((state) => state.createProfile);
  const updateProfile = usePlayerProfileStore((state) => state.updateProfile);
  const deleteProfile = usePlayerProfileStore((state) => state.deleteProfile);
  const getProfile = usePlayerProfileStore((state) => state.getProfile);
  const searchProfiles = usePlayerProfileStore((state) => state.searchProfiles);

  return {
    profiles,
    isLoading,
    loadProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    getProfile,
    searchProfiles,
  };
};
