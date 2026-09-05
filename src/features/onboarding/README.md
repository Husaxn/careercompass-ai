# onboarding

The first-run flow that introduces the app and captures the user's starting point.

## Screens

Located in `screens/`. Add one file per screen here:

- `start.tsx` — welcome / intro
- `career-path.tsx` — pick a career goal or interest
- `skills.tsx` — current skill self-assessment
- `roadmap.tsx` — preview the generated roadmap
- `ready.tsx` — completion / handoff into the app

## What belongs here

- Multi-step wizard screens
- Onboarding-specific state (persist into `src/store`)
- Any analytics/tracking of first-run completion

## What does NOT belong here

- Long-lived questionnaires / assessments → `assessment`
- The generated career roadmap itself → `roadmap`