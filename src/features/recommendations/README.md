# recommendations

AI-generated career suggestions and matches derived from the user's profile,
assessments, and goals (not from a user-uploaded source).

## Screens

Located in `screens/`. Add one file per screen here:

- `index.tsx` — list of recommended careers / paths
- `detail.tsx` — deep-dive on a single recommendation
- `compare.tsx` — side-by-side comparison of options

## What belongs here

- Career path / job recommendations
- Fit scores and match explanations
- Save / shortlist interactions

## What does NOT belong here

- AI analysis of a user-uploaded document or resume → `analyzer`
- The step-by-step generated roadmap → `roadmap`