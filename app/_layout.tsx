import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { HydroNavigationTheme } from '@/constants/auth-theme';
import { ThemeProvider as DashboardThemeProvider } from '@/components/dashboard/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider value={HydroNavigationTheme}>
      <DashboardThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="about-developer" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </DashboardThemeProvider>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
