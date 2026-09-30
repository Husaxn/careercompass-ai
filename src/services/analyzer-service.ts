import { GoogleGenerativeAI, Schema, Type } from '@google/generative-ai';

/**
 * Analyzer service — talks to Gemini API directly.
 */

export type SourceKind = 'document' | 'resume' | 'image' | 'screen' | 'session';

export type AnalysisSource =
  | { kind: 'document' | 'resume'; fileName: string; content: string | Blob }
  | { kind: 'image'; uri: string }
  | { kind: 'screen' | 'session'; data: Record<string, unknown> };

export interface SubmittedAnalysis {
  id: string;
  status: 'queued' | 'processing';
}

export interface AnalysisResult {
  id: string;
  topMatch: string;
  matchScore: number;
  strengths: string[];
  gaps: string[];
  roadmap: string[];
  createdAt: string;
}

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

export async function submitSource(source: AnalysisSource): Promise<SubmittedAnalysis> {
  // Directly returning a mock processing ID as we will await it immediately
  return { id: `gemini-${Date.now()}`, status: 'processing' };
}

export async function fetchAnalysis(id: string): Promise<AnalysisResult> {
  throw new Error("Polling is not implemented. Use analyzeSource directly.");
}

function contentText(source: AnalysisSource): string {
  if (source.kind === 'resume' || source.kind === 'document') {
    if (typeof source.content === 'string') return source.content;
  }
  if (source.kind === 'image') return `image uri: ${source.uri}`;
  if (source.kind === 'screen' || source.kind === 'session') {
    return JSON.stringify(source.data);
  }
  return '';
}

export async function analyzeSource(source: AnalysisSource): Promise<AnalysisResult> {
  if (!API_KEY) {
    console.warn("No EXPO_PUBLIC_GEMINI_API_KEY provided, falling back to local mock.");
    return buildLocalAnalysis(source);
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topMatch: { type: Type.STRING },
          matchScore: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          roadmap: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["topMatch", "matchScore", "strengths", "gaps", "roadmap"],
      }
    }});

    const text = contentText(source);
    const prompt = `Analyze the following user data/resume and provide a structured career analysis. Provide the top matched career, match score (0-100), key strengths, skill gaps, and a step-by-step roadmap.\n\nSource Data:\n${text}`;

    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    return {
      id: `analysis-${Date.now()}`,
      topMatch: data.topMatch,
      matchScore: data.matchScore,
      strengths: data.strengths,
      gaps: data.gaps,
      roadmap: data.roadmap,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return buildLocalAnalysis(source);
  }
}

const KEYWORD_MAP: [string, string, string[]][] = [
  ['react', 'Frontend Engineer', ['React', 'TypeScript', 'Component design']],
  ['javascript', 'Frontend Engineer', ['JavaScript', 'State management', 'Web APIs']],
  ['typescript', 'Frontend Engineer', ['TypeScript', 'Strong typing', 'Tooling']],
  ['sql', 'Data Analyst', ['SQL', 'Data querying', 'Reporting']],
  ['python', 'Data Analyst', ['Python', 'Data analysis', 'Automation']],
  ['data', 'Data Analyst', ['Analytics', 'Dashboards', 'Statistics']],
  ['product', 'Product Manager', ['Product thinking', 'Roadmapping', 'Stakeholder management']],
  ['design', 'Product Designer', ['Visual design', 'UX', 'Prototyping']],
  ['frontend', 'Frontend Engineer', ['Frontend architecture', 'Accessibility', 'Performance']],
  ['node', 'Full-Stack Developer', ['Node', 'APIs', 'Backend basics']],
];

function buildLocalAnalysis(source: AnalysisSource): AnalysisResult {
  const text = contentText(source).toLowerCase();
  const hits = KEYWORD_MAP.filter(([keyword]) => text.includes(keyword));

  const [topMatch, baseStrengths] = hits[0] ?? ['Frontend Engineer', ['Communication', 'Problem solving', 'Attention to detail']];
  const strengths = [...new Set(hits.flatMap((h) => h[2]).concat(baseStrengths))].slice(0, 5);
  const matchScore = Math.min(95, Math.max(55, 55 + hits.length * 8 + (text.length % 10)));

  const gaps = ['Cloud deployment experience', 'System design depth', 'Public speaking / presenting', 'Leadership exposure'];

  return {
    id: `local-${Date.now()}`,
    topMatch,
    matchScore,
    strengths,
    gaps,
    roadmap: [
      'Complete a targeted skills course',
      'Build a portfolio project',
      'Prepare for interviews',
      'Apply to matched roles',
    ],
    createdAt: new Date().toISOString(),
  };
}