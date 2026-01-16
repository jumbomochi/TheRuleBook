import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Modal } from 'react-native';
import { Card, Text, IconButton, Button, Searchbar } from 'react-native-paper';
import { usePlayerProfiles } from '../../hooks/usePlayerProfiles';
import { PlayerForm } from './PlayerForm';
import type { PlayerProfile } from '../../types/playerProfile';

interface PlayerProfileManagerProps {
  onSelectProfile?: (profile: PlayerProfile) => void;
  showStats?: boolean;
}

export const PlayerProfileManager: React.FC<PlayerProfileManagerProps> = ({
  onSelectProfile,
  showStats = true,
}) => {
  const {
    profiles,
    isLoading,
    loadProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    searchProfiles,
  } = usePlayerProfiles();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<PlayerProfile | null>(
    null
  );

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const displayedProfiles =
    searchQuery === '' ? profiles : searchProfiles(searchQuery);

  const handleCreateProfile = async (playerData: {
    name: string;
    color: string;
  }) => {
    await createProfile(playerData.name, playerData.color);
    setShowCreateModal(false);
  };

  const handleUpdateProfile = async (playerData: {
    name: string;
    color: string;
  }) => {
    if (editingProfile) {
      await updateProfile(editingProfile.id, {
        name: playerData.name,
        favoriteColor: playerData.color,
      });
      setEditingProfile(null);
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    await deleteProfile(profileId);
  };

  const renderProfile = ({ item: profile }: { item: PlayerProfile }) => {
    const winRate =
      profile.stats.gamesPlayed > 0
        ? Math.round((profile.stats.gamesWon / profile.stats.gamesPlayed) * 100)
        : 0;

    return (
      <Card
        style={styles.profileCard}
        onPress={() => onSelectProfile?.(profile)}
      >
        <Card.Content>
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <View
                style={[
                  styles.colorIndicator,
                  { backgroundColor: profile.favoriteColor },
                ]}
              />
              <Text variant="titleMedium">{profile.name}</Text>
            </View>
            <View style={styles.actions}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => setEditingProfile(profile)}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => handleDeleteProfile(profile.id)}
              />
            </View>
          </View>

          {showStats && (
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Games
                </Text>
                <Text variant="bodyLarge" style={styles.statValue}>
                  {profile.stats.gamesPlayed}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Wins
                </Text>
                <Text variant="bodyLarge" style={styles.statValue}>
                  {profile.stats.gamesWon}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Win Rate
                </Text>
                <Text variant="bodyLarge" style={styles.statValue}>
                  {winRate}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Total Score
                </Text>
                <Text variant="bodyLarge" style={styles.statValue}>
                  {profile.stats.totalScore}
                </Text>
              </View>
            </View>
          )}

          {profile.lastPlayedAt && (
            <Text variant="bodySmall" style={styles.lastPlayed}>
              Last played: {profile.lastPlayedAt.toLocaleDateString()}
            </Text>
          )}
        </Card.Content>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading profiles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search players"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <Button
          mode="contained"
          icon="plus"
          onPress={() => setShowCreateModal(true)}
          style={styles.addButton}
        >
          New Player
        </Button>
      </View>

      {displayedProfiles.length === 0 ? (
        <View style={styles.emptyState}>
          <Text variant="titleMedium">No players found</Text>
          <Text variant="bodyMedium" style={styles.emptyText}>
            Create a new player profile to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayedProfiles}
          renderItem={renderProfile}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal
        visible={showCreateModal || editingProfile !== null}
        onRequestClose={() => {
          setShowCreateModal(false);
          setEditingProfile(null);
        }}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text variant="titleLarge" style={styles.modalTitle}>
              {editingProfile ? 'Edit Player' : 'New Player'}
            </Text>
            <PlayerForm
              onSubmit={
                editingProfile ? handleUpdateProfile : handleCreateProfile
              }
              onCancel={() => {
                setShowCreateModal(false);
                setEditingProfile(null);
              }}
              initialPlayer={
                editingProfile
                  ? {
                      id: editingProfile.id,
                      name: editingProfile.name,
                      color: editingProfile.favoriteColor,
                    }
                  : undefined
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    gap: 8,
  },
  searchBar: {
    marginBottom: 8,
  },
  addButton: {
    alignSelf: 'flex-start',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  profileCard: {
    marginBottom: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#666',
  },
  statValue: {
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  lastPlayed: {
    marginTop: 8,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 8,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    maxWidth: 500,
  },
  modalTitle: {
    marginBottom: 16,
  },
});
