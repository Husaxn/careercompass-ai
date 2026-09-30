import { useRouter } from 'expo-router';
import { StyleSheet, View, TextInput, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { ThemedText } from '@/components/themed-text';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Spacing } from '@/constants/theme';
import { useUser } from '@/store';
import React from 'react';

// Recharts for Web
let RadarChart: any, PolarGrid: any, PolarAngleAxis: any, PolarRadiusAxis: any, Radar: any, ResponsiveContainer: any;
if (Platform.OS === 'web') {
  try {
    const Recharts = require('recharts');
    RadarChart = Recharts.RadarChart;
    PolarGrid = Recharts.PolarGrid;
    PolarAngleAxis = Recharts.PolarAngleAxis;
    PolarRadiusAxis = Recharts.PolarRadiusAxis;
    Radar = Recharts.Radar;
    ResponsiveContainer = Recharts.ResponsiveContainer;
  } catch (e) {
    console.warn('Recharts not loaded');
  }
}

const SKILL_DATA = [
  { subject: 'Frontend', A: 80, fullMark: 100 },
  { subject: 'Backend', A: 65, fullMark: 100 },
  { subject: 'Database', A: 70, fullMark: 100 },
  { subject: 'DevOps', A: 40, fullMark: 100 },
  { subject: 'System Design', A: 50, fullMark: 100 },
];



const CircleProgress = () => {
  if (Platform.OS === 'web') {
    return (
      <View style={{ position: 'relative', width: 80, height: 80 }}>
        {/* @ts-ignore */}
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" stroke="#1F202E" strokeWidth="8" fill="none" />
            <circle 
              cx="40" cy="40" r="34" 
              stroke="#7C3AED" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray="213" 
              strokeDashoffset="170" 
              strokeLinecap="round" 
              transform="rotate(-90 40 40)" 
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} 
            />
          </svg>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>20%</ThemedText>
          </div>
        </div>
      </View>
    );
  }
  return (
    <View style={styles.circleProgressFallback}>
      <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>20%</ThemedText>
    </View>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const user = useUser();
  const firstName = user.name.split(' ')[0] || 'Aditya';
  const fullName = user.name || 'Aditya Kolekar';

  return (
    <View style={styles.layout}>
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollWrapper}>
          
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
              <TouchableOpacity>
                <SymbolView name="line.3.horizontal" size={24} tintColor="#fff" style={styles.hamburger} />
              </TouchableOpacity>
              <View>
                <ThemedText style={styles.headerTitle}>Welcome back, {firstName}! 👋</ThemedText>
                <ThemedText style={styles.headerSubtitle}>
                  Track your progress and become industry ready.
                </ThemedText>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.searchBar}>
                <SymbolView name="magnifyingglass" size={16} tintColor="#888" />
                <TextInput 
                  placeholder="Search anything..." 
                  style={styles.searchInput} 
                  placeholderTextColor="#888"
                />
                <View style={styles.shortcutBadge}>
                  <ThemedText style={styles.shortcutText}>Ctrl K</ThemedText>
                </View>
              </View>
              <TouchableOpacity style={styles.bellIcon}>
                <SymbolView name="bell" size={20} tintColor="#fff" />
                <View style={styles.notificationBadge}>
                  <ThemedText style={styles.badgeText}>3</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Top Cards Row */}
          <View style={styles.cardsRow}>
            {/* Employability Score */}
            <TouchableOpacity style={[styles.card, styles.flex2]}>
              <ThemedText style={styles.cardTitle}>Employability Score</ThemedText>
              <View style={styles.scoreRow}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
                    <ThemedText style={styles.bigScore}>20</ThemedText>
                    <ThemedText style={{ color: '#888', marginBottom: 6, fontSize: 18 }}>/100</ThemedText>
                  </View>
                  <View style={styles.statusBadge}>
                    <ThemedText style={styles.statusText}>Getting Started</ThemedText>
                  </View>
                </View>
                <CircleProgress />
              </View>
            </TouchableOpacity>

            {/* Skill Match */}
            <TouchableOpacity style={[styles.card, styles.flex1]}>
              <View style={styles.cardHeader}>
                <ThemedText style={styles.cardTitle}>Skill Match</ThemedText>
                <View style={styles.iconBadgeGreen}>
                  <SymbolView name="arrow.up.right" size={12} tintColor="#10B981" />
                </View>
              </View>
              <View style={styles.matchContent}>
                <ThemedText style={styles.bigNumber}>0</ThemedText>
                <ThemedText style={{ color: '#10B981', fontWeight: '600', fontSize: 14 }}>Low Match</ThemedText>
                <ThemedText style={{ color: '#888', fontSize: 12, marginTop: 4 }}>Based on your target role</ThemedText>
              </View>
            </TouchableOpacity>

            {/* Projects */}
            <TouchableOpacity style={[styles.card, styles.flex1]}>
              <View style={styles.cardHeader}>
                <ThemedText style={styles.cardTitle}>Projects</ThemedText>
                <View style={styles.iconBadgePurple}>
                  <SymbolView name="folder" size={12} tintColor="#7C3AED" />
                </View>
              </View>
              <View style={styles.matchContent}>
                <ThemedText style={styles.bigNumber}>0</ThemedText>
                <ThemedText style={{ color: '#888', fontWeight: '500', fontSize: 14 }}>No projects yet</ThemedText>
                <ThemedText style={{ color: '#888', fontSize: 12, marginTop: 4 }}>Projects added to profile</ThemedText>
              </View>
            </TouchableOpacity>

            {/* Profile Card */}
            <TouchableOpacity style={[styles.card, styles.flex1, styles.profileCard]}>
              <View style={styles.profileHeader}>
                <UserAvatar size={44} editable={false} />
                <View>
                  <ThemedText style={styles.profileName}>{fullName}</ThemedText>
                  <ThemedText style={styles.profileSub}>cse • 1st Year</ThemedText>
                </View>
              </View>
              <View style={styles.profileDetails}>
                <View style={styles.detailRow}><ThemedText style={styles.detailLabel}>CGPA</ThemedText><ThemedText style={styles.detailValue}>8.8</ThemedText></View>
                <View style={styles.detailRow}><ThemedText style={styles.detailLabel}>Branch</ThemedText><ThemedText style={styles.detailValue}>cse</ThemedText></View>
                <View style={styles.detailRow}><ThemedText style={styles.detailLabel}>Target Role</ThemedText><ThemedText style={styles.detailValue}>Full Stack Developer</ThemedText></View>
                <View style={styles.detailRow}><ThemedText style={styles.detailLabel}>Experience</ThemedText><ThemedText style={styles.detailValue}>Fresher</ThemedText></View>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <ThemedText style={styles.profileButtonText}>View Full Profile →</ThemedText>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Bottom Row */}
          <View style={styles.bottomRow}>
            {/* Skill Breakdown */}
            <TouchableOpacity style={[styles.card, styles.flex2]}>
              <ThemedText style={styles.cardTitle}>Skill Breakdown</ThemedText>
              <View style={styles.radarContainer}>
                {Platform.OS === 'web' && ResponsiveContainer ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                      <PolarGrid stroke="#2E3135" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                      <Radar name="Skills" dataKey="A" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <View style={styles.radarPlaceholder}>
                    <ThemedText style={{ color: '#888' }}>[Radar Chart Visualization]</ThemedText>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* Top Skill Gaps */}
            <TouchableOpacity style={[styles.card, styles.flex2]}>
              <View style={styles.sectionHeader}>
                <ThemedText style={styles.cardTitle}>Top Skill Gaps</ThemedText>
                <ThemedText style={{ color: '#7C3AED', fontSize: 14, fontWeight: '500' }}>View All</ThemedText>
              </View>
              <View style={styles.gapList}>
                <SkillGapBar skill="HTML" percentage={40} />
                <SkillGapBar skill="CSS" percentage={33} />
                <SkillGapBar skill="JavaScript" percentage={26} />
                <SkillGapBar skill="React" percentage={19} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function SkillGapBar({ skill, percentage }: { skill: string; percentage: number }) {
  // Use CSS background on web for gradient
  const fillStyle = Platform.OS === 'web' 
    ? { backgroundImage: 'linear-gradient(to right, #f97316, #ef4444)', height: '100%', borderRadius: 4 }
    : { backgroundColor: '#ef4444', height: '100%', borderRadius: 4 };

  return (
    <View style={styles.gapBarContainer}>
      <View style={styles.gapBarHeader}>
        <ThemedText style={styles.skillLabel}>{skill}</ThemedText>
        <ThemedText style={styles.skillLabel}>{percentage}%</ThemedText>
      </View>
      <View style={styles.gapBarTrack}>
        <View style={[{ width: `${percentage}%` }, fillStyle as any]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0a0a12',
  },
  sidebar: {
    width: 270,
    backgroundColor: '#0d0d16',
    borderRightWidth: 1,
    borderRightColor: '#1F202E',
    display: Platform.OS === 'web' ? 'flex' : 'none', // Hide on mobile, or handle via drawer
  },
  sidebarHeader: {
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#1F202E',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  brandTagline: {
    color: '#888',
    fontSize: 12,
  },
  sidebarNav: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: 12,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#7C3AED20',
  },
  navText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
  },
  scrollWrapper: {
    padding: Spacing.four,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.six,
    flexWrap: 'wrap',
    gap: Spacing.four,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  hamburger: {
    marginRight: Spacing.two,
    display: Platform.OS === 'web' ? 'none' : 'flex',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12121c',
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1F202E',
    width: 280,
    gap: Spacing.two,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    outlineStyle: 'none',
  } as any,
  shortcutBadge: {
    backgroundColor: '#1F202E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  shortcutText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
  },
  bellIcon: {
    position: 'relative',
    backgroundColor: '#12121c',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#1F202E',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0a0a12',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: Spacing.four,
    marginBottom: Spacing.four,
    flexWrap: 'wrap',
  },
  bottomRow: {
    flexDirection: 'row',
    gap: Spacing.four,
    flexWrap: 'wrap',
  },
  card: {
    borderRadius: 16,
    padding: Spacing.four,
    minWidth: 250,
    borderWidth: 1,
    borderColor: '#1F202E',
    backgroundColor: '#12121c',
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  bigScore: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusBadge: {
    backgroundColor: '#f59e0b20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  statusText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  circleProgressFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#7C3AED',
    borderRightColor: '#1F202E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadgeGreen: {
    backgroundColor: '#10B98120',
    padding: 6,
    borderRadius: 8,
  },
  iconBadgePurple: {
    backgroundColor: '#7C3AED20',
    padding: 6,
    borderRadius: 8,
  },
  matchContent: {
    marginTop: Spacing.three,
  },
  bigNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileCard: {
    // Note: React Native needs LinearGradient component for real gradients, 
    // but on web we can inject backgroundImage.
    ...(Platform.OS === 'web' 
      ? { backgroundImage: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }
      : { backgroundColor: '#7C3AED' }),
    borderColor: 'transparent',
  } as any,
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  profileName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileSub: {
    color: '#e9d5ff',
    fontSize: 13,
  },
  profileDetails: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    color: '#e9d5ff',
    fontSize: 13,
  },
  detailValue: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  profileButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  radarContainer: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.three,
  },
  radarPlaceholder: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F202E',
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  gapList: {
    gap: Spacing.four,
  },
  gapBarContainer: {
    gap: 8,
  },
  gapBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  gapBarTrack: {
    height: 8,
    backgroundColor: '#1F202E',
    borderRadius: 4,
    overflow: 'hidden',
  },
});