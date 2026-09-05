import { useRouter } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import { EditProfile } from '@/features/profile/screens';

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <>
      <BackBar title="Edit profile" />
      <EditProfile onSave={() => router.replace('/profile')} />
    </>
  );
}