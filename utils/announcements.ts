import type { Announcement } from '@/services/announcements';
import type { NewsItem } from '@/components/dashboard/CommunityNewsSection';
import { formatDate } from '@/utils/format';

type ThemeColors = {
  primaryContainer: string;
  primary: string;
  errorContainer?: string;
  onErrorContainer?: string;
  warningContainer?: string;
  onWarningContainer?: string;
  secondaryContainer?: string;
  onSecondaryContainer?: string;
};

export function announcementToNewsItem(
  announcement: Announcement,
  colors: ThemeColors,
): NewsItem {
  const titleLower = announcement.title.toLowerCase();
  let category: NewsItem['category'] = 'Public Notice';
  let badgeBg = colors.primaryContainer;
  let badgeText = colors.primary;

  if (titleLower.includes('maintenance') || titleLower.includes('repair')) {
    category = 'Water Maintenance';
  } else if (titleLower.includes('tariff') || titleLower.includes('rate')) {
    category = 'New Water Tariff';
    badgeBg = colors.secondaryContainer ?? colors.primaryContainer;
    badgeText = colors.onSecondaryContainer ?? colors.primary;
  } else if (titleLower.includes('emergency') || titleLower.includes('outage')) {
    category = 'Emergency Interruption';
    badgeBg = colors.errorContainer ?? colors.primaryContainer;
    badgeText = colors.onErrorContainer ?? colors.primary;
  }

  return {
    id: announcement.id,
    category,
    title: announcement.title,
    description: announcement.body,
    date: formatDate(announcement.createdAt),
    badgeBg,
    badgeText,
  };
}
