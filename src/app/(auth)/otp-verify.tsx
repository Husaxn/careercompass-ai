import { useRouter } from 'expo-router';

import { OTPVerify } from '@/features/auth/screens';
import { useAuth } from '@/store';

export default function OTPVerifyScreen() {
  const router = useRouter();
  const { isOnboarded } = useAuth();

  return (
    <OTPVerify
      onVerify={() => {
        router.replace(isOnboarded ? '/home' : '/personal-info');
      }}
      onResend={() => {
        // No-op resend (mock): would re-issue a code from the backend.
      }}
      onBack={() => router.replace('/login')}
    />
  );
}