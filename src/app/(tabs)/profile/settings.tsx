import { BackBar } from '@/components/layout/back-bar';
import { Settings } from '@/features/profile/screens';

export default function SettingsScreen() {
  return (
    <>
      <BackBar title="Settings" />
      <Settings />
    </>
  );
}