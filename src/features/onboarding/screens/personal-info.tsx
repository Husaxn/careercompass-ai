import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, ScrollView, Platform } from 'react-native';
import { ChevronDown, Sparkles, Plus } from 'lucide-react';

import { ScreenContainer } from '@/components/layout/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { userStore } from '@/store';

type PersonalInfoProps = {
  onContinue?: () => void;
  onBack?: () => void;
};

const SKILLS = [
  'C', 'C++', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript', 
  'React', 'SQL', 'DBMS', 'DSA', 'Git/GitHub', 'Spring Boot', 'Machine Learning'
];

export default function PersonalInfo({ onContinue, onBack }: PersonalInfoProps) {
  const theme = useTheme();

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Plus color="#fff" size={20} />
          </View>
          <View>
            <ThemedText type="defaultSemiBold" style={styles.logoText}>SkillBridge AI</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.logoSubtext}>A Employability Engine</ThemedText>
          </View>
        </View>
        <ThemedText type="small" themeColor="textSecondary" style={styles.stepText}>
          Profile Setup • Step 1 of 1
        </ThemedText>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <View style={styles.sparkleContainer}>
            <Sparkles color="#FF9900" size={24} />
          </View>
          <ThemedText type="subtitle" style={styles.titleText}>Let's build your career profile</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.subtitleText}>
            Tell us about yourself so SkillBridge AI can personalize your experience.
          </ThemedText>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={styles.progressSegment} />
          <View style={styles.progressSegment} />
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Basic Information</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">This information will be used to personalize your dashboard.</ThemedText>
          </View>

          <View style={styles.formGrid}>
            <View style={styles.formGroup}>
              <ThemedText type="smallBold" style={styles.label}>CURRENT EDUCATION</ThemedText>
              <View style={styles.dropdown}>
                <ThemedText themeColor="textSecondary">Select education</ThemedText>
                <ChevronDown color={theme.textSecondary} size={20} />
              </View>
            </View>
            <View style={styles.formGroup}>
              <ThemedText type="smallBold" style={styles.label}>BRANCH / SPECIALIZATION</ThemedText>
              <TextInput style={styles.input} placeholder="e.g. Computer Science" placeholderTextColor={theme.textSecondary} />
            </View>

            <View style={styles.formGroup}>
              <ThemedText type="smallBold" style={styles.label}>CURRENT YEAR</ThemedText>
              <View style={styles.dropdown}>
                <ThemedText themeColor="textSecondary">Select year</ThemedText>
                <ChevronDown color={theme.textSecondary} size={20} />
              </View>
            </View>
            <View style={styles.formGroup}>
              <ThemedText type="smallBold" style={styles.label}>CGPA / PERCENTAGE</ThemedText>
              <TextInput style={styles.input} placeholder="e.g. 8.23" placeholderTextColor={theme.textSecondary} keyboardType="numeric" />
            </View>

            <View style={styles.formGroup}>
              <ThemedText type="smallBold" style={styles.label}>EXPERIENCE</ThemedText>
              <View style={styles.dropdown}>
                <ThemedText themeColor="textSecondary">Fresher</ThemedText>
                <ChevronDown color={theme.textSecondary} size={20} />
              </View>
            </View>
            <View style={styles.formGroup}>
              <ThemedText type="smallBold" style={styles.label}>TARGET ROLE</ThemedText>
              <View style={styles.dropdown}>
                <ThemedText themeColor="textSecondary">Choose your target role</ThemedText>
                <ChevronDown color={theme.textSecondary} size={20} />
              </View>
            </View>
          </View>

          <View style={styles.skillsSection}>
            <ThemedText type="smallBold" style={styles.label}>YOUR CURRENT SKILLS</ThemedText>
            <View style={styles.skillsContainer}>
              {SKILLS.map((skill) => (
                <View key={skill} style={styles.skillPill}>
                  <ThemedText type="small" themeColor="textSecondary">{skill}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.goalSection}>
            <ThemedText type="smallBold" style={styles.label}>CAREER GOAL</ThemedText>
            <TextInput 
              style={styles.textArea} 
              placeholder="Example: I want to become a software developer and get placed in a product-based company." 
              placeholderTextColor={theme.textSecondary}
              multiline 
              numberOfLines={4}
            />
          </View>

          <View style={styles.footer}>
            <Pressable onPress={onBack} style={styles.backButton}>
              <ThemedText type="defaultSemiBold" themeColor="textSecondary">← Back</ThemedText>
            </Pressable>
            <Pressable onPress={onContinue} style={styles.completeButton}>
              <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>Complete Profile →</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  scrollContent: {
    paddingBottom: Spacing.eight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.four,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#Eef0f5',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  logoIcon: {
    backgroundColor: '#6C5CE7',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  logoSubtext: {
    fontSize: 10,
    marginTop: -2,
  },
  stepText: {
    fontSize: 12,
  },
  mainContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    marginTop: Spacing.eight,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  sparkleContainer: {
    backgroundColor: '#FFF0E5',
    padding: Spacing.three,
    borderRadius: 16,
    marginBottom: Spacing.four,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: Spacing.two,
  },
  subtitleText: {
    fontSize: 14,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.eight,
    width: 300,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressActive: {
    backgroundColor: '#6C5CE7',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 800,
    borderRadius: 24,
    padding: Spacing.six,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: Spacing.six,
  },
  cardTitle: {
    fontSize: 18,
    color: '#1E1E1E',
    marginBottom: 4,
  },
  formGrid: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: Spacing.four,
    marginBottom: Spacing.six,
  },
  formGroup: {
    flex: Platform.OS === 'web' ? 1 : undefined,
    minWidth: Platform.OS === 'web' ? '45%' : '100%',
    gap: Spacing.two,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.5,
    color: '#4B5563',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    height: 44,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    height: 44,
    fontSize: 14,
    color: '#1E1E1E',
  },
  skillsSection: {
    marginBottom: Spacing.six,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  skillPill: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  goalSection: {
    marginBottom: Spacing.eight,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: Spacing.three,
    fontSize: 14,
    color: '#1E1E1E',
    minHeight: 100,
    textAlignVertical: 'top',
    marginTop: Spacing.two,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  backButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  completeButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});