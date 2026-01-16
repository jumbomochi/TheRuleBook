import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameSession } from '../types/session';

const SESSION_STORAGE_KEY = '@therulebook:sessions';
const ACTIVE_SESSION_KEY = '@therulebook:active_session';

export interface SessionMetadata {
  id: string;
  gameId: string;
  gameName: string;
  playerCount: number;
  startedAt: Date;
  lastUpdatedAt: Date;
}

export const sessionPersistence = {
  /**
   * Save a session to persistent storage
   */
  async saveSession(session: GameSession): Promise<void> {
    try {
      const sessionsData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      const sessions: Record<string, GameSession> = sessionsData
        ? JSON.parse(sessionsData)
        : {};

      sessions[session.id] = {
        ...session,
        lastUpdatedAt: new Date(),
      };

      await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save session:', error);
      throw error;
    }
  },

  /**
   * Load a specific session by ID
   */
  async loadSession(sessionId: string): Promise<GameSession | null> {
    try {
      const sessionsData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (!sessionsData) return null;

      const sessions: Record<string, GameSession> = JSON.parse(sessionsData);
      const session = sessions[sessionId];

      if (!session) return null;

      // Convert date strings back to Date objects
      return {
        ...session,
        startedAt: new Date(session.startedAt),
        lastUpdatedAt: new Date(session.lastUpdatedAt),
      };
    } catch (error) {
      console.error('Failed to load session:', error);
      throw error;
    }
  },

  /**
   * Get all saved sessions
   */
  async getAllSessions(): Promise<GameSession[]> {
    try {
      const sessionsData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (!sessionsData) return [];

      const sessions: Record<string, GameSession> = JSON.parse(sessionsData);
      return Object.values(sessions).map((session) => ({
        ...session,
        startedAt: new Date(session.startedAt),
        lastUpdatedAt: new Date(session.lastUpdatedAt),
      }));
    } catch (error) {
      console.error('Failed to get all sessions:', error);
      throw error;
    }
  },

  /**
   * Get session metadata (lighter weight than full sessions)
   */
  async getSessionsMetadata(): Promise<SessionMetadata[]> {
    try {
      const sessions = await this.getAllSessions();
      return sessions.map((session) => ({
        id: session.id,
        gameId: session.gameId,
        gameName: session.gameId, // Will need to lookup game name
        playerCount: session.players.length,
        startedAt: session.startedAt,
        lastUpdatedAt: session.lastUpdatedAt,
      }));
    } catch (error) {
      console.error('Failed to get sessions metadata:', error);
      throw error;
    }
  },

  /**
   * Delete a specific session
   */
  async deleteSession(sessionId: string): Promise<void> {
    try {
      const sessionsData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (!sessionsData) return;

      const sessions: Record<string, GameSession> = JSON.parse(sessionsData);
      delete sessions[sessionId];

      await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));

      // Clear active session if it was deleted
      const activeId = await this.getActiveSessionId();
      if (activeId === sessionId) {
        await this.clearActiveSession();
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
      throw error;
    }
  },

  /**
   * Delete all sessions
   */
  async deleteAllSessions(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
      await AsyncStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch (error) {
      console.error('Failed to delete all sessions:', error);
      throw error;
    }
  },

  /**
   * Set the active session ID
   */
  async setActiveSession(sessionId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(ACTIVE_SESSION_KEY, sessionId);
    } catch (error) {
      console.error('Failed to set active session:', error);
      throw error;
    }
  },

  /**
   * Get the active session ID
   */
  async getActiveSessionId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(ACTIVE_SESSION_KEY);
    } catch (error) {
      console.error('Failed to get active session:', error);
      throw error;
    }
  },

  /**
   * Clear the active session
   */
  async clearActiveSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch (error) {
      console.error('Failed to clear active session:', error);
      throw error;
    }
  },

  /**
   * Get the active session data
   */
  async getActiveSession(): Promise<GameSession | null> {
    try {
      const activeId = await this.getActiveSessionId();
      if (!activeId) return null;

      return await this.loadSession(activeId);
    } catch (error) {
      console.error('Failed to get active session:', error);
      throw error;
    }
  },
};
