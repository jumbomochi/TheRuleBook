import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, IconButton, ProgressBar } from 'react-native-paper';

interface TurnTimerProps {
  durationSeconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
  playerName?: string;
}

export const TurnTimer: React.FC<TurnTimerProps> = ({
  durationSeconds,
  onComplete,
  autoStart = false,
  playerName,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          const next = prev - 1;
          if (next === 0 && onComplete) {
            onComplete();
          }
          return Math.max(0, next);
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, secondsRemaining, onComplete]);

  const formatTime = useCallback((totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleStartPause = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const handleReset = () => {
    setSecondsRemaining(durationSeconds);
    setIsRunning(false);
    setIsPaused(false);
  };

  const progress = 1 - secondsRemaining / durationSeconds;
  const isWarning = secondsRemaining <= 10 && secondsRemaining > 0;
  const isExpired = secondsRemaining === 0;

  return (
    <View style={styles.container}>
      {playerName && (
        <Text variant="titleMedium" style={styles.playerName}>
          {playerName}'s Turn
        </Text>
      )}
      <Text
        variant="displaySmall"
        style={[
          styles.timeDisplay,
          isWarning && styles.warningTime,
          isExpired && styles.expiredTime,
        ]}
      >
        {formatTime(secondsRemaining)}
      </Text>
      <ProgressBar
        progress={progress}
        style={styles.progressBar}
        color={isWarning ? '#ff9800' : isExpired ? '#f44336' : '#4caf50'}
      />
      <View style={styles.controls}>
        <IconButton
          icon={!isRunning ? 'play' : isPaused ? 'play' : 'pause'}
          size={28}
          onPress={handleStartPause}
        />
        <IconButton icon="restart" size={28} onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  playerName: {
    marginBottom: 8,
  },
  timeDisplay: {
    fontVariant: ['tabular-nums'],
    marginBottom: 8,
  },
  warningTime: {
    color: '#ff9800',
  },
  expiredTime: {
    color: '#f44336',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
});
