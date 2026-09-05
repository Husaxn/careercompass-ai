/**
 * Single source of truth for app state.
 *
 * Domain stores (user, settings, roadmap, assessment, saved, community,
 * analysis) all follow the same `useSyncExternalStore` pattern, so the
 * Dashboard, tabs, and detail screens read and update the same values and
 * stay in sync without duplicated or stale hardcoded data.
 */

export * from './create-store';
export { clearUserData } from './persistence';

export { authStore, useAuth, type AuthState } from './auth';
export { userStore, useUser, type UserProfile } from './user';
export { settingsStore, useSettings, type Settings, type ThemePreference } from './settings';
export {
  roadmapStore,
  useMilestones,
  getRoadmapProgress,
  isTaskReadyToComplete,
  type ChecklistStep,
  type Milestone,
  type MilestoneStatus,
  type MilestoneTask,
  type RoadmapState,
  type TaskMeta,
  type TaskType,
} from './roadmap';
export {
  assessmentStore,
  useAssessmentResults,
  useLatestAssessmentScores,
  type AssessmentResult,
} from './assessment';
export {
  savedStore,
  useSavedItems,
  useIsSaved,
  type SavedItem,
  type SavedKind,
} from './saved';
export {
  communityStore,
  usePosts,
  useMentors,
  useChat,
  useMentorRequested,
  type Post,
  type Mentor,
  type Comment,
  type ChatMessage,
} from './community';
export {
  analysisStore,
  useAnalysisHistory,
  type AnalysisHistoryEntry,
} from './analysis';
export {
  assistantStore,
  useAssistant,
  type AssistantMessage,
  type AssistantState,
  type ChatRole,
} from './assistant';