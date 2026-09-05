import { BackBar } from '@/components/layout/back-bar';
import { Achievements } from '@/features/roadmap/screens';

export default function AchievementsScreen() {
  return (
    <>
      <BackBar title="Achievements" />
      <Achievements />
    </>
  );
}