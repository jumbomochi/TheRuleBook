import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useGames } from '../hooks';

/**
 * Root layout for the app
 * Sets up navigation stack and loads initial data
 */
export default function RootLayout() {
  const { loadGames } = useGames();

  useEffect(() => {
    // Load games on app start
    loadGames();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="game/index"
        options={{
          headerShown: true,
          title: 'Games',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="game/[id]/index"
        options={{
          headerShown: true,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="game/[id]/rules"
        options={{
          headerShown: true,
          title: 'Rules',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="game/[id]/setup"
        options={{
          headerShown: true,
          title: 'Game Setup',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="game/[id]/play"
        options={{
          headerShown: true,
          title: 'Playing',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
