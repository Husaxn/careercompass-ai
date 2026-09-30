import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Command } from 'lucide-react';

export default function LandingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToSignup = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Command color="#fff" size={20} />
            </View>
            <View>
              <Text style={styles.logoText}>CareerCompass <Text style={styles.logoAiText}>AI</Text></Text>
              <Text style={styles.logoSubText}>AI employability Engine</Text>
            </View>
          </View>
          
          {isDesktop && (
            <View style={styles.navLinks}>
              <Text style={styles.navLink}>Features</Text>
              <Text style={styles.navLink}>How It Works</Text>
              <Text style={styles.navLink}>About</Text>
            </View>
          )}

          <View style={styles.authButtons}>
            <Pressable onPress={navigateToLogin} style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
            <Pressable onPress={navigateToSignup} style={styles.getStartedButton}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </Pressable>
          </View>
        </View>

        {/* Hero Section */}
        <View style={[styles.heroSection, isDesktop ? styles.heroDesktop : styles.heroMobile]}>
          <View style={[styles.heroContent, isDesktop && styles.heroContentDesktop]}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>AI-POWERED CAREER INTELLIGENCE</Text>
            </View>

            <Text style={styles.title}>
              Build the career{'\n'}
              <Text style={styles.titleHighlight}>you're capable of.</Text>
            </Text>

            <Text style={styles.description}>
              CareerCompass AI analyzes your skills, resume, projects and goals to create a personalized path from <Text style={styles.descriptionBold}>student → industry-ready professional.</Text>
            </Text>

            <View style={styles.ctaContainer}>
              <Pressable onPress={navigateToSignup} style={styles.primaryCta}>
                <Text style={styles.primaryCtaText}>🚀 Start Your Career Journey</Text>
              </Pressable>
              <Pressable style={styles.secondaryCta}>
                <Text style={styles.secondaryCtaText}>Explore Features →</Text>
              </Pressable>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>10+</Text>
                <Text style={styles.statLabel}>AI Career Tools</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>360°</Text>
                <Text style={styles.statLabel}>Career Analysis</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>AI Guidance</Text>
              </View>
            </View>
          </View>

          {/* Hero Image Mock */}
          <View style={[styles.heroImageContainer, isDesktop && styles.heroImageContainerDesktop]}>
            <View style={styles.mockWindowWrapper}>
              <View style={styles.mockWindow}>
                {/* Fake Window Header */}
                <View style={styles.mockWindowHeader}>
                  <View style={[styles.mockDot, { backgroundColor: '#e2e8f0' }]} />
                  <View style={[styles.mockDot, { backgroundColor: '#e2e8f0' }]} />
                  <View style={[styles.mockDot, { backgroundColor: '#e2e8f0' }]} />
                </View>
                
                {/* Fake App UI */}
                <View style={styles.mockAppLayout}>
                  {/* Sidebar */}
                  <View style={styles.mockSidebar}>
                    <View style={[styles.mockSidebarItem, { backgroundColor: '#7c3aed' }]} />
                    <View style={styles.mockSidebarItem} />
                    <View style={styles.mockSidebarItem} />
                    <View style={styles.mockSidebarItem} />
                    <View style={styles.mockSidebarItem} />
                    <View style={styles.mockSidebarItem} />
                  </View>
                  
                  {/* Main Content */}
                  <View style={styles.mockMain}>
                    {/* Top Cards */}
                    <View style={styles.mockCardsRow}>
                      <View style={styles.mockCard}>
                        <View style={styles.mockCardBar} />
                        <Text style={styles.mockCardNumber}>72%</Text>
                      </View>
                      <View style={styles.mockCard}>
                        <View style={styles.mockCardBar} />
                        <Text style={styles.mockCardNumber}>68%</Text>
                      </View>
                      <View style={styles.mockCard}>
                        <View style={styles.mockCardBar} />
                        <Text style={styles.mockCardNumber}>4</Text>
                      </View>
                    </View>

                    {/* Bottom Cards */}
                    <View style={styles.mockLargeCardsRow}>
                      <View style={[styles.mockCard, { flex: 1.2, height: 200, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', padding: 20, paddingTop: 40 }]}>
                        <Text style={{position: 'absolute', top: 15, left: 15, fontSize: 14, color: '#334155'}}>Skill Progress</Text>
                        {/* Fake Chart */}
                        <View style={{flexDirection: 'row', alignItems: 'flex-end', height: 120, gap: 8, width: '100%'}}>
                          <View style={[styles.mockBar, { height: '30%' }]} />
                          <View style={[styles.mockBar, { height: '50%' }]} />
                          <View style={[styles.mockBar, { height: '40%' }]} />
                          <View style={[styles.mockBar, { height: '70%' }]} />
                          <View style={[styles.mockBar, { height: '60%' }]} />
                          <View style={[styles.mockBar, { height: '100%' }]} />
                        </View>
                      </View>
                      
                      <View style={[styles.mockCard, { flex: 1, height: 200, padding: 20 }]}>
                        <Text style={{fontSize: 14, color: '#334155', marginBottom: 15}}>Career Readiness</Text>
                        <Text style={{fontSize: 42, fontWeight: 'bold', color: '#7c3aed', marginBottom: 20}}>72%</Text>
                        <View style={{height: 10, backgroundColor: '#f1f5f9', borderRadius: 5, width: '100%'}}>
                          <View style={{height: '100%', width: '72%', backgroundColor: '#7c3aed', borderRadius: 5}} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FF', // Light purple-white tint
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#7c3aed',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  logoAiText: {
    color: '#7c3aed',
  },
  logoSubText: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: -2,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 40,
  },
  navLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  signInButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  signInText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7c3aed',
  },
  getStartedButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  getStartedText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  heroSection: {
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 80,
  },
  heroDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1280,
    alignSelf: 'center',
    width: '100%',
  },
  heroMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    maxWidth: 560,
  },
  heroContentDesktop: {
    paddingRight: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e8ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7c3aed',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 64,
    fontWeight: '900',
    color: '#1e293b',
    lineHeight: 72,
    marginBottom: 24,
    letterSpacing: -1,
  },
  titleHighlight: {
    color: '#7c3aed',
  },
  description: {
    fontSize: 18,
    color: '#64748b',
    lineHeight: 28,
    marginBottom: 40,
  },
  descriptionBold: {
    fontWeight: '700',
    color: '#475569',
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 56,
    flexWrap: 'wrap',
  },
  primaryCta: {
    backgroundColor: '#7c3aed',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  primaryCtaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryCta: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryCtaText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 48,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  heroImageContainer: {
    flex: 1.2,
    marginTop: 60,
  },
  heroImageContainerDesktop: {
    marginTop: 0,
    minWidth: 500,
    alignItems: 'flex-end',
  },
  mockWindowWrapper: {
    transform: [{ rotate: '2deg' }],
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 10, // Outer border effect
    paddingBottom: 14,
    paddingRight: 14,
    shadowColor: '#a78bfa',
    shadowOffset: { width: -20, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
  },
  mockWindow: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    width: 600,
  },
  mockWindowHeader: {
    height: 48,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  mockDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  mockAppLayout: {
    flexDirection: 'row',
    height: 420,
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  mockSidebar: {
    width: 80,
    backgroundColor: '#111827',
    paddingVertical: 32,
    alignItems: 'center',
    gap: 20,
  },
  mockSidebarItem: {
    width: 48,
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
  },
  mockMain: {
    flex: 1,
    padding: 32,
    gap: 24,
  },
  mockCardsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  mockCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  mockCardBar: {
    width: 48,
    height: 6,
    backgroundColor: '#cbd5e1',
    borderRadius: 3,
    marginBottom: 24,
  },
  mockCardNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  mockLargeCardsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  mockBar: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    borderRadius: 6,
  },
});
