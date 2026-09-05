/**
 * Recommendation service — returns real career, course, and job matches.
 * Simulates a network fetch (with a small delay) so screens can show a
 * loading state, then resolve to a catalog of recommendations.
 */

export interface CareerMatch {
  id: string;
  title: string;
  score: number;
  salary: string;
  outlook: string;
  summary: string;
  skills: string[];
}

export interface CourseRecommendation {
  id: string;
  title: string;
  level: string;
  provider: string;
  duration: string;
  description: string;
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
}

const careers: CareerMatch[] = [
  {
    id: 'c1',
    title: 'Senior Frontend Engineer',
    score: 87,
    salary: '$140k median',
    outlook: 'Growing demand',
    summary: 'Build responsive, accessible web and mobile experiences with a modern TypeScript stack.',
    skills: ['React', 'TypeScript', 'CSS', 'Testing'],
  },
  {
    id: 'c2',
    title: 'Data Analyst',
    score: 72,
    salary: '$95k median',
    outlook: 'Steady demand',
    summary: 'Turn raw data into clear insights that guide product and business decisions.',
    skills: ['SQL', 'Python', 'Data visualization', 'Statistics'],
  },
  {
    id: 'c3',
    title: 'Product Manager',
    score: 64,
    salary: '$130k median',
    outlook: 'Growing demand',
    summary: 'Define what to build and why, working across engineering, design, and business.',
    skills: ['Research', 'Roadmapping', 'Communication', 'Analytics'],
  },
  {
    id: 'c4',
    title: 'Full-Stack Developer',
    score: 69,
    salary: '$125k median',
    outlook: 'Growing demand',
    summary: 'Own features end to end across both frontend and backend systems.',
    skills: ['React', 'Node', 'Databases', 'APIs'],
  },
  {
    id: 'c5',
    title: 'UX/UI Designer',
    score: 74,
    salary: '$105k median',
    outlook: 'Growing demand',
    summary: 'Design clear, usable, and delightful interfaces for web and mobile products.',
    skills: ['Figma', 'Prototyping', 'User research', 'Design systems'],
  },
  {
    id: 'c6',
    title: 'DevOps Engineer',
    score: 66,
    salary: '$135k median',
    outlook: 'High demand',
    summary: 'Automate deployment, monitoring, and infrastructure so teams ship faster and safer.',
    skills: ['AWS', 'CI/CD', 'Docker', 'Kubernetes'],
  },
  {
    id: 'c7',
    title: 'Machine Learning Engineer',
    score: 61,
    salary: '$150k median',
    outlook: 'Rapid growth',
    summary: 'Build and ship models that turn data into predictions and product features.',
    skills: ['Python', 'PyTorch', 'MLOps', 'Statistics'],
  },
  {
    id: 'c8',
    title: 'Backend Engineer',
    score: 70,
    salary: '$130k median',
    outlook: 'Steady demand',
    summary: 'Design reliable APIs and data layers that power fast, scalable applications.',
    skills: ['Node', 'Python', 'SQL', 'System design'],
  },
];

const courses: CourseRecommendation[] = [
  {
    id: 'co1',
    title: 'React Native Deep Dive',
    level: 'Intermediate',
    provider: 'CareerCompass Academy',
    duration: '6 weeks',
    description: 'Build and ship cross-platform mobile apps with React Native and Expo.',
  },
  {
    id: 'co2',
    title: 'Data Visualization with Python',
    level: 'Beginner',
    provider: 'CareerCompass Academy',
    duration: '4 weeks',
    description: 'Learn to turn datasets into clear, compelling charts with Python.',
  },
  {
    id: 'co3',
    title: 'Product Strategy 101',
    level: 'Advanced',
    provider: 'CareerCompass Academy',
    duration: '5 weeks',
    description: 'Master positioning, roadmapping, and go-to-market fundamentals.',
  },
  {
    id: 'co4',
    title: 'System Design Fundamentals',
    level: 'Intermediate',
    provider: 'CareerCompass Academy',
    duration: '8 weeks',
    description: 'Design scalable systems and prepare for senior-level interviews.',
  },
  {
    id: 'co5',
    title: 'SQL for Analytics',
    level: 'Beginner',
    provider: 'CareerCompass Academy',
    duration: '3 weeks',
    description: 'Query real-world datasets and build confidence with everyday SQL.',
  },
  {
    id: 'co6',
    title: 'Career Negotiation Skills',
    level: 'Beginner',
    provider: 'CareerCompass Academy',
    duration: '2 weeks',
    description: 'Negotiate offers and raise with confidence and evidence.',
  },
  {
    id: 'co7',
    title: 'Advanced React Patterns',
    level: 'Advanced',
    provider: 'CareerCompass Academy',
    duration: '5 weeks',
    description: 'Master hooks, context, performance tuning, and composable component patterns.',
  },
  {
    id: 'co8',
    title: 'Career Networking & Personal Branding',
    level: 'Beginner',
    provider: 'CareerCompass Academy',
    duration: '3 weeks',
    description: 'Build a professional network and an online presence that attracts opportunities.',
  },
];

const jobs: JobMatch[] = [
  {
    id: 'j1',
    title: 'Frontend Engineer',
    company: 'Acme Inc',
    location: 'Remote',
    salary: '$130k',
    description: 'Build responsive, accessible web and mobile experiences with a modern TypeScript stack.',
    requirements: ['3+ years of frontend experience', 'React expertise', 'Strong communication'],
  },
  {
    id: 'j2',
    title: 'Data Analyst',
    company: 'Northwind',
    location: 'Hybrid',
    salary: '$95k',
    description: 'Analyze user behavior and market data to inform product decisions.',
    requirements: ['SQL proficiency', 'Dashboard experience', 'Strong storytelling'],
  },
  {
    id: 'j3',
    title: 'Product Designer',
    company: 'Globex',
    location: 'Remote',
    salary: '$120k',
    description: 'Design end-to-end product flows with a focus on clarity and usability.',
    requirements: ['Figma expertise', 'Design system experience', 'User research'],
  },
  {
    id: 'j4',
    title: 'Full-Stack Developer',
    company: 'Initech',
    location: 'Remote',
    salary: '$125k',
    description: 'Own features across the stack in a fast-moving product team.',
    requirements: ['React + Node experience', 'API design', 'Database knowledge'],
  },
  {
    id: 'j5',
    title: 'Product Manager',
    company: 'Umbrella',
    location: 'On-site',
    salary: '$135k',
    description: 'Drive a high-impact roadmap from discovery to delivery.',
    requirements: ['Roadmap ownership', 'Data-informed decisions', 'Cross-team collaboration'],
  },
  {
    id: 'j6',
    title: 'Backend Engineer',
    company: 'Acme Inc',
    location: 'Remote',
    salary: '$128k',
    description: 'Design and scale APIs and data services for a growing product platform.',
    requirements: ['Node or Python', 'PostgreSQL', 'API design', 'System design'],
  },
  {
    id: 'j7',
    title: 'Data Engineer',
    company: 'Northwind',
    location: 'Hybrid',
    salary: '$120k',
    description: 'Build robust data pipelines that turn raw data into reliable analytics.',
    requirements: ['Python', 'Airflow', 'SQL', 'Data warehousing'],
  },
  {
    id: 'j8',
    title: 'Product Designer',
    company: 'Globex',
    location: 'Remote',
    salary: '$118k',
    description: 'Design end-to-end product flows with a focus on clarity and usability.',
    requirements: ['Figma expertise', 'Design system experience', 'User research'],
  },
  {
    id: 'j9',
    title: 'DevOps Engineer',
    company: 'Initech',
    location: 'Remote',
    salary: '$132k',
    description: 'Automate infrastructure, CI/CD, and observability for a fast-moving team.',
    requirements: ['AWS', 'Terraform', 'CI/CD', 'Kubernetes'],
  },
  {
    id: 'j10',
    title: 'Junior Frontend Developer',
    company: 'Startup Co',
    location: 'Hybrid',
    salary: '$95k',
    description: 'Join a small team building a React-based web app, with mentorship built in.',
    requirements: ['React', 'TypeScript', 'Willingness to learn', 'Portfolio'],
  },
];

/** Simulated latency so loading states are visible and realistic. */
function delay(ms = 600) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function fetchCareerRecommendations(): Promise<CareerMatch[]> {
  await delay();
  return careers;
}

export async function fetchCareerById(id: string): Promise<CareerMatch | null> {
  await delay(200);
  return careers.find((career) => career.id === id) ?? null;
}

export async function fetchCourseRecommendations(): Promise<CourseRecommendation[]> {
  await delay();
  return courses;
}

export async function fetchCourseById(id: string): Promise<CourseRecommendation | null> {
  await delay(200);
  return courses.find((course) => course.id === id) ?? null;
}

export async function fetchJobRecommendations(): Promise<JobMatch[]> {
  await delay();
  return jobs;
}

export async function fetchJobById(id: string): Promise<JobMatch | null> {
  await delay(200);
  return jobs.find((job) => job.id === id) ?? null;
}