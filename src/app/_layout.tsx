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
        name="game/[id]"
        options={{
          headerShown: true,
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
