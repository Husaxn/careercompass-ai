# assessment

Questionnaires, quizzes, and skills assessments that build the user's profile.

## Screens

Located in `screens/`. Add one file per screen here:

- `index.tsx` — assessment hub / list of available assessments
- `take.tsx` — the active questionnaire/quiz in progress
- `results.tsx` — assessment outcome and interpretation

## What belongs here

- Skill / aptitude / personality questionnaires
- Scoring and results screens
- Assessment state (persist into `src/store`)

## What does NOT belong here

- First-run onboarding wizard → `onboarding`
- AI analysis of an uploaded source → `analyzer`