import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';

export type TabName = 'Home' | 'Bills' | 'Schedule' | 'Reports' | 'Profile';

type BottomNavProps = {
  activeTab?: TabName;
  onSelectTab?: (tab: TabName) => void;
};

export function BottomNavigationBar({ activeTab = 'Home', onSelectTab }: BottomNavProps) {
  const { colors, isDark } = useDashboardTheme();

  const navItems: { name: TabName; icon: string; activeIcon: string }[] = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Bills', icon: 'card-outline', activeIcon: 'card' },
    { name: 'Schedule', icon: 'calendar-outline', activeIcon: 'calendar' },
    { name: 'Reports', icon: 'document-text-outline', activeIcon: 'document-text' },
    { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.borderLight,
        },
      ]}
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.name;
        return (
          <Pressable
            key={item.name}
            onPress={() => onSelectTab?.(item.name)}
            style={({ pressed }) => [styles.navItem, pressed && styles.pressed]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            {/* Active Indicator Pill */}
            <View
              style={[
                styles.iconContainer,
                isActive && { backgroundColor: colors.primaryContainer },
              ]}
            >
              <Ionicons
                name={(isActive ? item.activeIcon : item.icon) as any}
                size={22}
                color={isActive ? colors.primary : colors.textMuted}
              />
            </View>
            <Text
              style={[
                styles.navLabel,
                { color: isActive ? colors.primary : colors.textMuted },
                isActive && styles.activeLabel,
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 70,
    borderTopWidth: 1,
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  activeLabel: {
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});
