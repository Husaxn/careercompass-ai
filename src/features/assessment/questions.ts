export type Dimension = 'engineering' | 'data' | 'product' | 'design';

export interface AssessmentQuestion {
  id: string;
  text: string;
  dimension: Dimension;
}

export interface CareerFit {
  title: string;
  score: number;
}

const OPTIONS = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'] as const;
export const OPTION_SCORES = [0, 1, 2, 3, 4];

export const QUESTIONS: AssessmentQuestion[] = [
  { id: 'q1', text: 'I enjoy solving complex problems step by step.', dimension: 'engineering' },
  { id: 'q2', text: 'I like turning messy information into clear insights.', dimension: 'data' },
  { id: 'q3', text: 'I enjoy deciding what to build and why.', dimension: 'product' },
  { id: 'q4', text: 'I care about how things look and feel to use.', dimension: 'design' },
  { id: 'q5', text: 'I like building tools that other people rely on.', dimension: 'engineering' },
  { id: 'q6', text: 'I would rather work with numbers than with people.', dimension: 'data' },
  { id: 'q7', text: 'I enjoy influencing a roadmap with other teams.', dimension: 'product' },
  { id: 'q8', text: 'I notice small details others miss.', dimension: 'design' },
  { id: 'q9', text: 'I enjoy writing logic that makes software work.', dimension: 'engineering' },
  { id: 'q10', text: 'I like finding patterns in large datasets.', dimension: 'data' },
];

export const DIMENSION_LABEL: Record<Dimension, string> = {
  engineering: 'Engineering',
  data: 'Data & Analytics',
  product: 'Product',
  design: 'Design',
};

export const OPTION_LABELS = [...OPTIONS];

const DIMENSION_CAREERS: Record<Dimension, { title: string; score: number }[]> = {
  engineering: [
    { title: 'Software Engineer', score: 100 },
    { title: 'Full-Stack Developer', score: 88 },
    { title: 'Frontend Engineer', score: 82 },
  ],
  data: [
    { title: 'Data Analyst', score: 96 },
    { title: 'Data Scientist', score: 84 },
    { title: 'Business Analyst', score: 72 },
  ],
  product: [
    { title: 'Product Manager', score: 94 },
    { title: 'Program Manager', score: 78 },
    { title: 'Product Owner', score: 74 },
  ],
  design: [
    { title: 'Product Designer', score: 92 },
    { title: 'UX Researcher', score: 80 },
    { title: 'UI Designer', score: 76 },
  ],
};

/**
 * Compute career fit from the per-question answers (an array of option
 * indices aligned with QUESTIONS). Returns the top careers sorted by score
 * and the per-dimension scores for display.
 */
export function computeAssessment(answers: number[]) {
  const dimensionTotal: Record<Dimension, number> = { engineering: 0, data: 0, product: 0, design: 0 };
  const dimensionCount: Record<Dimension, number> = { engineering: 0, data: 0, product: 0, design: 0 };

  QUESTIONS.forEach((question, index) => {
    const score = answers[index] ?? 2;
    dimensionTotal[question.dimension] += score;
    dimensionCount[question.dimension] += 1;
  });

  const dimensionPct = Object.keys(dimensionTotal).map((key) => {
    const dim = key as Dimension;
    const count = dimensionCount[dim];
    const raw = count === 0 ? 0 : (dimensionTotal[dim] / (count * 4)) * 100;
    return { dimension: dim, percent: Math.round(raw) };
  });

  const topCareers: CareerFit[] = dimensionPct
    .flatMap(({ dimension }) => {
      const entries = DIMENSION_CAREERS[dimension];
      const weight = dimensionPct.find((d) => d.dimension === dimension)!.percent / 100;
      return entries.map((career) => ({ ...career, score: Math.round(career.score * weight) }));
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const scores: Record<string, number> = {};
  dimensionPct.forEach(({ dimension, percent }) => {
    scores[DIMENSION_LABEL[dimension]] = percent;
  });

  return { topCareers, scores, dimensionPct };
}