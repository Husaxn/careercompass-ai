import { useRouter } from 'expo-router';

import { ProfileOverview } from '@/features/profile/screens';
import { authStore, clearUserData } from '@/store';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user-specific in-memory + persisted data so nothing leaks across
    // accounts, then clear the auth session and reset the navigation stack to
    // the Login screen so back cannot return into the authenticated app.
    clearUserData().finally(() => {
      authStore.signOut();
      router.replace('/login');
    });
  };

  return (
    <ProfileOverview
      onOpen={(id) => {
        if (id === 'edit') router.push('/profile/edit');
        else if (id === 'resume') router.push('/profile/resume');
        else if (id === 'settings') router.push('/profile/settings');
        else if (id === 'account') router.push('/profile/account');
        else if (id === 'help') router.push('/profile/help');
      }}
      onLogout={handleLogout}
    />
  );
}