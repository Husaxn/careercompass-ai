import { useRouter } from 'expo-router';

import { ResetPassword } from '@/features/auth/screens';

export default function ResetPasswordScreen() {
  const router = useRouter();

  return <ResetPassword onSave={() => router.replace('/login')} />;
}