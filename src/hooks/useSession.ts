import { useSessionStore } from '../stores/sessionStore';
import { GameSession, Player } from '../types';

/**
 * Hook to access the game session store
 * Provides access to active session and all session management functions
 */
export const useSession = () => {
  const currentSession = useSessionStore((state) => state.currentSession);
  const sessions = useSessionStore((state) => state.sessions);

  const createSession = useSessionStore((state) => state.createSession);
  const setCurrentSession = useSessionStore((state) => state.setCurrentSession);
  const endSession = useSessionStore((state) => state.endSession);
  const updateSession = useSessionStore((state) => state.updateSession);
  const loadSessions = useSessionStore((state) => state.loadSessions);
  const deleteSession = useSessionStore((state) => state.deleteSession);

  return {
    activeSession: currentSession,
    savedSessions: sessions,
    createSession,
    loadSession: setCurrentSession,
    endSession,
    updateSession,
    saveSession: async () => {}, // handled automatically in store
    loadSavedSessions: loadSessions,
    deleteSession,
    startSession: createSession, // alias for setup screen
  };
};

/**
 * Hook to access score management functions
 */
export const useScoring = () => {
  const currentSession = useSessionStore((state) => state.currentSession);
  const updatePlayerScore = useSessionStore((state) => state.updatePlayerScore);
  const undoPlayerScore = useSessionStore((state) => state.undoPlayerScore);

  const addScore = (playerId: string, points: number, category?: string) => {
    updatePlayerScore(playerId, category || 'main', points);
  };

  const undoScore = (playerId: string, scoreIndex: number) => {
    undoPlayerScore(playerId, scoreIndex);
  };

  const getPlayerTotal = (playerId: string): number => {
    if (!currentSession) return 0;
    const scores = currentSession.scores[playerId] || [];
    return scores.reduce((sum, score) => sum + score.points, 0);
  };

  const getPlayerScore = (playerId: string): number => {
    return getPlayerTotal(playerId);
  };

  const getPlayerScores = (playerId: string): number[] => {
    if (!currentSession) return [];
    return (currentSession.scores[playerId] || []).map(s => s.points);
  };

  const getPlayerScoreHistory = (playerId: string) => {
    if (!currentSession) return [];
    return currentSession.scores[playerId] || [];
  };

  return {
    addScore,
    updateScore: updatePlayerScore,
    undoScore,
    getPlayerScore,
    getPlayerScores,
    getPlayerTotal,
    getPlayerScoreHistory,
  };
};

/**
 * Hook to access turn management functions
 */
export const useTurnTracking = () => {
  const currentSession = useSessionStore((state) => state.currentSession);
  const advanceTurn = useSessionStore((state) => state.advanceTurn);
  const nextPlayer = useSessionStore((state) => state.nextPlayer);
  const updateSession = useSessionStore((state) => state.updateSession);

  const getCurrentPlayer = (): Player | null => {
    if (!currentSession) return null;
    return currentSession.players[currentSession.currentPlayerIndex] || null;
  };

  const nextTurn = () => {
    advanceTurn();
    nextPlayer();
  };

  const previousTurn = () => {
    if (!currentSession || currentSession.turnNumber <= 1) return;
    updateSession(currentSession.id, {
      turnNumber: currentSession.turnNumber - 1,
    });
  };

  const setCurrentPlayer = (index: number) => {
    if (!currentSession) return;
    updateSession(currentSession.id, {
      currentPlayerIndex: index,
    });
  };

  return {
    currentPlayerIndex: currentSession?.currentPlayerIndex ?? 0,
    currentPlayer: getCurrentPlayer(),
    turnNumber: currentSession?.turnNumber ?? 0,
    nextTurn,
    previousTurn,
    setCurrentPlayer,
  };
};

// Alias for backwards compatibility
export const useTurn = useTurnTracking;

/**
 * Hook to access resource management functions
 */
export const useResources = () => {
  const currentSession = useSessionStore((state) => state.currentSession);
  const updatePlayerResource = useSessionStore((state) => state.updatePlayerResource);

  const updateResource = (playerId: string, resourceId: string, value: number) => {
    updatePlayerResource(playerId, resourceId, value);
  };

  const getPlayerResource = (playerId: string, resourceId: string): number => {
    if (!currentSession?.resources) return 0;
    return currentSession.resources[playerId]?.[resourceId] || 0;
  };

  const getPlayerResources = (playerId: string): Record<string, number> => {
    if (!currentSession?.resources) return {};
    return currentSession.resources[playerId] || {};
  };

  return {
    resources: currentSession?.resources,
    updateResource,
    getPlayerResource,
    getPlayerResources,
  };
};

/**
 * Hook to access phase management functions
 */
export const usePhases = () => {
  const currentSession = useSessionStore((state) => state.currentSession);
  const updateSession = useSessionStore((state) => state.updateSession);

  const setPhase = (phaseId: string) => {
    if (!currentSession) return;
    updateSession(currentSession.id, { currentPhase: phaseId });
  };

  const nextPhase = () => {
    // Phase navigation logic would depend on game definition
    // For now, just a placeholder
    if (!currentSession) return;
    // Implementation would cycle through game.phases
  };

  const previousPhase = () => {
    if (!currentSession) return;
    // Implementation would go back in game.phases
  };

  return {
    currentPhase: currentSession?.currentPhase,
    setPhase,
    nextPhase,
    previousPhase,
  };
};

// Alias for backwards compatibility
export const usePhase = usePhases;

/**
 * Hook to get all players in the active session
 */
export const usePlayers = (): Player[] => {
  const currentSession = useSessionStore((state) => state.currentSession);
  return currentSession?.players || [];
};

/**
 * Hook to check if there's an active session
 */
export const useHasActiveSession = (): boolean => {
  const currentSession = useSessionStore((state) => state.currentSession);
  return currentSession !== null;
};

/**
 * Hook to get the current active session
 */
export const useCurrentSession = () => {
  return useSessionStore((state) => state.currentSession);
};
