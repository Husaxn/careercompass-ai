import { useRouter } from 'expo-router';

import { ForgotPassword } from '@/features/auth/screens';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <ForgotPassword
      onSend={() => router.replace('/reset-password')}
      onBack={() => router.replace('/login')}
    />
  );
}