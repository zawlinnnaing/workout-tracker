import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { WorkoutLogProvider } from '@/providers/WorkoutLogProvider';
import { WorkoutProvider } from '@/providers/WorkoutProvider';
import { useColorScheme } from '@/hooks/useColorScheme';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="system">
      <WorkoutProvider>
        <WorkoutLogProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', title: 'Modal' }}
            />
            <Stack.Screen name="workout/[id]" options={{ headerShown: true }} />
            <Stack.Screen name="workout-log/[id]" options={{ headerShown: true }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
        </WorkoutLogProvider>
      </WorkoutProvider>
    </GluestackUIProvider>
  );
}
