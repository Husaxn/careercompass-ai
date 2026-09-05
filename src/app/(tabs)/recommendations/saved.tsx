import { BackBar } from '@/components/layout/back-bar';
import { Saved } from '@/features/recommendations/screens';

export default function SavedScreen() {
  return (
    <>
      <BackBar title="Saved" />
      <Saved />
    </>
  );
}