import { BackBar } from '@/components/layout/back-bar';
import { Resume } from '@/features/profile/screens';

export default function ResumeScreen() {
  return (
    <>
      <BackBar title="My resume" />
      <Resume />
    </>
  );
}