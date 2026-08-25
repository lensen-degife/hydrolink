import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout } from '@/constants/dashboard-theme';

type TopAppBarProps = {
  greeting?: string;
  userName?: string;
  accountNumber?: string;
  kebele?: string;
  onPressNotifications?: () => void;
  onPressProfile?: () => void;
  unreadCount?: number;
};

export function TopAppBar({
  greeting = 'Good Morning 👋',
  userName = 'Abebe Bikila',
  accountNumber = 'HL-884920',
  kebele = 'Boreda Woreda',
  onPressNotifications,
  onPressProfile,
  unreadCount = 3,
}: TopAppBarProps) {
  const { colors, isDark, toggleTheme } = useDashboardTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.greetingRow}>
          <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
            {greeting}
          </Text>
        </View>
        <Text style={[styles.nameText, { color: colors.textPrimary }]}>{userName}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.idText, { color: colors.primary, backgroundColor: colors.primaryContainer }]}>
            ID: {accountNumber}
          </Text>
          <View style={[styles.locationChip, { backgroundColor: colors.surfaceVariant }]}>
            <Ionicons name="location-sharp" size={13} color="#1976D2" />
            <Text style={[styles.locationText, { color: colors.textSecondary }]}>
              {kebele}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rightColumn}>
        {/* Theme Toggle Button */}
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: colors.surfaceVariant },
            pressed && styles.pressed,
          ]}
          accessibilityLabel="Toggle Dark Mode"
        >
          <Ionicons
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={20}
            color={colors.primary}
          />
        </Pressable>

        {/* Notifications Bell */}
        <Pressable
          onPress={onPressNotifications}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: colors.surfaceVariant },
            pressed && styles.pressed,
          ]}
          accessibilityLabel="Notifications"
        >
          <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
          {unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.error }]}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </Pressable>

        {/* Profile Avatar */}
        <Pressable
          onPress={onPressProfile}
          style={({ pressed }) => [styles.avatarContainer, pressed && styles.pressed]}
        >
          <View style={[styles.avatarBorder, { borderColor: colors.primary }]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              }}
              style={styles.avatarImage}
            />
            <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DashboardLayout.containerPadding,
    paddingVertical: 12,
  },
  leftColumn: {
    flex: 1,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
    flexWrap: 'wrap',
  },
  idText: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    letterSpacing: 0.3,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  avatarContainer: {
    marginLeft: 2,
  },
  avatarBorder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    padding: 2,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#CBD5E1',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
