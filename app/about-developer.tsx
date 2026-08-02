import React, { useEffect } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { DeveloperActionButton, DeveloperSection } from '@/components/developer';
import { useDashboardTheme } from '@/components/dashboard';
import { DashboardShadows } from '@/constants/dashboard-theme';

const developerLinks = {
  email: 'mailto:lensendegife@example.com',
  github: 'https://github.com/lensen-degife',
  linkedIn: 'https://www.linkedin.com/in/lensen-degife-60661b3b2/',
  portfolio: 'https://lensen-degife.github.io/my-portifolio1/',
};

function AnimatedCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(22);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 420, easing: Easing.out(Easing.cubic) }));
  }, [delay, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

function DetailRow({ icon, label, value }: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string; value: string }) {
  const { colors } = useDashboardTheme();
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={19} color={colors.primary} />
      <View style={styles.detailText}>
        <Text style={[styles.detailLabel, { color: colors.textMuted }]}>{label}</Text>
        <Text style={[styles.detailValue, { color: colors.textPrimary }]}>{value}</Text>
      </View>
    </View>
  );
}

export default function AboutDeveloperScreen() {
  const router = useRouter();
  const { colors } = useDashboardTheme();
  const avatarOpacity = useSharedValue(0);
  const avatarScale = useSharedValue(0.9);

  useEffect(() => {
    avatarOpacity.value = withTiming(1, { duration: 550, easing: Easing.out(Easing.quad) });
    avatarScale.value = withTiming(1, { duration: 550, easing: Easing.out(Easing.back(1.2)) });
  }, [avatarOpacity, avatarScale]);

  const avatarStyle = useAnimatedStyle(() => ({
    opacity: avatarOpacity.value,
    transform: [{ scale: avatarScale.value }],
  }));

  const openLink = (url: string) => {
    void Linking.openURL(url);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            android_ripple={{ color: colors.primaryContainer, borderless: true }}
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, opacity: pressed ? 0.8 : 1 }]}
          >
            <Ionicons name="arrow-back" size={23} color={colors.textPrimary} />
          </Pressable>
          <Text style={[styles.topBarTitle, { color: colors.textPrimary }]}>About the Developer</Text>
          <View style={styles.topBarSpacer} />
        </View>

        <Animated.View style={[styles.profileHeader, avatarStyle]}>
          <View style={[styles.avatar, DashboardShadows.medium, { backgroundColor: colors.primaryContainer, borderColor: colors.surface }]}>
            <Ionicons name="person" size={68} color={colors.primary} />
          </View>
          <Text style={[styles.name, { color: colors.textPrimary }]}>Lensen</Text>
          <Text style={[styles.role, { color: colors.primary }]}>Full Stack Software Developer</Text>
        </Animated.View>

        <AnimatedCard delay={120}>
          <DeveloperSection colors={colors} icon="heart-outline" title="Building with purpose">
            <Text style={[styles.bio, { color: colors.textSecondary }]}>Passionate about building modern digital solutions that improve community services through technology. HydroLink was created to simplify water service management, payments, reporting, and communication between water utilities and customers.</Text>
          </DeveloperSection>
        </AnimatedCard>

        <AnimatedCard delay={190}>
          <DeveloperSection colors={colors} icon="code-slash-outline" title="Skills">
            <View style={styles.chipWrap}>
              {['React Native', 'Expo', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'Git & GitHub'].map((skill) => (
                <View key={skill} style={[styles.chip, { backgroundColor: colors.primaryContainer }]}>
                  <Text style={[styles.chipText, { color: colors.onPrimaryContainer }]}>{skill}</Text>
                </View>
              ))}
            </View>
          </DeveloperSection>
        </AnimatedCard>

        <AnimatedCard delay={260}>
          <DeveloperSection colors={colors} icon="layers-outline" title="Projects">
            {['HydroLink', 'University Projects', 'Future Smart Utility Systems'].map((project, index) => (
              <View key={project} style={[styles.projectRow, index > 0 && { borderTopColor: colors.borderLight, borderTopWidth: 1 }]}>
                <Ionicons name="checkmark-circle" size={19} color={colors.secondary} />
                <Text style={[styles.projectText, { color: colors.textPrimary }]}>{project}</Text>
              </View>
            ))}
          </DeveloperSection>
        </AnimatedCard>

        <AnimatedCard delay={330}>
          <DeveloperSection colors={colors} icon="mail-outline" title="Connect">
            <View style={styles.actionRow}>
              <DeveloperActionButton colors={colors} icon="logo-github" label="View GitHub" onPress={() => openLink(developerLinks.github)} variant="filled" />
              <DeveloperActionButton colors={colors} icon="globe-outline" label="Visit Portfolio" onPress={() => openLink(developerLinks.portfolio)} />
            </View>
            <View style={[styles.emailButton, { marginTop: 10 }]}>
              <DeveloperActionButton colors={colors} icon="send-outline" label="Send Email" onPress={() => openLink(developerLinks.email)} />
            </View>
            <View style={[styles.contactDivider, { backgroundColor: colors.borderLight }]} />
            <DetailRow icon="mail-outline" label="Email" value="lensen@example.com" />
            <DetailRow icon="logo-github" label="GitHub" value="github.com/your-username" />
            <DetailRow icon="logo-linkedin" label="LinkedIn" value="linkedin.com/in/your-profile" />
            <DetailRow icon="globe-outline" label="Portfolio Website" value="your-portfolio.example.com" />
            <DetailRow icon="location-outline" label="Location" value="Ethiopia" />
          </DeveloperSection>
        </AnimatedCard>

        <AnimatedCard delay={400}>
          <View style={[styles.versionCard, DashboardShadows.soft, { backgroundColor: colors.primary, borderColor: colors.primary }]}> 
            <View>
              <Text style={[styles.versionProduct, { color: colors.textOnPrimary }]}>HydroLink</Text>
              <Text style={[styles.versionText, { color: colors.textOnPrimary }]}>Version 1.0.0</Text>
            </View>
            <Ionicons name="water-outline" size={30} color={colors.textOnPrimary} />
          </View>
        </AnimatedCard>

        <Text style={[styles.footer, { color: colors.textMuted }]}>© 2026 HydroLink{`\n`}Designed and Developed by Lensen.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { padding: 20, paddingBottom: 42 },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  backButton: { alignItems: 'center', borderRadius: 22, height: 44, justifyContent: 'center', overflow: 'hidden', width: 44 },
  topBarTitle: { fontSize: 18, fontWeight: '800' },
  topBarSpacer: { width: 44 },
  profileHeader: { alignItems: 'center', marginBottom: 26 },
  avatar: { alignItems: 'center', borderRadius: 56, borderWidth: 4, height: 112, justifyContent: 'center', width: 112 },
  name: { fontSize: 28, fontWeight: '800', marginTop: 13 },
  role: { fontSize: 15, fontWeight: '700', marginTop: 4 },
  bio: { fontSize: 14.5, lineHeight: 22 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 100, paddingHorizontal: 12, paddingVertical: 8 },
  chipText: { fontSize: 12.5, fontWeight: '700' },
  projectRow: { alignItems: 'center', flexDirection: 'row', gap: 10, paddingVertical: 12 },
  projectText: { fontSize: 14.5, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: 10 },
  emailButton: { alignSelf: 'stretch' },
  contactDivider: { height: 1, marginVertical: 17 },
  detailRow: { alignItems: 'center', flexDirection: 'row', gap: 12, marginBottom: 14 },
  detailText: { flex: 1 },
  detailLabel: { fontSize: 12, fontWeight: '600' },
  detailValue: { fontSize: 14, fontWeight: '700', marginTop: 2 },
  versionCard: { alignItems: 'center', borderRadius: 20, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, padding: 20 },
  versionProduct: { fontSize: 18, fontWeight: '800' },
  versionText: { fontSize: 13, fontWeight: '600', marginTop: 3, opacity: 0.88 },
  footer: { fontSize: 12.5, fontWeight: '600', lineHeight: 19, textAlign: 'center' },
});
