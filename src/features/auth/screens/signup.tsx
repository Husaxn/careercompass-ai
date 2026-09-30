import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View, ScrollView, useWindowDimensions, Text } from 'react-native';
import { Command, Check, Eye, EyeOff } from 'lucide-react';

import { authStore, userStore } from '@/store';

export default function Signup() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  
  const { signUp, isLoading } = authStore;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const canCreateAccount =
    agreedToTerms &&
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    password === confirmPassword;

  const handleCreateAccount = async () => {
    if (isLoading) return;
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const result = await signUp(email.trim(), password, {
      full_name: name.trim(),
    });

    if (result.success) {
      userStore.update({ name: name.trim(), email: email.trim() });
      if (result.data?.session) {
        router.replace('/personal-info');
      } else {
        router.replace('/otp-verify');
      }
    } else {
      Alert.alert('Sign up failed', result.error || 'Could not create account. Please try again.');
    }
  };

  const navigateToLogin = () => {
    router.replace('/login');
  };

  const features = [
    'AI-powered resume analysis',
    'Personalized skill-gap analysis',
    'Career roadmap for your target role',
    'AI interview preparation'
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, isDesktop && styles.scrollContentDesktop]}>
        
        {/* Left Side: Branding (Hidden on very small screens, or stacked) */}
        <View style={[styles.brandingSection, isDesktop ? styles.brandingDesktop : styles.brandingMobile]}>
          <View style={styles.brandingContent}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Command color="#7c3aed" size={16} />
              </View>
              <View>
                <Text style={styles.logoText}>CareerCompass <Text style={{color: '#ffffff'}}>AI</Text></Text>
                <Text style={styles.logoSubText}>AI Employability Engine</Text>
              </View>
            </View>

            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Your career. Your bridge to success.</Text>
              <Text style={styles.heroSubtitle}>
                Create your CareerCompass AI account and start building a personalized path toward your dream career.
              </Text>

              <View style={styles.featuresList}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.checkIconContainer}>
                      <Check size={14} color="#7c3aed" />
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          {/* Decorative Circle */}
          <View style={styles.decorativeCircle} />
        </View>

        {/* Right Side: Form */}
        <View style={[styles.formSection, isDesktop && styles.formDesktop]}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Create your account 🚀</Text>
            <Text style={styles.formSubtitle}>Start your journey toward becoming industry-ready.</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholder="Enter your full name"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="you@example.com"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#94a3b8"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                </Pressable>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                placeholder="Confirm your password"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <Pressable
              onPress={() => setAgreedToTerms(!agreedToTerms)}
              style={styles.termsRow}
            >
              <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && <Check size={12} color="#ffffff" strokeWidth={3} />}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>.
              </Text>
            </Pressable>

            <Pressable
              onPress={handleCreateAccount}
              disabled={!canCreateAccount || isLoading}
              style={[
                styles.submitButton,
                (!canCreateAccount || isLoading) && styles.submitButtonDisabled
              ]}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Creating account...' : 'Create My Account →'}
              </Text>
            </Pressable>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable onPress={navigateToLogin} style={styles.signInLinkContainer}>
              <Text style={styles.signInLinkText}>
                Already have an account? <Text style={styles.signInLinkTextBold}>Sign in</Text>
              </Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  scrollContentDesktop: {
    flexDirection: 'row',
  },
  brandingSection: {
    backgroundColor: '#7c3aed',
    overflow: 'hidden',
    position: 'relative',
  },
  brandingDesktop: {
    flex: 1,
    padding: 60,
  },
  brandingMobile: {
    padding: 40,
    minHeight: 400,
  },
  brandingContent: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
  },
  decorativeCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 600,
    height: 600,
    borderRadius: 300,
    backgroundColor: 'rgba(139, 92, 246, 0.4)', // Slightly lighter purple
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 80,
  },
  logoIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  logoSubText: {
    fontSize: 11,
    color: '#ddd6fe',
    marginTop: -2,
  },
  heroTextContainer: {
    maxWidth: 480,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 56,
    marginBottom: 20,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ddd6fe',
    lineHeight: 24,
    marginBottom: 40,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  formDesktop: {
    paddingHorizontal: 60,
  },
  formContainer: {
    width: '100%',
    maxWidth: 480,
  },
  formTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  formSubtitle: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 40,
  },
  fieldGroup: {
    marginBottom: 20,
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0f172a',
  },
  eyeButton: {
    padding: 14,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 30,
    marginTop: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  termsText: {
    fontSize: 13,
    color: '#64748b',
    flex: 1,
  },
  termsLink: {
    color: '#7c3aed',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    color: '#94a3b8',
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: '600',
  },
  signInLinkContainer: {
    alignItems: 'center',
  },
  signInLinkText: {
    fontSize: 14,
    color: '#64748b',
  },
  signInLinkTextBold: {
    color: '#7c3aed',
    fontWeight: '700',
  },
});