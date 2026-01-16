import { create } from 'zustand';
import {
  GameSession,
  Player,
  PlayerScores,
  PlayerResources,
  SavedSession,
} from '../types/session';
import { getGame } from '../data/games';
import { sessionPersistence } from '../services/sessionPersistence';

interface SessionStore {
  sessions: GameSession[];
  currentSession: GameSession | null;
  isLoading: boolean;

  // Actions
  loadSessions: () => Promise<void>;
  createSession: (gameId: string, players: Player[]) => GameSession;
  setCurrentSession: (sessionId: string | null) => Promise<void>;
  updateSession: (sessionId: string, updates: Partial<GameSession>) => void;
  deleteSession: (sessionId: string) => Promise<void>;
  saveSessionToDisk: (session: GameSession) => Promise<void>;

  // Player actions
  nextPlayer: () => void;
  updatePlayerScore: (
    playerId: string,
    categoryId: string,
    score: number
  ) => void;
  undoPlayerScore: (playerId: string, scoreIndex: number) => void;
  updatePlayerResource: (
    playerId: string,
    resourceId: string,
    value: number
  ) => void;

  // Session management
  endSession: (winnerId?: string) => void;
  advanceTurn: () => void;
  advanceRound: () => void;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessions: [],
  currentSession: null,
  isLoading: false,

  loadSessions: async () => {
    set({ isLoading: true });
    try {
      const sessions = await sessionPersistence.getAllSessions();
      set({ sessions });

      // Load active session if exists
      const activeSession = await sessionPersistence.getActiveSession();
      if (activeSession) {
        set({ currentSession: activeSession });
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  createSession: (gameId: string, players: Player[]) => {
    const game = getGame(gameId);
    if (!game) {
      throw new Error(`Game not found: ${gameId}`);
    }

    // Initialize scores structure
    const scores: PlayerScores = {};
    players.forEach((player) => {
      scores[player.id] = [];
    });

    // Initialize resources if game has them
    const resources: PlayerResources | undefined = game.resources
      ? {}
      : undefined;
    if (resources && game.resources) {
      players.forEach((player) => {
        resources[player.id] = {};
        game.resources!.forEach((resource) => {
          resources[player.id][resource.id] = resource.startingValue || 0;
        });
      });
    }

    const session: GameSession = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      gameId,
      players,
      scores,
      currentPlayerIndex: 0,
      turnNumber: 1,
      roundNumber: 1,
      startedAt: new Date(),
      lastUpdatedAt: new Date(),
      resources,
    };

    set((state) => ({
      sessions: [...state.sessions, session],
      currentSession: session,
    }));

    // Save to disk and set as active
    sessionPersistence.saveSession(session);
    sessionPersistence.setActiveSession(session.id);

    return session;
  },

  setCurrentSession: async (sessionId: string | null) => {
    if (sessionId) {
      const session = await sessionPersistence.loadSession(sessionId);
      set({ currentSession: session });
      if (session) {
        await sessionPersistence.setActiveSession(sessionId);
      }
    } else {
      set({ currentSession: null });
      await sessionPersistence.clearActiveSession();
    }
  },

  updateSession: (sessionId: string, updates: Partial<GameSession>) => {
    set((state) => {
      const sessions = state.sessions.map((s) =>
        s.id === sessionId
          ? { ...s, ...updates, lastUpdatedAt: new Date() }
          : s
      );

      const currentSession =
        state.currentSession?.id === sessionId
          ? { ...state.currentSession, ...updates, lastUpdatedAt: new Date() }
          : state.currentSession;

      // Save to disk
      const updatedSession = sessions.find((s) => s.id === sessionId);
      if (updatedSession) {
        sessionPersistence.saveSession(updatedSession);
      }

      return { sessions, currentSession };
    });
  },

  deleteSession: async (sessionId: string) => {
    await sessionPersistence.deleteSession(sessionId);

    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
      currentSession:
        state.currentSession?.id === sessionId ? null : state.currentSession,
    }));
  },

  saveSessionToDisk: async (session: GameSession) => {
    await sessionPersistence.saveSession(session);
  },

  nextPlayer: () => {
    const { currentSession } = get();
    if (!currentSession) return;

    const nextIndex =
      (currentSession.currentPlayerIndex + 1) % currentSession.players.length;

    get().updateSession(currentSession.id, {
      currentPlayerIndex: nextIndex,
    });
  },

  updatePlayerScore: (playerId: string, categoryId: string, score: number) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const updatedScores = { ...currentSession.scores };
    if (!updatedScores[playerId]) {
      updatedScores[playerId] = [];
    }

    updatedScores[playerId].push({
      points: score,
      category: categoryId,
      timestamp: new Date(),
    });

    get().updateSession(currentSession.id, { scores: updatedScores });
  },

  undoPlayerScore: (playerId: string, scoreIndex: number) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const updatedScores = { ...currentSession.scores };
    if (!updatedScores[playerId] || !updatedScores[playerId][scoreIndex]) {
      return;
    }

    updatedScores[playerId] = updatedScores[playerId].filter(
      (_, index) => index !== scoreIndex
    );

    get().updateSession(currentSession.id, { scores: updatedScores });
  },

  updatePlayerResource: (
    playerId: string,
    resourceId: string,
    value: number
  ) => {
    const { currentSession } = get();
    if (!currentSession || !currentSession.resources) return;

    const updatedResources = { ...currentSession.resources };
    if (!updatedResources[playerId]) {
      updatedResources[playerId] = {};
    }

    updatedResources[playerId][resourceId] = value;

    get().updateSession(currentSession.id, { resources: updatedResources });
  },

  endSession: (winnerId?: string) => {
    const { currentSession } = get();
    if (!currentSession) return;

    get().updateSession(currentSession.id, {
      completedAt: new Date(),
      winner: winnerId,
    });
  },

  advanceTurn: () => {
    const { currentSession } = get();
    if (!currentSession) return;

    get().updateSession(currentSession.id, {
      turnNumber: currentSession.turnNumber + 1,
    });
  },

  advanceRound: () => {
    const { currentSession } = get();
    if (!currentSession) return;

    get().updateSession(currentSession.id, {
      roundNumber: (currentSession.roundNumber || 1) + 1,
    });
  },
}));
