import { BackBar } from '@/components/layout/back-bar';
import { SkillTracker } from '@/features/roadmap/screens';

export default function SkillTrackerScreen() {
  return (
    <>
      <BackBar title="Skill tracker" />
      <SkillTracker />
    </>
  );
}