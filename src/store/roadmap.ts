import { createStore } from './create-store';

export const ROADMAP_STORAGE_KEY = 'careercompass.roadmap';

export type MilestoneStatus = 'completed' | 'current' | 'upcoming';

export type TaskType = 'course' | 'project' | 'feedback' | 'learning' | 'setup' | 'tutorial';

export interface ChecklistStep {
  id: string;
  label: string;
  done: boolean;
}

export interface TaskMeta {
  taskType?: TaskType;
  courseId?: string;
  projectBrief?: string;
  submission?: { link?: string; file?: string };
  feedbackStatus?: 'pending' | 'received' | 'skipped';
  feedbackNote?: string;
  content?: string[];
  resourceLink?: string;
  steps?: ChecklistStep[];
}

export interface MilestoneTask {
  id: string;
  title: string;
  done: boolean;
  meta?: TaskMeta;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  tasks: MilestoneTask[];
}

function makeTasks(
  titles: string[],
  done: number,
  metas: (TaskMeta | undefined)[] = [],
): MilestoneTask[] {
  return titles.map((title, index) => ({
    id: `t${index}`,
    title,
    done: index < done,
    meta: metas[index],
  }));
}

function makeMilestone(
  id: string,
  title: string,
  description: string,
  status: MilestoneStatus,
  taskTitles: string[],
  doneTasks = 0,
  metas: (TaskMeta | undefined)[] = [],
): Milestone {
  return { id, title, description, status, tasks: makeTasks(taskTitles, doneTasks, metas) };
}

/** Whether a task's pre-conditions are met so it can legitimately be marked done. */
export function isTaskReadyToComplete(task: MilestoneTask): boolean {
  const meta = task.meta;
  if (!meta?.taskType) return true;
  if (meta.taskType === 'project') {
    return Boolean(meta.submission?.link?.trim() || meta.submission?.file?.trim());
  }
  if (meta.taskType === 'feedback') {
    return meta.feedbackStatus === 'received' || meta.feedbackStatus === 'skipped';
  }
  if (meta.taskType === 'setup') {
    const steps = meta.steps;
    if (!steps || steps.length === 0) return false;
    return steps.every((s) => s.done);
  }
  return true;
}

/** Shape of the roadmap store state — a flat array of milestones. */
export type RoadmapState = Milestone[];

const initialState: RoadmapState = [
  makeMilestone(
    'm1',
    'Foundation skills',
    'Nail the fundamentals of your target field.',
    'completed',
    ['Learn core concepts', 'Set up your environment', 'Complete a guided tutorial'],
    3,
    [
      {
        taskType: 'learning',
        content: [
          'Understand the core vocabulary of your target field.',
          'Watch the intro module and take notes on key terms.',
          'Read the recommended beginner guide end-to-end.',
        ],
      },
      {
        taskType: 'setup',
        steps: [
          { id: 's1', label: 'Install the required tools and editors', done: true },
          { id: 's2', label: 'Create your account and configure it', done: true },
          { id: 's3', label: 'Verify your setup with a hello-world run', done: true },
        ],
      },
      {
        taskType: 'tutorial',
        content: [
          'Follow the guided tutorial from start to finish.',
          'Pause and re-run each step yourself to build muscle memory.',
          'Confirm you finished before marking the task complete.',
        ],
        resourceLink: 'https://opencode.ai',
      },
    ],
  ),
  makeMilestone(
    'm2',
    'Core technology',
    'Build fluency in the primary tools of the role.',
    'completed',
    ['Follow an advanced course', 'Build a small practice project', 'Read the official docs'],
    3,
    [
      {
        taskType: 'course',
        courseId: 'co1',
      },
      {
        taskType: 'project',
        projectBrief:
          'Build a small practice app that applies the core tools of the role end to end, then paste the link to the repo or live demo below.',
      },
      {
        taskType: 'learning',
        content: [
          'Skim the official docs for the primary tools of the role.',
          'Bookmark the key reference pages you will reuse.',
          'Recreate one documented example yourself.',
        ],
      },
    ],
  ),
  makeMilestone(
    'm3',
    'Applied project',
    'Produce a first real artifact to show employers.',
    'completed',
    ['Scope a project idea', 'Build version 1', 'Ship it publicly'],
    2,
    [
      {
        taskType: 'project',
        projectBrief:
          'Pick a small, realistic project idea you can finish, then add a link to your scoped plan or notes below.',
      },
      {
        taskType: 'project',
        projectBrief: 'Build the first working version of your project, then share the repo or a live demo link below.',
      },
      {
        taskType: 'project',
        projectBrief: 'Deploy or publish your project so others can see it, then share the public link below.',
      },
    ],
  ),
  makeMilestone(
    'm4',
    'Build your portfolio project',
    'Demonstrate your applied skills with a standout project.',
    'current',
    ['Complete the course module', 'Build a sample project', 'Get peer feedback'],
    0,
    [
      { taskType: 'course', courseId: 'co1' },
      {
        taskType: 'project',
        projectBrief:
          'Build a small, polished frontend app that shows off the skills from your course. Ship at least one complete feature end-to-end, then paste a link to the live demo or repository below.',
      },
      { taskType: 'feedback', feedbackStatus: 'pending' },
    ],
  ),
  makeMilestone(
    'm5',
    'Advanced techniques',
    'Level up with more complex, production-ready patterns.',
    'upcoming',
    ['Study advanced patterns', 'Refactor your portfolio', 'Write tests'],
    0,
    [
      {
        taskType: 'course',
        courseId: 'co7',
      },
      {
        taskType: 'project',
        projectBrief:
          'Refactor your portfolio project to use cleaner, more advanced patterns (custom hooks, composition, lazy loading). Add a link to the improved repo or a short note on what you changed below.',
      },
      {
        taskType: 'learning',
        content: [
          'Write unit tests for the core logic of your portfolio project.',
          'Add at least one integration or end-to-end test for a key user flow.',
          'Run the full suite and fix any failures before continuing.',
        ],
      },
    ],
  ),
  makeMilestone(
    'm6',
    'System design basics',
    'Understand how systems fit together at scale.',
    'upcoming',
    ['Learn design principles', 'Draw a sample architecture', 'Review case studies'],
    0,
    [
      {
        taskType: 'course',
        courseId: 'co4',
      },
      {
        taskType: 'project',
        projectBrief:
          'Sketch a high-level architecture for a real product (e.g. a social feed or an e-commerce store). Draw or describe the services, data stores, and key flows, then upload a link or file below.',
      },
      {
        taskType: 'learning',
        content: [
          'Read through two well-known architecture case studies.',
          'Note the trade-offs each team made and why.',
          'Summarize one lesson you can apply to your own projects.',
        ],
      },
    ],
  ),
  makeMilestone(
    'm7',
    'Interview prep',
    'Practice the questions and formats you will face.',
    'upcoming',
    ['Practice coding problems', 'Mock behavioral interview', 'Review your projects'],
    0,
    [
      {
        taskType: 'learning',
        content: [
          'Practice 3-5 coding problems focusing on arrays, strings, and hashmaps.',
          'Explain your approach out loud as you solve them.',
          'Revisit any problem you struggled with until it feels automatic.',
        ],
      },
      {
        taskType: 'feedback',
        feedbackStatus: 'pending',
      },
      {
        taskType: 'learning',
        content: [
          'Re-read your portfolio and resume as if you were the interviewer.',
          'Write a short story for each project: goal, your role, result.',
          'Practice the 30-second elevator summary of each one.',
        ],
      },
    ],
  ),
  makeMilestone(
    'm8',
    'Resume polish',
    'Make your experience and projects shine on paper.',
    'upcoming',
    ['Update your resume', 'Get feedback on it', 'Tailor it to roles'],
    0,
    [
      {
        taskType: 'project',
        projectBrief:
          'Rewrite your resume to lead with impact and metrics. Update the layout and content, then paste a link to the live or shareable version below.',
      },
      {
        taskType: 'feedback',
        feedbackStatus: 'pending',
      },
      {
        taskType: 'learning',
        content: [
          'Compare your resume against 2-3 target job descriptions.',
          'Adjust keywords and reorder skills to match the most relevant roles.',
          'Keep one master version and create targeted variants from it.',
        ],
      },
    ],
  ),
  makeMilestone(
    'm9',
    'Apply to jobs',
    'Start applying to matched, relevant roles.',
    'upcoming',
    ['Shortlist 10 roles', 'Send targeted applications', 'Track your applications'],
    0,
    [
      {
        taskType: 'learning',
        content: [
          'Save 10 roles from the Jobs tab that match your skills and goals.',
          'For each, note the top 2-3 requirements you meet.',
          'Prioritize the 3 you are most excited about.',
        ],
      },
      {
        taskType: 'project',
        projectBrief:
          'Send tailored applications to your top 3 roles. For each, add the link to the posting or your submitted application below.',
      },
      {
        taskType: 'setup',
        steps: [
          { id: 's1', label: 'Create a simple spreadsheet or tracker for applications', done: false },
          { id: 's2', label: 'Log the role, company, and application date for each', done: false },
          { id: 's3', label: 'Add follow-up reminders for ones without a response in 7 days', done: false },
        ],
      },
    ],
  ),
  makeMilestone(
    'm10',
    'Network & referrals',
    'Grow your professional network strategically.',
    'upcoming',
    ['Reach out to 5 people', 'Attend a community event', 'Ask for referrals'],
    0,
    [
      {
        taskType: 'project',
        projectBrief:
          'Write and send personalized outreach messages to 5 people in roles or companies you admire. Paste the message template or a note on responses you receive below.',
      },
      {
        taskType: 'learning',
        content: [
          'Find one local or online career or tech community event.',
          'Prepare a one-line introduction about yourself.',
          'Attend and connect with at least 2 people afterwards.',
        ],
      },
      {
        taskType: 'feedback',
        feedbackStatus: 'pending',
      },
    ],
  ),
  makeMilestone(
    'm11',
    'Final round prep',
    'Prepare for the final stage of interviews.',
    'upcoming',
    ['Do a final mock', 'Prepare questions to ask', 'Review your narrative'],
    0,
    [
      {
        taskType: 'project',
        projectBrief:
          'Run a final mock interview (with a friend, mentor, or recording). Add a link to the recording or notes on how it went below.',
      },
      {
        taskType: 'learning',
        content: [
          'Write 3 thoughtful questions to ask the interviewer about the team and role.',
          'Avoid questions that are easily answered by the job posting.',
          'Practice delivering them naturally.',
        ],
      },
      {
        taskType: 'learning',
        content: [
          'Polish your 2-minute personal narrative: who you are, what you build, and why.',
          'Practice connecting it to the specific role and company.',
          'Rehearse out loud until it sounds conversational.',
        ],
      },
    ],
  ),
  makeMilestone(
    'm12',
    'Negotiate & start',
    'Turn an offer into a successful start.',
    'upcoming',
    ['Review the offer', 'Negotiate terms', 'Plan your first 30 days'],
    0,
    [
      {
        taskType: 'learning',
        content: [
          'Read the full offer: salary, equity, benefits, and start date.',
          'Compare it against market data for your role and location.',
          'List the 2-3 things that matter most to you.',
        ],
      },
      {
        taskType: 'course',
        courseId: 'co6',
      },
      {
        taskType: 'learning',
        content: [
          'Map out your first 30 days: meet the team, learn the codebase, ship a small win.',
          'Identify the person to ask when you are stuck.',
          'Set one learning goal for your first month.',
        ],
      },
    ],
  ),
];

/** Derive each milestone's status from its tasks, keeping the first open one current. */
function recompute(milestones: Milestone[]): Milestone[] {
  const withDone = milestones.map((milestone) => {
    const allDone = milestone.tasks.length > 0 && milestone.tasks.every((task) => task.done);
    if (allDone) return { ...milestone, status: 'completed' as MilestoneStatus };
    return { ...milestone, status: 'upcoming' as MilestoneStatus };
  });
  const firstOpenIndex = withDone.findIndex((m) => m.status !== 'completed');
  if (firstOpenIndex === -1) return withDone;
  return withDone.map((milestone, i) =>
    i === firstOpenIndex ? { ...milestone, status: 'current' as MilestoneStatus } : milestone,
  );
}

const store = createStore<RoadmapState>(initialState, { persist: ROADMAP_STORAGE_KEY });

export const roadmapStore = {
  ...store,
  toggleTask(milestoneId: string, taskId: string) {
    const task = store.getSnapshot().find((m) => m.id === milestoneId)?.tasks.find((t) => t.id === taskId);
    if (!task) return;
    this.setTaskDone(milestoneId, taskId, !task.done);
  },
  setTaskDone(milestoneId: string, taskId: string, done: boolean) {
    const milestones = store.getSnapshot().map((milestone) => {
      if (milestone.id !== milestoneId) return milestone;
      const tasks = milestone.tasks.map((task) =>
        task.id === taskId ? { ...task, done } : task,
      );
      return { ...milestone, tasks };
    });
    store.setState(recompute(milestones));
  },
  updateTaskMeta(milestoneId: string, taskId: string, patch: Partial<TaskMeta>) {
    const milestones = store.getSnapshot().map((milestone) => {
      if (milestone.id !== milestoneId) return milestone;
      const tasks = milestone.tasks.map((task) =>
        task.id === taskId ? { ...task, meta: { ...(task.meta ?? {}), ...patch } } : task,
      );
      return { ...milestone, tasks };
    });
    store.setState(recompute(milestones));
  },
  markMilestoneComplete(milestoneId: string) {
    const milestones = store.getSnapshot().map((milestone) => {
      if (milestone.id !== milestoneId) return milestone;
      return { ...milestone, tasks: milestone.tasks.map((task) => ({ ...task, done: true })) };
    });
    store.setState(recompute(milestones));
  },
  /** Clear all roadmap progress back to the fresh initial state (logout). */
  reset() {
    store.setState(initialState);
  },
};

export function useMilestones(): RoadmapState {
  return store.useStore();
}

export function getRoadmapProgress(milestones: Milestone[] | unknown) {
  const list = Array.isArray(milestones) ? milestones : [];
  const total = list.length;
  const completed = list.filter((m) => m.status === 'completed').length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const nextMilestone = list.find((m) => m.status !== 'completed') ?? null;
  return { total, completed, percent, nextMilestone };
}