import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

interface SandTimerProps {
  durationSeconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
  label?: string;
}

export const SandTimer: React.FC<SandTimerProps> = ({
  durationSeconds,
  onComplete,
  autoStart = false,
  label,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [rotateAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && secondsRemaining > 0) {
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
  }, [isRunning, secondsRemaining, onComplete]);

  const handleFlip = () => {
    // Rotate animation
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();

    // Reset timer
    setSecondsRemaining(durationSeconds);
    setIsRunning(true);
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const progress = 1 - secondsRemaining / durationSeconds;
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="labelLarge" style={styles.label}>
          {label}
        </Text>
      )}
      <Animated.View
        style={[
          styles.timerBody,
          { transform: [{ rotate: rotation }] },
        ]}
      >
        <View style={styles.hourglassTop}>
          <View
            style={[
              styles.sand,
              { height: `${(1 - progress) * 100}%` },
            ]}
          />
        </View>
        <View style={styles.hourglassNeck} />
        <View style={styles.hourglassBottom}>
          <View
            style={[
              styles.sand,
              { height: `${progress * 100}%`, alignSelf: 'flex-end' },
            ]}
          />
        </View>
      </Animated.View>
      <Text variant="bodyLarge" style={styles.timeText}>
        {secondsRemaining}s
      </Text>
      <View style={styles.controls}>
        <IconButton
          icon={isRunning ? 'pause' : 'play'}
          size={24}
          onPress={handleToggle}
        />
        <IconButton icon="restart" size={24} onPress={handleFlip} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
    minWidth: 120,
  },
  label: {
    marginBottom: 8,
    textAlign: 'center',
  },
  timerBody: {
    width: 60,
    height: 100,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hourglassTop: {
    width: 60,
    height: 40,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: '#666',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  hourglassNeck: {
    width: 10,
    height: 12,
    backgroundColor: '#666',
    alignSelf: 'center',
  },
  hourglassBottom: {
    width: 60,
    height: 40,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#666',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  sand: {
    backgroundColor: '#ffa726',
    width: '100%',
  },
  timeText: {
    fontVariant: ['tabular-nums'],
    marginBottom: 4,
  },
  controls: {
    flexDirection: 'row',
    gap: 4,
  },
});
