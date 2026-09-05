import { BackBar } from '@/components/layout/back-bar';
import { Help } from '@/features/profile/screens';

export default function HelpScreen() {
  return (
    <>
      <BackBar title="Help center" />
      <Help />
    </>
  );
}