import { BackBar } from '@/components/layout/back-bar';
import { Account } from '@/features/profile/screens';

export default function AccountScreen() {
  return (
    <>
      <BackBar title="Account" />
      <Account />
    </>
  );
}