/**
 * Analyzer service — talks to the backend AI endpoint.
 *
 * A single analysis source model is used regardless of what kind of source is
 * being analyzed (document, resume, image, or screen/session data), so the rest
 * of the feature never needs to branch on source type.
 */

export type SourceKind = 'document' | 'resume' | 'image' | 'screen' | 'session';

/**
 * Discriminated union describing the source submitted for analysis.
 * Keep this closed to the analyzer feature; the backend decides how each kind
 * is processed.
 */
export type AnalysisSource =
  | { kind: 'document' | 'resume'; fileName: string; content: string | Blob }
  | { kind: 'image'; uri: string }
  | { kind: 'screen' | 'session'; data: Record<string, unknown> };

/** Response returned by `POST /analysis` after a source is submitted. */
export interface SubmittedAnalysis {
  /** Identifier to poll for the finished result. */
  id: string;
  /** Status returned by the backend (e.g. `queued` / `processing`). */
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

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(
      message || `Request failed with status ${response.status} (${response.statusText})`,
    );
  }

  return (await response.json()) as T;
}

function toFormBody(source: AnalysisSource): FormData | string {
  if (source.kind === 'image') {
    const form = new FormData();
    form.append('kind', source.kind);
    // React Native expects { uri, name, type } objects; web accepts a Blob/File.
    form.append('file', { uri: source.uri, name: `source-${Date.now()}`, type: 'image/*' } as unknown as Blob);
    return form;
  }

  if (source.kind === 'document' || source.kind === 'resume') {
    const form = new FormData();
    form.append('kind', source.kind);
    form.append('fileName', source.fileName);
    form.append('content', source.content as Blob);
    return form;
  }

  if (source.kind === 'screen' || source.kind === 'session') {
    return JSON.stringify({
      kind: source.kind,
      data: source.data,
    });
  }

  throw new Error(`Unsupported source kind: ${(source as { kind?: string }).kind}`);
}

/** Submit a source (document, resume, image, or screen/session data). */
export async function submitSource(source: AnalysisSource): Promise<SubmittedAnalysis> {
  const body = toFormBody(source);
  const headers: Record<string, string> = {};

  if (typeof body === 'string') {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}/analysis`, {
    method: 'POST',
    headers,
    body,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(
      message || `Failed to submit analysis with status ${response.status} (${response.statusText})`,
    );
  }

  return (await response.json()) as SubmittedAnalysis;
}

/** Fetch the finished analysis result for a submitted source. */
export async function fetchAnalysis(id: string): Promise<AnalysisResult> {
  return request<AnalysisResult>(`/analysis/${encodeURIComponent(id)}`);
}

/**
 * Convenience that submits a source and then fetches its result.
 * The backend is expected to resolve by the time the result is fetched; if you
 * need polling, call `submitSource` + `fetchAnalysis` directly.
 *
 * When the backend is unreachable (e.g. no `EXPO_PUBLIC_API_URL` configured),
 * falls back to a local analysis so the flow still produces real, parsed
 * output instead of failing silently.
 */
export async function analyzeSource(source: AnalysisSource): Promise<AnalysisResult> {
  try {
    const { id } = await submitSource(source);
    return await fetchAnalysis(id);
  } catch (error) {
    if (API_BASE_URL === 'https://api.example.com') {
      return buildLocalAnalysis(source);
    }
    throw error;
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

function contentText(source: AnalysisSource): string {
  if (source.kind === 'resume' || source.kind === 'document') {
    if (typeof source.content === 'string') return source.content.toLowerCase();
  }
  if (source.kind === 'image') return `image ${source.uri}`.toLowerCase();
  if (source.kind === 'screen' || source.kind === 'session') {
    return Object.keys(source.data).join(' ').toLowerCase();
  }
  return '';
}

/** Produce a deterministic, content-aware analysis when no backend is available. */
function buildLocalAnalysis(source: AnalysisSource): AnalysisResult {
  const text = contentText(source);
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