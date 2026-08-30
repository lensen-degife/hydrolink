import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from '@/components/dashboard';
import { useRouter } from 'expo-router';
import { useDashboard } from '@/contexts/DashboardDataContext';
import { logout } from '@/services/auth';

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useDashboardTheme();
  const router = useRouter();
  const { data } = useDashboard();
  const user = data.user;
  const displayName = user?.fullName ?? 'HydroLink Customer';
  const accountDetails = user
    ? `ID: ${user.accountNumber}${user.kebele ? ` • ${user.kebele}` : ''}`
    : 'ID: Not loaded';
  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Customer Profile</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            HydroLink Smart Utility Account Settings
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.avatarRow}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primaryContainer }]}>
              <Ionicons name="person" size={32} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.name, { color: colors.textPrimary }]}>{displayName}</Text>
              <Text style={[styles.id, { color: colors.textMuted }]}>{accountDetails}</Text>
              {user?.email ? (
                <Text style={[styles.id, { color: colors.textMuted }]}>{user.email}</Text>
              ) : null}
            </View>
          </View>

          <View style={[styles.menuList, { borderTopColor: colors.borderLight }]}>
            <Pressable onPress={toggleTheme} style={styles.menuItem}>
              <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={22} color={colors.primary} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Security & Biometrics</Text>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <Ionicons name="help-buoy-outline" size={22} color={colors.primary} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Support & FAQs</Text>
            </Pressable>

            <Pressable onPress={() => router.push('/about-developer')} style={styles.menuItem}>
              <Ionicons name="code-slash-outline" size={22} color={colors.primary} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>About the Developer</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={styles.chevron} />
            </Pressable>

            <Pressable
              onPress={handleLogout}
              style={[styles.menuItem, { marginTop: 10 }]}
            >
              <Ionicons name="log-out-outline" size={22} color={colors.error} />
              <Text style={[styles.menuText, { color: colors.error }]}>Log Out</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  id: {
    fontSize: 13,
    marginTop: 2,
  },
  menuList: {
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: 'auto',
  },
});
