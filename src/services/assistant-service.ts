/**
 * Assistant service — talks to the AI agent/chat backend.
 *
 * `sendMessage` posts the user's message plus a snapshot of app context so the
 * assistant can give screen-aware answers. CV analysis is delegated to the
 * existing `analyzer-service` rather than reimplemented here.
 */

import {
  analyzeSource,
  type AnalysisResult,
} from '@/services/analyzer-service';

export interface AssistantContext {
  screen: string;
  assessmentCompleted: boolean;
  topCareer?: string;
  roadmapTotal: number;
  roadmapCompleted: number;
  nextMilestone?: string;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com';

interface AgentReply {
  reply?: string;
  message?: string;
  text?: string;
}

/**
 * Send a chat message to the AI agent with app context and return its reply.
 * Falls back to a context-aware local response when no backend is configured so
 * the chat still works end-to-end.
 */
export async function sendMessage(
  message: string,
  context: AssistantContext,
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
      throw new Error(`Assistant request failed with status ${response.status}`);
    }

    const data = (await response.json()) as AgentReply;
    return data.reply ?? data.message ?? data.text ?? '';
  } catch (error) {
    if (API_BASE_URL === 'https://api.example.com') {
      return buildLocalReply(message, context);
    }
    throw error;
  }
}

function buildLocalReply(message: string, context: AssistantContext): string {
  const lower = message.toLowerCase();
  const milestone = context.nextMilestone ?? 'your current milestone';
  const area =
    context.screen.includes('roadmap')
      ? `you're working toward "${milestone}". `
      : context.screen.includes('recommendations')
        ? `you're browsing recommendations. `
        : context.screen.includes('profile')
          ? `you're on your profile. `
          : context.screen.includes('community')
            ? `you're in the community. `
            : '';

  if (lower.includes('resume') || lower.includes('cv') || lower.includes('upload')) {
    return 'You can attach your CV using the paperclip button below and I will analyze your strengths, gaps, and next steps.';
  }

  if (lower.includes('milestone') || lower.includes('roadmap') || lower.includes('next')) {
    return `Based on ${area}you've completed ${context.roadmapCompleted} of ${context.roadmapTotal} milestones. ` +
      `Your next milestone is "${milestone}". ` +
      'Want me to break down what it involves or suggest how to start?';
  }

  if (lower.includes('assessment') || lower.includes('score')) {
    return context.assessmentCompleted
      ? context.topCareer
        ? `You've completed an assessment and your top match is "${context.topCareer}". ` +
          'I can suggest courses and projects to build toward that role.'
        : "You've completed an assessment — tell me the role you'd like to target and I'll help you plan."
      : "You haven't completed an assessment yet. I'd recommend it to get a tailored roadmap — say 'take assessment' and I can point you there.";
  }

  return `Happy to help! Right now ${area.trim() || "you're on the " + context.screen + ' screen.'} ` +
    'Ask me about your roadmap, career path, or attach your CV for an analysis.';
}

/** Analyze an uploaded CV and return a readable chat summary. */
export async function analyzeCv(fileName: string, content: string): Promise<{
  summary: string;
  result: AnalysisResult;
}> {
  const result = await analyzeSource({ kind: 'resume', fileName, content });
  return {
    result,
    summary: formatAnalysis(result),
  };
}

function formatAnalysis(result: AnalysisResult): string {
  const strengths = result.strengths.map((s) => `• ${s}`).join('\n');
  const gaps = result.gaps.map((g) => `• ${g}`).join('\n');
  const roadmap = result.roadmap.map((r) => `• ${r}`).join('\n');
  return (
    `I analyzed your resume. Top match: **${result.topMatch}** (${result.matchScore}/100).\n\n` +
    `Strengths:\n${strengths}\n\n` +
    `Gaps to work on:\n${gaps}\n\n` +
    `Suggested next steps:\n${roadmap}\n\n` +
    'Ask me anything to dig deeper — e.g. "what skills should I prioritize?"'
  );
}
