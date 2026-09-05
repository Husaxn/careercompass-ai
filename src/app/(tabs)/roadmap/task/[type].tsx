import { useLocalSearchParams } from 'expo-router';

import { BackBar } from '@/components/layout/back-bar';
import {
  CourseModuleDetail,
  PeerFeedbackDetail,
  ProjectTaskDetail,
  TaskDetail,
} from '@/features/roadmap/screens';

const titles: Record<string, string> = {
  course: 'Course module',
  project: 'Sample project',
  feedback: 'Peer feedback',
  learning: 'Core concepts',
  setup: 'Set up your environment',
  tutorial: 'Guided tutorial',
};

const GENERIC_TYPES = new Set(['learning', 'setup', 'tutorial']);

export default function TaskDetailScreen() {
  const { type, milestoneId, taskId } = useLocalSearchParams<{
    type: string;
    milestoneId: string;
    taskId: string;
  }>();

  const mid = milestoneId ?? '';
  const tid = taskId ?? '';

  return (
    <>
      <BackBar title={titles[type ?? ''] ?? 'Task'} />
      {type === 'course' && <CourseModuleDetail milestoneId={mid} taskId={tid} />}
      {type === 'project' && <ProjectTaskDetail milestoneId={mid} taskId={tid} />}
      {type === 'feedback' && <PeerFeedbackDetail milestoneId={mid} taskId={tid} />}
      {GENERIC_TYPES.has(type ?? '') && <TaskDetail milestoneId={mid} taskId={tid} />}
    </>
  );
}