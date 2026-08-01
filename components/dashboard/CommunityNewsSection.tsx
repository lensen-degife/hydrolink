import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';

export type NewsItem = {
  id: string;
  category: 'Water Maintenance' | 'New Water Tariff' | 'Emergency Interruption' | 'Public Notice';
  title: string;
  description: string;
  date: string;
  badgeBg: string;
  badgeText: string;
};

type NewsSectionProps = {
  onSelectNews?: (item: NewsItem) => void;
};

export function CommunityNewsSection({ onSelectNews }: NewsSectionProps) {
  const { colors } = useDashboardTheme();

  const newsData: NewsItem[] = [
    {
      id: 'news_1',
      category: 'Water Maintenance',
      title: 'Scheduled Pipeline Upgrades in Kebele 01',
      description: 'Routine maintenance and filter replacement scheduled on Thursday from 2:00 PM to 5:00 PM.',
      date: 'Aug 02, 2026',
      badgeBg: colors.primaryContainer,
      badgeText: colors.primary,
    },
    {
      id: 'news_2',
      category: 'New Water Tariff',
      title: '2026 Revised Utility Rates Announcement',
      description: 'The Woreda Water Bureau has updated tier 1 and tier 2 residential water consumption tariffs.',
      date: 'Aug 01, 2026',
      badgeBg: colors.secondaryContainer,
      badgeText: colors.onSecondaryContainer,
    },
    {
      id: 'news_3',
      category: 'Emergency Interruption',
      title: 'Urgent Pump Station Repairs (Sector B)',
      description: 'Emergency technical repairs underway at Sector B main booster pump. Restoration expected by 6:00 PM.',
      date: 'Jul 31, 2026',
      badgeBg: colors.errorContainer,
      badgeText: colors.onErrorContainer,
    },
    {
      id: 'news_4',
      category: 'Public Notice',
      title: 'Annual Meter Inspection Drive',
      description: 'Official HydroLink technicians will conduct physical meter calibration and inspection visits this weekend.',
      date: 'Jul 29, 2026',
      badgeBg: colors.warningContainer,
      badgeText: colors.onWarningContainer,
    },
  ];

  const renderCard = ({ item }: { item: NewsItem }) => (
    <Pressable
      onPress={() => onSelectNews?.(item)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.borderLight },
        DashboardShadows.soft,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: item.badgeBg }]}>
          <Text style={[styles.categoryText, { color: item.badgeText }]}>{item.category}</Text>
        </View>
        <Text style={[styles.dateText, { color: colors.textMuted }]}>{item.date}</Text>
      </View>

      <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
        {item.title}
      </Text>
      
      <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={3}>
        {item.description}
      </Text>

      <View style={styles.cardFooter}>
        <Text style={[styles.readMoreText, { color: colors.primary }]}>Read More</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Latest Community News
        </Text>
        <Pressable onPress={() => onSelectNews?.(newsData[0])}>
          <Text style={[styles.seeAllText, { color: colors.primary }]}>View All</Text>
        </Pressable>
      </View>

      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        decelerationRate="fast"
        snapToInterval={280 + 16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: DashboardLayout.sectionSpacing,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DashboardLayout.containerPadding,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: DashboardLayout.containerPadding,
    gap: 16,
    paddingBottom: 6,
  },
  card: {
    width: 280,
    borderRadius: DashboardLayout.cardRadius,
    padding: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '500',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
