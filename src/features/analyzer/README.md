# analyzer

The feature dedicated to any flow where the app **analyzes a user-provided source**
(uploaded document, resume, screenshot, or session/screen data) and returns
AI-generated insights. All screens for these flows live together in `screens/`.

## Screens

Located in `screens/`. Add one file per screen here:

- `source-upload.tsx` — pick / capture the source (document, resume, screenshot, session data)
- `analyzing.tsx` — the loading / progress state while AI processes the source
- `result.tsx` — the AI-generated insights / analysis output
- `history.tsx` — past analysis runs and their saved results

## What belongs here

- Any "upload something → get AI insights back" screen
- Resume parsing, document analysis, screenshot analysis, session data analysis
- Upload, analyzing, result, and history views

## What does NOT belong here

- Career path recommendations (not from a user source) → `recommendations`
- Generated learning roadmap → `roadmap`
- Community / networking → `community`