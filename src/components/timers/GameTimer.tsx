import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';

interface GameTimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  initialSeconds = 0,
  onComplete,
  autoStart = false,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          return next;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused]);

  const formatTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
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
    setSeconds(initialSeconds);
    setIsRunning(false);
    setIsPaused(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.timeDisplay}>
        {formatTime(seconds)}
      </Text>
      <View style={styles.controls}>
        <IconButton
          icon={!isRunning ? 'play' : isPaused ? 'play' : 'pause'}
          size={32}
          onPress={handleStartPause}
        />
        <IconButton icon="restart" size={32} onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  timeDisplay: {
    fontVariant: ['tabular-nums'],
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
});
